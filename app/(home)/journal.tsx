import BackButtonWithText from '@/components/BackButtonWithText';
import JournalStorage, { JournalEntry } from '@/utils/journalStorage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function JournalScreen() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  
  // Dynamic journal entries - populated from storage
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    // Load initial journals
    setJournalEntries(JournalStorage.getInstance().getJournals());

    // Subscribe to changes
    const unsubscribe = JournalStorage.getInstance().subscribe((journals) => {
      setJournalEntries(journals);
    });

    return unsubscribe;
  }, []);

  const handleAddJournal = () => {
    console.log('Add Journal pressed');
    // Navigate to add journal screen
    router.push('/(home)/add-journal');
  };

  const handleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const renderJournalEntry = ({ item }: { item: JournalEntry }) => (
    <TouchableOpacity style={styles.journalCard}>
      <View style={styles.imageSection}>
        <Image source={{ uri: item.imageUri }} style={styles.journalImage} />
        <Text style={styles.fileCount}>{item.fileCount} files attached</Text>
      </View>
      <View style={styles.journalContent}>
        <Text style={styles.journalTitle}>{item.title}</Text>
        <Text 
          style={styles.journalDescription}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {journalEntries.length > 0 ? (
          <>
            <View style={styles.topRow}>
              <BackButtonWithText />
              <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                <Image
                  source={require('@/assets/images/search1.png')}
                  style={styles.searchIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.titleRow}>
              <Text style={styles.title}>Your Journal</Text>
              <TouchableOpacity style={styles.filterButton}>
                <Image
                  source={require('@/assets/images/filter1.png')}
                  style={styles.filterIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <BackButtonWithText />
            <Text style={styles.emptyTitle}>Journal</Text>
          </>
        )}
      </View>

      {/* Search Bar */}
      {searchVisible && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search journals..."
            placeholderTextColor="#999999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      )}

      {/* Journal Entries */}
      {journalEntries.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyMessage}>You have 0 Journal</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddJournal}>
            <Text style={styles.addButtonText}>Add Journal</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={journalEntries}
          renderItem={renderJournalEntry}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.journalList}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.floatingAddButton} onPress={handleAddJournal}>
        <Image
          source={require('@/assets/images/add1.png')}
          style={styles.floatingAddIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
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
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D11A38',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D11A38',
    textAlign: 'center',
    marginTop: 16,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  searchButton: {
    padding: 8,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#333333',
  },
  filterButton: {
    padding: 8,
  },
  filterIcon: {
    width: 20,
    height: 20,
    tintColor: '#D11A38',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#F8F8F8',
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  journalList: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  journalCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageSection: {
  },
  journalImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F0F0',
  },
  journalContent: {
    flex: 1,
    justifyContent: 'center',
  },
  journalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
    right:19
  },
  journalDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
    lineHeight: 22,
    right:19
  },
  fileCount: {
    fontSize: 12,
    color: '#D11A38',
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
    top:5
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyMessage: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 40,
  },
  addButton: {
    backgroundColor: '#D11A38',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 40,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  floatingAddButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D11A38',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  floatingAddIcon: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
});