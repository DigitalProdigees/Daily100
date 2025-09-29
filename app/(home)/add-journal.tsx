import BackButtonWithText from '@/components/BackButtonWithText';
import JournalStorage from '@/utils/journalStorage';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MediaItem {
  id: string;
  uri: string;
  type: 'image' | 'video' | 'audio';
}

export default function AddJournalScreen() {
  const [journalName, setJournalName] = useState('');
  const [journalDescription, setJournalDescription] = useState('');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  const handleUpload = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant permission to access your photo library');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const newMediaItem: MediaItem = {
          id: Date.now().toString(),
          uri: result.assets[0].uri,
          type: result.assets[0].type === 'video' ? 'video' : 'image'
        };
        setMediaItems(prev => [...prev, newMediaItem]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleDeleteMedia = (id: string) => {
    setMediaItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSave = async () => {
    if (!journalName.trim() || !journalDescription.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      // Create journal entry data
      const journalData = {
        id: Date.now().toString(),
        title: journalName.trim(),
        description: journalDescription.trim(),
        imageUri: mediaItems.length > 0 ? mediaItems[0].uri : '',
        fileCount: mediaItems.length,
        mediaItems: mediaItems
      };

      // Save to storage (now async)
      await JournalStorage.getInstance().addJournal(journalData);
      
      console.log('Journal saved:', journalData);
      
      // Navigate back to journal screen
      router.back();
    } catch (error) {
      console.error('Error saving journal:', error);
      Alert.alert('Error', 'Failed to save journal. Please try again.');
    }
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
        <Text style={styles.title}>Add New Journal</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Journal Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Journal Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Text here"
            placeholderTextColor="#999999"
            value={journalName}
            onChangeText={setJournalName}
          />
        </View>

        {/* Journal Description */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Journal Description</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="What could I have done better today?&#10;How was my mood or emotions?&#10;what's the plan to be better?"
            placeholderTextColor="#999999"
            value={journalDescription}
            onChangeText={setJournalDescription}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Media Upload Section */}
        <View style={styles.mediaSection}>
          <Text style={styles.label}>Add Images / Videos / Audios</Text>
          
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>

          {/* Media Grid */}
          {mediaItems.length > 0 && (
            <View style={styles.mediaGrid}>
              <FlatList
                data={mediaItems}
                renderItem={renderMediaItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                scrollEnabled={false}
                contentContainerStyle={styles.mediaGridContent}
                columnWrapperStyle={styles.mediaRow}
              />
            </View>
          )}
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D11A38',
    textAlign: 'center',
    marginTop: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000000',
    backgroundColor: 'white',
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  mediaSection: {
    marginBottom: 20,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: '#D11A38',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  mediaGrid: {
    marginTop: 8,
  },
  mediaGridContent: {
    paddingBottom: 20,
  },
  mediaRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  mediaItem: {
    width: '48%',
    aspectRatio: 1,
    position: 'relative',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFE5E9B2',
    borderRadius: 8,
    zIndex: 0,
  },
  deleteButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    zIndex: 1,
  },
  deleteIcon: {
    width: 40,
    height: 40,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  saveButton: {
    backgroundColor: '#D11A38',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});