import BackButtonWithText from '@/components/BackButtonWithText';
import { router } from 'expo-router';
import React from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

export default function DailyMust() {
	const linkedInActivities = [
		{ id: 1, activity: 'Post / Share', dailyGoal: 1, points: 1, total: 2 },
		{ id: 2, activity: 'Likes', dailyGoal: 1, points: 1, total: 2 },
		{ id: 3, activity: 'Comments', dailyGoal: 1, points: 1, total: 2 },
		{ id: 4, activity: 'Connection Request Sent', dailyGoal: 1, points: 1, total: 2 },
		{ id: 5, activity: 'Message Sent', dailyGoal: 1, points: 1, total: 2 },
		{ id: 6, activity: 'Recommendation Request', dailyGoal: 1, points: 1, total: 2 },
		{ id: 7, activity: 'Completed All?', dailyGoal: 1, points: 1, total: 2 },
		{ id: 8, activity: 'KEY:/ = Completed Activity', dailyGoal: 1, points: 1, total: 2 },
	];

	const handleNext = () => {
		router.push('/(home)/daily-calls');
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
				<Text style={styles.title}>Daily Must</Text>
			</View>

			{/* Scrollable Card Content */}
			<ScrollView
				style={styles.scrollContainer}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				{/* Main Content Card */}
				<View style={styles.card}>
					{/* Column Headers */}
					<View style={styles.headerRow}>
						<View style={styles.titleColumn}>
							<Text style={[styles.headerText, { width: 90, right: 5 }]}>LinkedIn Activity</Text>
						</View>
						<View style={styles.goalColumn}>
							<Text style={[styles.headerText, { left: 8, width: 70 }]}>Daily Goal</Text>
						</View>
						<View style={styles.pointsColumn}>
							<Text style={[styles.headerText, { left: 14 }]}>Points</Text>
						</View>
						<View style={styles.totalColumn}>
							<Text style={styles.headerText}>Total</Text>
						</View>
					</View>

					{/* Activity List */}
					{linkedInActivities.map((activity, index) => (
						<View key={activity.id} style={styles.activityRow}>
							<View style={styles.titleColumn}>
								<Text style={styles.activityText}>{activity.activity}</Text>
							</View>
							<View style={styles.combinedValueContainer}>
								<View style={styles.goalColumn}>
									<Text style={[styles.valueText, { left: - 1 }]}>{activity.dailyGoal}</Text>
								</View>
								<View style={styles.pointsColumn}>
									<Text style={styles.valueText}>{activity.points}</Text>
								</View>
								<View style={styles.totalColumn}>
									<Text style={[styles.valueText, { left: 10 }]}>{activity.total}</Text>
								</View>
							</View>
						</View>
					))}
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
		paddingHorizontal: 25,
		paddingBottom: 20,
	},
	card: {
		backgroundColor: '#FFFFFF',
		borderRadius: 16,
		marginVertical: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 5,
	},
	headerRow: {
		flexDirection: 'row',
		marginBottom: 1,
		paddingLeft: 14,
		marginTop: 20,
		paddingRight: 10
	},

	activityRow: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 18,
		paddingVertical: 12,
	},
	titleColumn: {
		flex: 2.4,
		marginRight: 8
	},
	goalColumn: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	pointsColumn: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	totalColumn: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 8,
	},
	combinedValueContainer: {
		flex: 2.5,
		flexDirection: 'row',
		backgroundColor: '#FFE5E9',
		borderRadius: 8,
		paddingHorizontal: 8,
		paddingVertical: 12,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	headerText: {
		fontSize: 11,
		fontWeight: '600',
		color: '#333333',
		textAlign: 'center',
	},
	activityText: {
		fontSize: 12,
		color: '#333333',
		lineHeight: 20,
	},
	valueText: {
		fontSize: 14,
		fontWeight: '600',
		left: 10,
		color: '#D11A38',
		textAlign: 'center',
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
