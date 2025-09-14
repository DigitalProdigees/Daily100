import BackButtonWithText from '@/components/BackButtonWithText';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordEmailScreen() {
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);

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

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			// Navigate to the existing forgot-password screen
			router.push('/(auth)/forgot-password');
		}, 1500);
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
