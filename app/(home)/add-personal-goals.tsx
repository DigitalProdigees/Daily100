import BackButtonWithText from '@/components/BackButtonWithText';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AddPersonalGoalsScreen() {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [totalPoints, setTotalPoints] = useState('0');
  const [winItems, setWinItems] = useState(['', '', '']);

  const handleWinItemChange = (index: number, value: string) => {
    const newWinItems = [...winItems];
    newWinItems[index] = value;
    setWinItems(newWinItems);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleNext = () => {
    router.push('/(home)/daily-performance-indicator');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <BackButtonWithText isDarkMode={false} />
        <View style={styles.headerCenter} />
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Add Personal Goals</Text>
      </View>

      {/* Form Content */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {/* Name Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Name</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="jane doe"
            placeholderTextColor="#999999"
          />
        </View>

        {/* Date Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Date</Text>
          <TouchableOpacity
            style={styles.dateInputContainer}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>{formatDate(date)}</Text>
            <Image
              source={require('@/assets/images/calendar1.png')}
              style={styles.calendarIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Total Points Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Total Points</Text>
          <View style={styles.pointsInputContainer}>
            <TextInput
              style={styles.pointsInput}
              value={totalPoints}
              onChangeText={setTotalPoints}
              placeholder="0"
              placeholderTextColor="#999999"
              keyboardType="numeric"
            />
            <Text style={styles.goalText}>Goal: 100</Text>
          </View>
        </View>

        {/* W.I.N. Section */}
        <View style={styles.winSection}>
          <Text style={styles.winDescription}>
            What's Important Now (W.I.N). List 3 things professionally are most important to get completed today?
          </Text>

          {winItems.map((item, index) => {
            const letters = ['W', 'I', 'N'];
            return (
              <View key={index} style={styles.winItemContainer}>
                <Text style={styles.winLetter}>{letters[index]}</Text>
                <TextInput
                  style={styles.winInput}
                  value={item}
                  onChangeText={(value) => handleWinItemChange(index, value)}
                  placeholder="I want to"
                  placeholderTextColor="#999999"
                  multiline
                />
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Next Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  headerCenter: {
    flex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D11A38',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 22,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
    fontWeight: '500',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  calendarIcon: {
    width: 20,
    height: 20,
    tintColor: '#666666',
  },
  pointsInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  pointsInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    paddingVertical: 16,
  },
  goalText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  winSection: {
    marginTop: 20,
  },
  winDescription: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    marginBottom: 20,
  },
  winItemContainer: {
    marginBottom: 16,
  },
  winLetter: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D11A38',
    marginBottom: 8,
  },
  winInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    minHeight: 50,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    paddingHorizontal: 22,
    paddingVertical: 20,
  },
  nextButton: {
    backgroundColor: '#D11A38',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});