import BackButtonWithText from '@/components/BackButtonWithText';
import React, { useState } from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

export default function DailyCalls() {
	const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

	const numbers = Array.from({ length: 55 }, (_, i) => i + 1);

	const handleNumberPress = (number: number) => {
	};

	const handleNext = () => {
		// Handle next button press - could navigate back to main screen or show completion
		console.log('Daily calls flow completed');
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
				<Text style={styles.title}>Daily Calls</Text>
			</View>

			{/* Numbers Grid */}
			<ScrollView
				style={styles.scrollContainer}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				<View style={styles.gridContainer}>
					<View style={styles.card}>
						<View style={styles.numbersGrid}>
							{numbers.map((number) => (
								<TouchableOpacity
									key={number}
									style={[
										styles.numberButton,
										selectedNumber === number && styles.selectedNumberButton
									]}
									onPress={() => handleNumberPress(number)}
								>
									<Text style={[
										styles.numberText,
										selectedNumber === number && styles.selectedNumberText
									]}>
										{number}
									</Text>
								</TouchableOpacity>
							))}
						</View>
					</View>
				</View>
			</ScrollView>

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
	scrollContainer: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: 22,
		paddingTop: 20,
		paddingBottom: 20,
	},
	gridContainer: {
		paddingHorizontal: 0,
		paddingTop: 0,
	},
	card: {
		backgroundColor: '#FFFFFF',
		borderRadius: 16,
		padding: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 5,
	},
	numbersGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	numberButton: {
		width: '18%',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 15,
		marginHorizontal: '1%',
		borderRadius: 8,
	},
	selectedNumberButton: {
		backgroundColor: '#D11A38',
	},
	numberText: {
		fontSize: 16,
		fontWeight: '500',
		color: '#333333',
	},
	selectedNumberText: {
		color: '#FFFFFF',
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
