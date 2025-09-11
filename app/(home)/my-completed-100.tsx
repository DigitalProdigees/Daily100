import BackButtonWithText from '@/components/BackButtonWithText';
import CenteredTitle from '@/components/CenteredTitle';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyCompleted100Screen() {
  // Generate 20 completed items
  const completedItems = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    title: 'My Completed 100',
    status: 'Finished',
  }));

  const handleDownload = (itemId: number) => {
    console.log(`Download item ${itemId}`);
    // Handle download logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButtonWithText />
        <TouchableOpacity style={styles.calendarButton}>
          <Image
            source={require('@/assets/images/calendar.png')}
            style={styles.calendarIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <CenteredTitle title="You Have 20 Completed" />
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {completedItems.map((item) => (
          <View key={item.id} style={styles.completedItem}>
            <Image
              source={require('@/assets/images/ellipse.png')}
              style={styles.completedImage}
              resizeMode="cover"
            />
            <View style={styles.completedContent}>
              <Text style={styles.completedName}>{item.title}</Text>
              <Text style={styles.finishedText}>{item.status}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDownload(item.id)}>
              <Text style={styles.downloadText}>Download</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical:20
  },
  calendarButton: {
    
  },
  calendarIcon: {
    width: 24,
    height: 24,
    tintColor: '#D11A38',
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  completedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  completedImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft:-12
  },
  completedContent: {
    flex: 1,
  },
  completedName: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  finishedText: {
    fontSize: 14,
    color: '#D11A38',
    fontWeight: '500',
  },
  downloadText: {
    fontSize: 14,
    color: '#D11A38',
    fontWeight: '500',
  },
});