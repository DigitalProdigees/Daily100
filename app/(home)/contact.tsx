import BackButtonWithText from '@/components/BackButtonWithText';
import CenteredTitle from '@/components/CenteredTitle';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ContactUsScreen() {
  const handleContactUs = () => {
    // Navigate to contact form or handle contact us action
    console.log('Contact Us pressed');
    // You can navigate to a contact form screen here if needed
  };

  const handleRequestCoach = () => {
    // Navigate to coach request form or handle coach request action
    console.log('Request Coach pressed');
    // You can navigate to a coach request screen here if needed
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButtonWithText />
        <CenteredTitle title="Contact" />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Contact Us Card */}
        <TouchableOpacity style={styles.card} onPress={handleContactUs} activeOpacity={0.8}>
          <Text style={styles.cardQuestion}>Have a Query?</Text>
          <View style={styles.iconContainer}>
            <Image
              source={require('@/assets/images/mail.png')}
              style={styles.cardIcon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.cardTitle}>Contact Us</Text>
        </TouchableOpacity>

        {/* Request Coach Card */}
        <TouchableOpacity style={styles.card} onPress={handleRequestCoach} activeOpacity={0.8}>
          <Text style={styles.cardQuestion}>Need a Coach?</Text>
          <View style={styles.iconContainer}>
            <Image
              source={require('@/assets/images/profile1.png')}
              style={styles.cardIcon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.cardTitle}>Request a Coach</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#F8E8EA', // Light pink background
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    marginBottom: 20,
    flex: 1,
    justifyContent: 'center',
  },
  cardQuestion: {
    fontSize: 18,
    color: '#333333',
    marginBottom: 20,
    textAlign: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#D11A38',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cardIcon: {
    width: 24,
    height: 24,
    tintColor: '#D11A38',
  },
  cardTitle: {
    fontSize: 20,
    color: '#D11A38',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});