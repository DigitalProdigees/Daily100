import BackButtonWithText from '@/components/BackButtonWithText';
import JournalStorage, { JournalEntry, MediaItem } from '@/utils/journalStorage';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function EditJournalScreen() {
  const params = useLocalSearchParams();
  const [journalName, setJournalName] = useState('');
  const [journalDescription, setJournalDescription] = useState('');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const overlayOpacity = React.useRef(new Animated.Value(0)).current;

  // Parse the journal data from params
  const journalData: JournalEntry = React.useMemo(() => {
    return params.journalData ? JSON.parse(params.journalData as string) : {
      id: '',
      title: '',
      description: '',
      imageUri: '',
      fileCount: 0,
      mediaItems: [],
    };
  }, [params.journalData]);

  // Initialize form with existing data
  React.useEffect(() => {
    if (journalData && journalData.id) {
      setJournalName(journalData.title || '');
      setJournalDescription(journalData.description || '');
      setMediaItems(journalData.mediaItems || []);
    }
  }, [journalData.id]);

  const handleUpload = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant camera roll permissions to upload images.');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets) {
        const newMediaItems: MediaItem[] = result.assets.map((asset, index) => ({
          id: `${Date.now()}-${index}`,
          uri: asset.uri,
          type: asset.type === 'video' ? 'video' : 'image',
        }));

        setMediaItems(prev => [...prev, ...newMediaItems]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const handleDeleteMedia = (id: string) => {
    setMediaItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSave = () => {
    if (!journalName.trim() || !journalDescription.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Create updated journal entry data
    const updatedJournalData = {
      ...journalData,
      title: journalName.trim(),
      description: journalDescription.trim(),
      imageUri: mediaItems.length > 0 ? mediaItems[0].uri : '',
      fileCount: mediaItems.length,
      mediaItems: mediaItems
    };

    // Show success overlay
    setShowSuccessOverlay(true);
    
    // Animate overlay in
    Animated.timing(overlayOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Update the journal in storage
    JournalStorage.getInstance().updateJournal(updatedJournalData);
    console.log('Journal updated:', updatedJournalData);
    
    // Hide overlay after 2 seconds and navigate to journal list
    setTimeout(() => {
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowSuccessOverlay(false);
        router.push('/(home)/journal');
      });
    }, 2000);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    // Delete the journal from storage
    JournalStorage.getInstance().deleteJournal(journalData.id);
    console.log('Journal deleted:', journalData.id);
    router.push('/(home)/journal');
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const renderMediaItem = ({ item }: { item: MediaItem }) => (
    <View style={styles.mediaItem}>
      <Image source={{ uri: item.uri }} style={styles.mediaImage} />
      <View style={styles.imageOverlay} />
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteMedia(item.id)}
      >
        <Image
          source={require('@/assets/images/delete.png')}
          style={styles.deleteIcon}
          resizeMode="stretch"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButtonWithText />
        <Text style={styles.title}>Edit Journal</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Journal Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Journal Name</Text>
          <TextInput
            style={styles.input}
            value={journalName}
            onChangeText={setJournalName}
            placeholder="Text here"
            placeholderTextColor="#999999"
          />
        </View>

        {/* Journal Description */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Journal Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={journalDescription}
            onChangeText={setJournalDescription}
            placeholder="Text here"
            placeholderTextColor="#999999"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Media Upload Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Add Images / Videos / Audios</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>
        </View>

        {/* Media Items Grid */}
        {mediaItems.length > 0 && (
          <View style={styles.mediaGrid}>
            <FlatList
              data={mediaItems}
              renderItem={renderMediaItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={styles.mediaGridContent}
            />
          </View>
        )}
      </ScrollView>

      {/* Static Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.deleteButtonMain} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>

      {/* Success Overlay */}
      {showSuccessOverlay && (
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
          <View style={styles.successContainer}>
            <View style={styles.successCircle}>
              <Text style={styles.tickMark}>✓</Text>
            </View>
            <Text style={styles.successText}>Journal Saved!</Text>
          </View>
        </Animated.View>
      )}

      {/* Custom Delete Confirmation Modal */}
      {showDeleteModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.deleteModal}>
            <View style={styles.deleteIconContainer}>
              <Image
                source={require('@/assets/images/trash.png')}
                style={styles.deleteModalIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.deleteModalText}>Are you sure you want to delete?</Text>
            <View style={styles.deleteModalButtons}>
              <TouchableOpacity style={styles.deleteModalCancelButton} onPress={handleCancelDelete}>
                <Text style={styles.deleteModalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteModalConfirmButton} onPress={handleConfirmDelete}>
                <Text style={styles.deleteModalConfirmText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D11A38',
    textAlign: 'center',
    marginTop: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: '#D11A38',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  mediaGrid: {
    marginBottom: 20,
  },
  mediaGridContent: {
    paddingBottom: 10,
  },
  mediaItem: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 10,
    marginHorizontal: '1%',
    position: 'relative',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFE5E9B2',
    borderRadius: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    width: 40,
    height: 40,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  saveButton: {
    backgroundColor: '#D11A38',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  deleteButtonMain: {
    borderWidth: 1,
    borderColor: '#D11A38',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  successContainer: {
    alignItems: 'center',
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickMark: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  deleteModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    minWidth: 280,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  deleteModalIcon: {
    width: 30,
    height: 30,
    tintColor: '#FFFFFF',
  },
  deleteModalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 24,
  },
  deleteModalButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  deleteModalCancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#FF0000',
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: 'center',
  },
  deleteModalCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF0000',
  },
  deleteModalConfirmButton: {
    flex: 1,
    backgroundColor: '#FF0000',
    borderRadius: 8,
    paddingVertical: 12,
    marginLeft: 8,
    alignItems: 'center',
  },
  deleteModalConfirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});