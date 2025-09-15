import LoadingOverlay from '@/components/LoadingOverlay';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { Auth, fetchSignInMethodsForEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../config/firebase';
import { useAuthContext } from '../../contexts/AuthContext';
import { StorageService } from '../../utils/storage';

export default function SignUpScreen() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [emailError, setEmailError] = useState('');
  const { signUp, error } = useAuthContext();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear email error when user starts typing
    if (field === 'email' && emailError) {
      setEmailError('');
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    const { email, password, confirmPassword } = formData;

    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (!agreeTerms || !agreePrivacy) {
      Alert.alert('Error', 'Please agree to Terms and Conditions and Privacy Policy');
      return;
    }

    // Check if email is already registered using fetchSignInMethodsForEmail
    setIsLoading(true);
    try {
      console.log('Signup - Checking if email is already registered:', email);
      
      // Check if email exists using fetchSignInMethodsForEmail
      const signInMethods = await fetchSignInMethodsForEmail(auth as Auth, email);
      console.log('Signup - Sign in methods found:', signInMethods);
      console.log('Signup - Sign in methods length:', signInMethods.length);
      
      // Check if email is already registered
      if (signInMethods.length > 0) {
        console.log('Signup - Email already registered, showing error');
        setEmailError('This email is already registered. Please use a different email or sign in.');
        return;
      }
      
      console.log('Signup - Email is available, storing signup data');
      
      // Store signup data and navigate to terms screen
      const signupData = { email, password };
      await StorageService.setTempSignupData(signupData);
      
      console.log('Signup - Signup data stored, navigating to terms screen');
      router.push('/(auth)/terms');
    } catch (error) {
      console.error('Signup - Error checking email or storing signup data:', error);
      Alert.alert('Error', 'Failed to proceed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    router.push('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header - Fixed */}
      <View style={styles.header}>
        <View style={styles.brandContainer}>
          <Text style={styles.brandText}>My Daily </Text>
          <Image 
            source={require('@/assets/images/100.png')} 
            style={styles.brandIcon}
            resizeMode="contain"
          />
        </View>
        <ThemedText type="title" style={styles.title}>
          Sign Up
        </ThemedText>
        <ThemedText type="default" style={styles.subtitle}>
          Create your new account
        </ThemedText>
      </View>

      {/* Scrollable Content */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, emailError && styles.inputError]}
                placeholder="example@email.com"
                placeholderTextColor="#8E8E93"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Password123."
                placeholderTextColor="#8E8E93"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Password123."
                placeholderTextColor="#8E8E93"
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.checkboxContainer}>
              <TouchableOpacity 
                style={styles.checkboxRow}
                onPress={() => setAgreeTerms(!agreeTerms)}
              >
                <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
                  {agreeTerms && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxText}>
                  By sign up I agree with <Text style={styles.linkText}>Terms and Conditions</Text>
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.checkboxRow}
                onPress={() => setAgreePrivacy(!agreePrivacy)}
              >
                <View style={[styles.checkbox, agreePrivacy && styles.checkboxChecked]}>
                  {agreePrivacy && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxText}>
                  By sign up I agree with <Text style={styles.linkText}>Privacy and Policy</Text>
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.signUpButton, { opacity: isLoading ? 0.7 : 1 }]}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              <Text style={styles.signUpButtonText}>
                {isLoading ? 'Creating Account...' : 'Create New Account'}
              </Text>
            </TouchableOpacity>

         
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Footer - Fixed */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      {/* Loading Overlay */}
      <LoadingOverlay visible={isLoading} text="Creating your account" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  brandText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  brandIcon: {
    width: 40,
    height: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D11A38',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  form: {
    paddingBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8E8E93',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: 'white',
    color: 'black',
  },
  inputError: {
    borderColor: '#D11A38',
  },
  errorText: {
    color: '#D11A38',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  checkboxContainer: {
    marginBottom: 30,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#E5E5EA',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#D11A38',
    borderColor: '#D11A38',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxText: {
    fontSize: 14,
    color: '#8E8E93',
    flex: 1,
  },
  linkText: {
    color: '#D11A38',
    fontWeight: '500',
  },
  signUpButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#D11A38',
    marginBottom: 20,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  googleButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginBottom: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  appleButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  appleButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#595959',
  },
  signInText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D11A38',
  },
});