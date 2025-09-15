import BackButtonWithText from '@/components/BackButtonWithText';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Linking, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../config/firebase';
import { useAuthContext } from '../../contexts/AuthContext';

export default function ForgotPasswordEmailScreen() {
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { resetPassword } = useAuthContext();

	const handleSendEmail = async () => {
		if (!email) {
			Alert.alert('Error', 'Please enter your email address');
			return;
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			Alert.alert('Error', 'Please enter a valid email address');
			return;
		}

		setIsLoading(true);

		try {
			console.log('Forgot Password - Checking if email exists using fetchSignInMethodsForEmail:', email);
			
			// First, check if email exists using fetchSignInMethodsForEmail
			const signInMethods = await fetchSignInMethodsForEmail(auth, email);
			console.log('Forgot Password - Sign in methods found:', signInMethods);
			console.log('Forgot Password - Sign in methods length:', signInMethods.length);
			console.log('Forgot Password - Sign in methods type:', typeof signInMethods);
			console.log('Forgot Password - Sign in methods is array:', Array.isArray(signInMethods));
			
			// Check if email is registered
			if (signInMethods.length === 0) {
				console.log('Forgot Password - Email not found in Firebase (empty array)');
				Alert.alert(
					'Email Not Found',
					'This email address is not registered with our service. Please check your email address or sign up for a new account.',
					[
						{
							text: 'OK',
							onPress: () => {
								console.log('Forgot Password - User acknowledged email not found');
							}
						}
					]
				);
				return;
			}
			
			console.log('Forgot Password - Email found, sending reset email to:', email);
			
			// Email exists, send reset email
			await resetPassword(email);
			
			console.log('Forgot Password - Reset email sent successfully');
			
			// Navigate to forgot-password screen first
			router.push('/(auth)/forgot-password');
			
			// Show alert with options after navigation
			setTimeout(() => {
				Alert.alert(
					'Email Sent',
					'Password reset link has been sent to your email address.',
					[
						{
							text: 'Cancel',
							style: 'cancel',
							onPress: () => {
								console.log('Forgot Password - User cancelled');
							}
						},
						{
							text: 'Go to Mail',
							onPress: () => {
								console.log('Forgot Password - Opening mail app');
								openMailApp();
							}
						}
					]
				);
			}, 500); // Small delay to ensure navigation completes
			
		} catch (error: any) {
			console.error('Forgot Password - Error during process:', error);
			console.error('Forgot Password - Error code:', error.code);
			console.error('Forgot Password - Error message:', error.message);
			console.error('Forgot Password - Full error object:', JSON.stringify(error, null, 2));
			
			// Handle different types of errors
			if (error.code === 'auth/invalid-email') {
				console.log('Forgot Password - Invalid email format');
				Alert.alert(
					'Invalid Email',
					'Please enter a valid email address.',
					[
						{
							text: 'OK',
							onPress: () => {
								console.log('Forgot Password - User acknowledged invalid email');
							}
						}
					]
				);
			} else if (error.code === 'auth/user-not-found') {
				console.log('Forgot Password - Email not found in Firebase (from resetPassword)');
				Alert.alert(
					'Email Not Found',
					'This email address is not registered with our service. Please check your email address or sign up for a new account.',
					[
						{
							text: 'OK',
							onPress: () => {
								console.log('Forgot Password - User acknowledged email not found');
							}
						}
					]
				);
			} else {
				console.log('Forgot Password - Other error occurred:', error.code);
				Alert.alert('Error', error.message || 'Failed to process request. Please try again.');
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
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.keyboardView}
			>
				{/* Header */}
				<View style={styles.header}>
					<BackButtonWithText isDarkMode={false} />
				</View>

				<View style={styles.content}>
					<View style={styles.headerSection}>
						<ThemedText type="title" style={styles.title}>
							Forgot Password
						</ThemedText>
						<ThemedText type="default" style={styles.subtitle}>
							Enter your email address and we'll send you a link to reset your password
						</ThemedText>
					</View>

					<View style={styles.form}>
						<View style={styles.inputContainer}>
							<Text style={styles.label}>Email Address</Text>
							<TextInput
								style={styles.input}
								placeholder="Enter your email address"
								placeholderTextColor="#8E8E93"
								value={email}
								onChangeText={setEmail}
								keyboardType="email-address"
								autoCapitalize="none"
								autoCorrect={false}
								autoFocus
							/>
						</View>
					</View>
				</View>

				{/* Send Email Button - Fixed at bottom */}
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={[styles.sendButton, { opacity: isLoading ? 0.7 : 1 }]}
						onPress={handleSendEmail}
						disabled={isLoading}
					>
						<Text style={styles.sendButtonText}>
							{isLoading ? 'Sending...' : 'Send Email'}
						</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	keyboardView: {
		flex: 1,
	},
	header: {
		paddingHorizontal: 22,
		paddingVertical: 10,
	},
	content: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 40,
		justifyContent: 'center',
	},
	headerSection: {
		alignItems: 'center',
		marginBottom: 40,
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		color: '#D11A38',
		marginBottom: 16,
		textAlign: 'center',
	},
	subtitle: {
		fontSize: 16,
		color: '#8E8E93',
		textAlign: 'center',
		lineHeight: 24,
		paddingHorizontal: 20,
	},
	form: {
		marginBottom: 30,
	},
	inputContainer: {
		marginBottom: 30,
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
	buttonContainer: {
		paddingHorizontal: 22,
		paddingVertical: 20,
	},
	sendButton: {
		backgroundColor: '#D11A38',
		paddingVertical: 16,
		borderRadius: 12,
		alignItems: 'center',
	},
	sendButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '600',
	},
});
