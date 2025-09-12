import BackButtonWithText from '@/components/BackButtonWithText';
import { router } from 'expo-router';
import React from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Coach {
  id: string;
  name: string;
  field: string;
  backgroundColor: string;
}

const coaches: Coach[] = [
  { id: '1', name: 'Mary Linton', field: 'Coach field', backgroundColor: '' },
  { id: '2', name: 'James John', field: 'Coach field', backgroundColor: '' },
  { id: '3', name: 'Kyle Jeans', field: 'Coach field', backgroundColor: '' },
  { id: '4', name: 'Bane Smith', field: 'Coach field', backgroundColor: '' },
  { id: '5', name: 'Robert Patson', field: 'Coach field', backgroundColor: '' },
  { id: '6', name: 'Carl Bowman', field: 'Coach field', backgroundColor: '' },
];

export default function CoachSelectionScreen() {
  const handleCoachSelect = (coach: Coach) => {
    console.log('Selected coach:', coach);
    // Navigate to date & time selection screen
    router.push('/date-time-selection');
  };

  const renderCoachCard = ({ item }: { item: Coach }) => (
    <TouchableOpacity
      style={styles.coachCard}
      onPress={() => handleCoachSelect(item)}
      activeOpacity={0.8}
    >
      <View style={styles.profileImageContainer}>
        <Image
          source={require('@/assets/images/ellipse.png')}
          style={styles.profileImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.coachName}>{item.name}</Text>
      <Text style={styles.coachField}>{item.field}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButtonWithText />
        <Text style={styles.title}>Select Available Coach or Manager</Text>
      </View>

      {/* Coach Grid */}
      <FlatList
        data={coaches}
        renderItem={renderCoachCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
      />
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
  gridContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  coachCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '48%',
    borderWidth: 1,
    borderColor: '#D67685',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    tintColor:'#D67685'
  },
  coachName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 4,
  },
  coachField: {
    fontSize: 14,
    color: '#D11A38',
    textAlign: 'center',
  },
});