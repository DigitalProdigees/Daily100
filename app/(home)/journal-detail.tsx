import BackButtonWithText from '@/components/BackButtonWithText';
import JournalStorage, { JournalEntry, MediaItem } from '@/utils/journalStorage';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');
const imageSize = (width - 80) / 4; // 4 columns with padding

export default function JournalDetailScreen() {
  const params = useLocalSearchParams();
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Parse the journal data from params
  const rawJournalData = params.journalData ? JSON.parse(params.journalData as string) : {
    id: '',
    title: 'Journal Name',
    description: 'My Journal',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    mediaItems: [],
    createdAt: new Date(),
  };

  // Only use actual user-uploaded mediaItems, no placeholders
  const journalData: JournalEntry = {
    ...rawJournalData,
    mediaItems: rawJournalData.mediaItems || []
  };


  const handleBack = () => {
    router.back();
  };

  const handleMenuPress = () => {
    setShowMenu(!showMenu);
  };

  const handleEdit = () => {
    setShowMenu(false);
    router.push({
      pathname: '/(home)/edit-journal',
      params: {
        journalData: JSON.stringify(journalData)
      }
    });
  };

  const handleDelete = () => {
    setShowMenu(false);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setShowDeleteModal(false);
      // Delete the journal from storage (now async)
      await JournalStorage.getInstance().deleteJournal(journalData.id);
      console.log('Journal deleted:', journalData.id);
      router.push('/(home)/journal');
    } catch (error) {
      console.error('Error deleting journal:', error);
      Alert.alert('Error', 'Failed to delete journal. Please try again.');
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const renderAttachment = (item: MediaItem, index: number) => (
    <View key={index} style={styles.attachmentItem}>
      <Image
        source={{ uri: item.uri }}
        style={styles.attachmentImage}
        resizeMode="cover"
      />
      <View style={styles.imageOverlay} />
      <TouchableOpacity style={styles.deleteButton}>
        <Image
          source={require('@/assets/images/Group 71.png')}
          style={styles.deleteIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButtonWithText onPress={handleBack} />
        <View style={styles.headerRight}>
        
          <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
            <Image
              source={require('@/assets/images/Frame 322.png')}
              style={styles.menuIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Dropdown Menu */}
      {showMenu && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity style={styles.menuItem} onPress={handleEdit}>
            <Image
              source={require('@/assets/images/Frame 330.png')}
              style={styles.menuIconSmall}
              resizeMode="contain"
            />
            <Text style={styles.menuText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleDelete}>
            <Image
              source={require('@/assets/images/trash.png')}
              style={styles.menuIconSmall}
              resizeMode="contain"
            />
            <Text style={styles.menuText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Journal Title */}
        <Text style={styles.journalTitle}>{journalData.title}</Text>
        
        {/* Journal Subtitle */}
        <Text style={styles.journalSubtitle}>My Journal</Text>
        
        {/* Journal Description */}
        <Text style={styles.journalDescription}>
          {journalData.description}
        </Text>

        {/* Attachments Section */}
        <Text style={styles.attachmentsTitle}>Attachments</Text>
        
        {/* Attachments Grid */}
        <View style={styles.attachmentsGrid}>
          {journalData.mediaItems && journalData.mediaItems.length > 0 ? (
            journalData.mediaItems.map((item, index) => renderAttachment(item, index))
          ) : (
            <Text style={styles.noAttachments}>No attachments</Text>
          )}
        </View>
      </ScrollView>

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'relative',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  menuButton: {
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: '#333333',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 90,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
    minWidth: 120,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  menuIconSmall: {
    width: 16,
    height: 16,
    tintColor: '#FF0000',
    marginRight: 8,
  },
  menuText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  journalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF0000',
    marginBottom: 20,
    marginTop: 10,
  },
  journalSubtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#595959',
    marginBottom: 16,
  },
  journalDescription: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    marginBottom: 32,
  },
  attachmentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  attachmentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 40,
  },
  attachmentItem: {
    width: imageSize,
    height: imageSize,
    marginBottom: 15,
    marginRight:10,
    position: 'relative',borderWidth:1,
    borderRadius:10,
    borderColor:'#D11A38'
    
  },
  attachmentImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
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
    top: -8,
    right: -11,
    width: 24,
    height: 24,
    
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
  noAttachments: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    marginTop: 20,
    width: '100%',
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
    shadowColor: '#000',
    marginHorizontal:20,
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