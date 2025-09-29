import BackButtonWithText from '@/components/BackButtonWithText';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

const generateTimeSlots = (): TimeSlot[] => {
  const times = [
    '9:00 am', '10:30 am', '12:00 pm', '1:00 pm', '2:30 pm', '4:00 pm',
    '5:30 pm', '7:00 pm', '8:00 pm', '9:30 pm', '11:00 am', '3:15 pm',
    '6:45 pm', '10:15 am', '1:45 pm', '4:30 pm', '7:15 pm', '9:45 pm'
  ];
  
  // Specific times that should be unavailable
  const unavailableTimes = ['12:00 pm', '9:30 pm', '2:30 pm'];
  
  return times.map((time, index) => {
    const isUnavailable = unavailableTimes.includes(time);
    const available = !isUnavailable && Math.random() > 0.3;
    
    // Debug log for unavailable times
    if (isUnavailable) {
      console.log(`Time ${time} is marked as unavailable`);
    }
    
    return {
      id: index.toString(),
      time,
      available,
    };
  });
};

export default function DateTimeSelectionScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeSlots] = useState<TimeSlot[]>(generateTimeSlots());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    // Convert Sunday (0) to Monday (1) as first day of week
    let startingDayOfWeek = firstDay.getDay();
    startingDayOfWeek = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonth = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({
        date: prevMonth,
        isCurrentMonth: false,
        isSelected: false,
      });
    }
    
    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        isCurrentMonth: true,
        isSelected: selectedDate?.toDateString() === date.toDateString(),
      });
    }
    
    // Add empty cells for days after the last day of the month
    const remainingCells = 42 - days.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingCells; i++) {
      const nextMonth = new Date(year, month + 1, i);
      days.push({
        date: nextMonth,
        isCurrentMonth: false,
        isSelected: false,
      });
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSave = () => {
    if (selectedDate && selectedTime) {
      console.log('Selected Date:', selectedDate.toDateString());
      console.log('Selected Time:', selectedTime);
      // Navigate to payment details screen
      router.push('/payment-details');
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const days = getDaysInMonth(currentDate);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButtonWithText />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Select</Text>
          <Text style={styles.title}>Date & Time</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Select Date Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Select Date:</Text>
          
          {/* Calendar Card */}
          <View style={styles.calendarCard}>
            {/* Month Header */}
            <View style={styles.monthHeader}>
              <View style={styles.monthYearContainer}>
                <Text style={styles.monthYear}>
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </Text>
                <Text style={styles.yearArrow}>›</Text>
              </View>
              <View style={styles.monthNavigation}>
                <TouchableOpacity onPress={() => navigateMonth('prev')} style={styles.navButton}>
                  <Text style={styles.navArrow}>‹</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateMonth('next')} style={styles.navButton}>
                  <Text style={styles.navArrow}>›</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Day Names */}
            <View style={styles.dayNamesRow}>
              {dayNames.map((day) => (
                <Text key={day} style={styles.dayName}>{day}</Text>
              ))}
            </View>

            {/* Calendar Grid */}
            <View style={styles.calendarGrid}>
              {days.map((day, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dayCell,
                    day.isSelected && styles.selectedDay,
                    !day.isCurrentMonth && styles.otherMonthDay,
                  ]}
                  onPress={() => handleDateSelect(day.date)}
                >
                  <Text
                    style={[
                      styles.dayText,
                      day.isSelected && styles.selectedDayText,
                      !day.isCurrentMonth && styles.otherMonthText,
                    ]}
                  >
                    {day.date.getDate()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Select Time Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Select Time:</Text>
          
          <View style={styles.timeSlotsContainer}>
            {timeSlots.map((slot) => {
              // Debug log for styling
              if (!slot.available) {
                console.log(`Rendering unavailable slot: ${slot.time}, available: ${slot.available}`);
              }
              
              return (
                <TouchableOpacity
                  key={slot.id}
                  style={[
                    styles.timeSlot,
                    !slot.available && styles.unavailableSlot,
                    selectedTime === slot.time && styles.selectedTimeSlot,
                  ]}
                  onPress={() => slot.available && handleTimeSelect(slot.time)}
                  disabled={!slot.available}
                >
                  <Text
                    style={[
                      styles.timeSlotText,
                      !slot.available && styles.unavailableSlotText,
                      selectedTime === slot.time && styles.selectedTimeSlotText,
                    ]}
                  >
                    {slot.time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            (!selectedDate || !selectedTime) && styles.disabledSaveButton,
          ]}
          onPress={handleSave}
          disabled={!selectedDate || !selectedTime}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D11A38',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionLabel: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 12,
    fontWeight: '500',
  },
  calendarCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  monthYearContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  monthYear: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D11A38',
  },
  yearArrow: {
    fontSize: 30,
    color: '#D11A38',
    marginLeft: 4,
    top:2
  },
  monthNavigation: {
    flexDirection: 'row',
    gap: 8,
  },
  navButton: {
    padding: 4,
  },
  navArrow: {
    fontSize: 30,
    color: '#D11A38',
  },
  dayNamesRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayName: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#D11A38',
    marginBottom: 8,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: -70,
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  selectedDay: {
    backgroundColor: '#D11A38',
    borderRadius: 20,
  },
  otherMonthDay: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: 16,
    color: '#333333',
  },
  selectedDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  otherMonthText: {
    color: '#999999',
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeSlot: {
    backgroundColor: '#FFE5E9',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: '30%',
    alignItems: 'center',
  },
  unavailableSlot: {
    backgroundColor: '#E0E0E0',
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  selectedTimeSlot: {
    backgroundColor: '#D11A38',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#595959',
    fontWeight: '500',
  },
  unavailableSlotText: {
    color: '#999999',
  },
  selectedTimeSlotText: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#D11A38',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  disabledSaveButton: {
    backgroundColor: '#CCCCCC',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});