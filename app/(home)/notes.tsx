import BackButtonWithText from '@/components/BackButtonWithText';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';

export default function Notes() {
	const [notes, setNotes] = useState('');

	const handleNext = () => {
		router.push('/(home)/daily-must');
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

			{/* Header */}
			<View style={styles.header}>
				<BackButtonWithText isDarkMode={false} />
			</View>

			{/* Title */}
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Notes</Text>
			</View>

			{/* Content */}
			<View style={styles.content}>
				<Text style={styles.labelText}>
					Call / Activity Notes: Name / Champion / Economic Buyer / Strategic Partner
				</Text>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.textInput}
						placeholder=""
						placeholderTextColor="#999999"
						value={notes}
						onChangeText={setNotes}
						multiline
						textAlignVertical="top"
					/>
					{/* Ruled lines */}
					<View style={styles.ruledLines}>
						{Array.from({ length: 20 }, (_, i) => (
							<View key={i} style={styles.ruledLine} />
						))}
					</View>
				</View>
			</View>

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
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 22,
		paddingVertical: 10,
	},
	titleContainer: {
		alignItems: 'center',
		paddingVertical: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#D11A38',
		textAlign: 'center',
	},
	content: {
		flex: 1,
		paddingHorizontal: 22,
		paddingTop: 20,
		paddingBottom: 20,
	},
	labelText: {
		fontSize: 16,
		fontWeight: '500',
		color: '#333333',
		marginBottom: 12,
	},
	inputContainer: {
		height: 490,
		position: 'relative',
		overflow: 'hidden',
		borderRadius: 8,
	},
	textInput: {
		borderWidth: 1,
		borderColor: '#E0E0E0',
		borderRadius: 8,
		paddingHorizontal: 16,
		paddingVertical: 12,
		fontSize: 16,
		color: '#333333',
		height: 490,
		backgroundColor: 'transparent',
		textAlignVertical: 'top',
		zIndex: 2,
		lineHeight: 24,
	},
	ruledLines: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 1,
		paddingVertical: 12,
	},
	ruledLine: {
		height: 1,
		backgroundColor: '#E0E0E0',
		marginTop: 23,
	},
	buttonContainer: {
		paddingHorizontal: 22,
		paddingVertical: 20,
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
