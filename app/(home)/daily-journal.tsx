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

export default function DailyJournal() {
	const [whatWentWell, setWhatWentWell] = useState('');
	const [whatCouldBeBetter, setWhatCouldBeBetter] = useState('');
	const [planToBeBetter, setPlanToBeBetter] = useState('');

	const handleNext = () => {
		router.push('/(home)/notes');
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
				<Text style={styles.title}>Daily Journal</Text>
			</View>

			{/* Content */}
			<View style={styles.content}>
				{/* What went well today */}
				<View style={styles.inputSection}>
					<Text style={styles.questionText}>What went well today?</Text>
					<TextInput
						style={styles.textInput}
						placeholder="Type here..."
						placeholderTextColor="#999999"
						value={whatWentWell}
						onChangeText={setWhatWentWell}
						multiline
						textAlignVertical="top"
					/>
				</View>

				{/* What could I have done better today */}
				<View style={styles.inputSection}>
					<Text style={styles.questionText}>What could I have done better today?</Text>
					<TextInput
						style={styles.textInput}
						placeholder="Type here..."
						placeholderTextColor="#999999"
						value={whatCouldBeBetter}
						onChangeText={setWhatCouldBeBetter}
						multiline
						textAlignVertical="top"
					/>
				</View>

				{/* What's the plan to be better */}
				<View style={styles.inputSection}>
					<Text style={styles.questionText}>What's the plan to be better?</Text>
					<TextInput
						style={styles.textInput}
						placeholder="Type here..."
						placeholderTextColor="#999999"
						value={planToBeBetter}
						onChangeText={setPlanToBeBetter}
						multiline
						textAlignVertical="top"
					/>
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
	},
	inputSection: {
		marginBottom: 30,
	},
	questionText: {
		fontSize: 16,
		fontWeight: '500',
		color: '#595959',
		marginBottom: 12,
	},
	textInput: {
		borderWidth: 1,
		borderColor: '#E0E0E0',
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 15,
		fontSize: 16,
		color: '#333333',
		backgroundColor: '#FFFFFF',
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
