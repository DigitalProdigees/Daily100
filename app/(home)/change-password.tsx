import BackButtonWithText from '@/components/BackButtonWithText';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChangePasswordScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Password Change',
        'Password change Link have been sent to your email.',
        [{ text: 'OK'}]
      );
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButtonWithText />
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Image
            source={require('@/assets/images/mail.png')}
            style={styles.mailIcon}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Change Password</Text>
        <Text style={styles.description}>
          Enter your email address and we'll send you Link to change your password.
        </Text>

        <TouchableOpacity
          style={[styles.changePasswordButton, { opacity: isLoading ? 0.7 : 1 }]}
          onPress={handleChangePassword}
          disabled={isLoading}
        >
          <Text style={styles.changePasswordButtonText}>
            {isLoading ? 'Sending...' : 'Send link'}
          </Text>
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
    paddingTop: 16,
    paddingBottom: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mailIcon: {
    width: 100,
    height: 100,
    tintColor: '#D11A38',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  changePasswordButton: {
    backgroundColor: '#D11A38',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  changePasswordButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});