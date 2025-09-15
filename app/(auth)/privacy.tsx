import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthContext } from '../../contexts/AuthContext';
import { StorageService } from '../../utils/storage';

export default function PrivacyScreen() {
  const { user, signUp } = useAuthContext();
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const handleAgree = async () => {
    try {
      setIsCreatingUser(true);
      
      // Check if user is already authenticated
      if (user) {
        console.log('Privacy - User already authenticated, navigating to profile');
        router.replace('/(home)/profile-information');
        return;
      }

      // Get temporary signup data
      const signupData = await StorageService.getTempSignupData();
      
      if (!signupData) {
        console.log('Privacy - No signup data found, redirecting to login');
        Alert.alert('Error', 'No signup data found. Please start the signup process again.');
        router.replace('/(auth)/login');
        return;
      }

      console.log('Privacy - Creating user with email:', signupData.email);
      
      // Create the user account
      await signUp(signupData.email, signupData.password);
      
      // Clear temporary signup data
      await StorageService.clearTempSignupData();
      
      // Clear profile setup state since this is a new user
      await StorageService.clearProfileSetupState();
      console.log('Privacy - Cleared profile setup state for new user');
      
      console.log('Privacy - User created successfully, navigating to profile setup');
      
      // Navigate directly to profile setup since this is a new user
      router.replace('/(home)/profile-information');
      
    } catch (error: any) {
            
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert(
          'Email Already Registered',
          'This email is already registered. Please use a different email or sign in.',
          [
            {
              text: 'OK',
              onPress: () => {
                // Clear temp data and go back to signup
                StorageService.clearTempSignupData();
                router.replace('/(auth)/signup');
              }
            }
          ]
        );
      } else {
        Alert.alert('Error', error.message || 'Failed to create account. Please try again.');
      }
    } finally {
      setIsCreatingUser(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Privacy Policy</Text>
        
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.bodyText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
          <Text style={styles.bodyText}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text style={styles.bodyText}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </Text>
          <Text style={styles.bodyText}>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
          </Text>
          <Text style={styles.bodyText}>
            Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.
          </Text>
          <Text style={styles.bodyText}>
            Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
          </Text>
        </ScrollView>
        
        <TouchableOpacity 
          style={[styles.agreeButton, isCreatingUser && styles.agreeButtonDisabled]} 
          onPress={handleAgree}
          disabled={isCreatingUser}
        >
          <Text style={styles.agreeButtonText}>
            {isCreatingUser ? 'Creating Account...' : 'Agree'}
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
  contentContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: '#FFE4E6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D11A38',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D11A38',
    marginBottom: 20,
    textAlign: 'left',
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 16,
    textAlign: 'left',
  },
  agreeButton: {
    backgroundColor: '#D11A38',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  agreeButtonDisabled: {
    backgroundColor: '#999999',
    opacity: 0.7,
  },
  agreeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});