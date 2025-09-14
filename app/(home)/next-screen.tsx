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

export default function NextScreen() {
	const performanceMetrics = [
		{ id: 1, title: 'Exercise for 1 Hour', points: 1, total: 2 },
		{ id: 2, title: 'Eat Health Food & Hydrated', points: 1, total: 2 },
		{
			id: 3, title: 'Finished Whats Important Now (W.I.N.) ', points: 1, total: 2
		},
		{ id: 4, title: 'Role Play or Record Yourself', points: 1, total: 2 },
		{
			id: 5, title: 'IQ: Read Sales Literature 10 Pages / Study Online Traning (15 Min) ', points: 1, total: 2
		},
		{
			id: 6, title: 'EQ: Studied for Yourself & Team (Cloverleaf)(5 Min) ', points: 1, total: 2
		},
		{
			id: 7, title: 'LQ: Read Leadership Article / Study Online Training for 15 minutes', points: 1, total: 2
		},
		{
			id: 8, title: 'MQ: Managed Time, Technique, Task & Team for yourself and Management', points: 1, total: 2
		},
		{ id: 9, title: 'Sales Meeting: Qualified Buyer', points: 1, total: 2 },
		{ id: 10, title: 'New Business Sold ($1,000-$5,000)', points: 1, total: 2 },
		{ id: 11, title: 'New Business Sold ($10,000+)', points: 1, total: 2 },
		{ id: 12, title: 'Disqualified a Lead', points: 1, total: 2 },
		{ id: 13, title: 'Follow-up Meeting', points: 1, total: 2 },
		{ id: 14, title: 'Initial Discovery Call', points: 1, total: 2 },
		{ id: 15, title: 'Client Presentation', points: 1, total: 2 },
		{ id: 16, title: 'Contract Negotiation', points: 1, total: 2 },
		{ id: 17, title: 'Deal Closure', points: 1, total: 2 },
		{ id: 18, title: 'Customer Onboarding', points: 1, total: 2 },
		{ id: 19, title: 'Account Management', points: 1, total: 2 },
		{ id: 20, title: 'Upselling Opportunity', points: 1, total: 2 },
	];

	const handleNext = () => {
		router.push('/(home)/scorecard-screen');
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

			{/* Header */}
			<View style={styles.header}>
				<BackButtonWithText isDarkMode={false} />
				<View style={styles.headerCenter} />
			</View>

			{/* Static Title */}
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
							<Text style={styles.headerText}></Text>
						</View>
						<View style={styles.pointsColumn}>
							<Text style={[styles.headerText, { left: 10 }]}>Points</Text>
						</View>
						<View style={styles.totalColumn}>
							<Text style={styles.headerText}>Total</Text>
						</View>
					</View>

					{/* Performance Metrics List */}
					{performanceMetrics.map((metric, index) => (
						<View key={metric.id} style={styles.metricRow}>
							<View style={styles.titleColumn}>
								<Text style={styles.metricTitle}>{metric.title}</Text>
							</View>
							<View style={styles.combinedValueContainer}>
								<View style={styles.pointsColumn}>
									<Text style={styles.valueText}>{metric.points}</Text>
								</View>
								<View style={styles.totalColumn}>
									<Text style={styles.valueText}>{metric.total}</Text>
								</View>
							</View>
						</View>
					))}
				</View>
			</ScrollView>

			{/* Static Next Button */}
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
		justifyContent: 'space-between',
		paddingHorizontal: 22,
		paddingVertical: 10,
	},
	headerCenter: {
		flex: 1,
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
		paddingHorizontal: 17,
		paddingBottom: 20,
	},
	card: {
		backgroundColor: '#FFFFFF',
		borderRadius: 16,
		padding: 20,
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
		marginBottom: 10,
		paddingBottom: 8,
	},
	metricRow: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
	},
	titleColumn: {
		flex: 2,
		marginRight: 8
	},
	combinedValueContainer: {
		flex: 1.4,
		flexDirection: 'row',
		backgroundColor: '#FFE5E9',
		borderRadius: 8,
		paddingHorizontal: 8,
		paddingVertical: 12,
		alignItems: 'center',
	},
	pointsColumn: {
		flex: 1,
		alignItems: 'center',
	},
	totalColumn: {
		flex: 1,
		alignItems: 'center',
	},
	headerText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#333333',
		textAlign: 'center',
	},
	metricTitle: {
		fontSize: 14,
		color: '#333333',
		lineHeight: 20,
	},
	valueText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#D11A38',
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
