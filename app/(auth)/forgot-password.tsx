import BackButton from '@/components/BackButton';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const handleResendLink = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Link Sent',
        'We\'ve sent a new password reset link to your email address.',
        [
          { text: 'OK', onPress: () => router.back() }
        ]
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Back Button */}
        <BackButton />
      </View>
      
      <View style={styles.content}>
        {/* Mail Icon */}
        <View style={styles.iconContainer}>
          <Image 
            source={require('@/assets/images/mail.png')} 
            style={styles.mailIcon}
            resizeMode="contain"
          />
        </View>
        
        {/* Title */}
        <ThemedText type="title" style={styles.title}>
          Forget Password
        </ThemedText>
        
        {/* Description */}
        <ThemedText type="default" style={styles.description}>
          We send you the link to @ex****@gmail.com, please check and click it to reset password
        </ThemedText>
        
        {/* Resend Button */}
        <TouchableOpacity
          style={[styles.resendButton, { opacity: isLoading ? 0.7 : 1 }]}
          onPress={handleResendLink}
          disabled={isLoading}
        >
          <Text style={styles.resendButtonText}>
            {isLoading ? 'Sending...' : 'Resend the Link'}
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 10,
  },
  mailIcon: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D11A38',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  resendButton: {
    backgroundColor: '#D11A38',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginHorizontal: 16,
  },
  resendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
});