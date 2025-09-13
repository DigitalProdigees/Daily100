import BackButtonWithText from '@/components/BackButtonWithText';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function AddPersonalGoalsScreen() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const goalCategories = [
    {
      id: 'health',
      title: 'Health',
      image: require('@/assets/images/1.png'),
    },
    {
      id: 'wealth',
      title: 'Wealth',
      image: require('@/assets/images/2.png'),
    },
    {
      id: 'travel',
      title: 'Travel',
      image: require('@/assets/images/3.png'),
    },
    {
      id: 'education',
      title: 'Education',
      image: require('@/assets/images/1.png'),
    },
    {
      id: 'career',
      title: 'Career',
      image: require('@/assets/images/2.png'),
    },
    {
      id: 'relationships',
      title: 'Relationships',
      image: require('@/assets/images/3.png'),
    },
    {
      id: 'fitness',
      title: 'Fitness',
      image: require('@/assets/images/1.png'),
    },
    {
      id: 'hobbies',
      title: 'Hobbies',
      image: require('@/assets/images/2.png'),
    },
  ];

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoals(prev => {
      if (prev.includes(goalId)) {
        // If already selected, remove it
        return prev.filter(id => id !== goalId);
      } else if (prev.length < 2) {
        // If less than 2 selected, add it
        return [...prev, goalId];
      } else {
        // If 2 already selected, replace the first one
        return [prev[1], goalId];
      }
    });
  };

  const handleNext = () => {
    console.log('Selected goals:', selectedGoals);
    router.push('/(home)/library');
  };

  const renderGoalCard = (goal: any) => (
    <TouchableOpacity
      key={goal.id}
      style={[
        styles.goalCard,
        selectedGoals.includes(goal.id) && styles.selectedGoalCard
      ]}
      onPress={() => handleGoalSelect(goal.id)}
    >
      <Image
        source={goal.image}
        style={styles.goalBackgroundImage}
        resizeMode="cover"
      />
      <View style={styles.goalOverlay} />
      <Text style={styles.goalTitle}>{goal.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButtonWithText />
        <Text style={styles.title}>Add Personal Goals</Text>
      </View>

      {/* Goal Categories */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.goalsContainer}>
          {goalCategories.map(renderGoalCard)}
        </View>
      </ScrollView>

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
  scrollContainer: {
    flex: 1,
  },
  goalsContainer: {
    paddingHorizontal: 5,

    paddingBottom: 20,
  },
  goalCard: {
    height: 190,
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedGoalCard: {
    borderWidth: 2,
    marginHorizontal:14,
    borderColor: '#D11A38',
  },
  goalBackgroundImage: {
    position: 'absolute',
    top: 8,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  goalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  goalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    zIndex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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