import BackButtonWithText from '@/components/BackButtonWithText';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthContext } from '../../contexts/AuthContext';

export default function ChangePasswordScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { user, resetPassword } = useAuthContext();

  // Automatically send email when screen loads
  useEffect(() => {
    if (user?.email && !emailSent) {
      handleChangePassword();
    }
  }, [user?.email, emailSent]);

  const handleChangePassword = async () => {
    if (!user?.email) {
      Alert.alert('Error', 'No email address found for your account.');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Change Password - Sending reset email to logged-in user:', user.email);
      
      // Send reset email to the currently logged-in user
      await resetPassword(user.email);
      
      console.log('Change Password - Reset email sent successfully');
      setEmailSent(true);

      // Show alert with options
      Alert.alert(
        'Email Sent',
        'Password reset link has been sent to your email address.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {
              console.log('Change Password - User cancelled');
            }
          },
          {
            text: 'Go to Mail',
            onPress: () => {
              console.log('Change Password - Opening mail app');
              openMailApp();
            }
          }
        ]
      );

    } catch (error: any) {
      console.error('Change Password - Error sending reset email:', error);
      console.error('Change Password - Error code:', error.code);
      console.error('Change Password - Error message:', error.message);
      
      // Handle different types of errors
      if (error.code === 'auth/invalid-email') {
        console.log('Change Password - Invalid email format');
        Alert.alert(
          'Invalid Email',
          'Your email address is not valid. Please contact support.',
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('Change Password - User acknowledged invalid email');
              }
            }
          ]
        );
      } else {
        console.log('Change Password - Other error occurred:', error.code);
        Alert.alert('Error', error.message || 'Failed to send reset email. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const openMailApp = () => {
    // Try to open the default mail app
    Linking.openURL('mailto:').catch((err) => {
      console.error('Error opening mail app:', err);
      Alert.alert('Error', 'Could not open mail app. Please check your email manually.');
    });
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
          {isLoading 
            ? 'Sending password reset link to your email...' 
            : emailSent 
              ? 'Password reset link has been sent to your email address.'
              : `We'll send a password reset link to your registered email address: ${user?.email}`
          }
        </Text>

        {isLoading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Sending email...</Text>
          </View>
        )}

        {emailSent && !isLoading && (
          <TouchableOpacity
            style={styles.resendButton}
            onPress={handleChangePassword}
            disabled={isLoading}
          >
            <Text style={styles.resendButtonText}>Resend Link</Text>
          </TouchableOpacity>
        )}
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
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#D11A38',
    fontWeight: '500',
  },
  resendButton: {
    backgroundColor: '#D11A38',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  resendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});