import BackButtonWithText from '@/components/BackButtonWithText';
import React from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	View
} from 'react-native';

export default function ScorecardScreen() {
	const scorecardMetrics = [
		{ id: 1, who: 'Zig', measurable: 'Number of Business Conversations', weeklyGo: 400 },
		{ id: 2, who: 'Zig', measurable: 'Number of Qualified Buyers Spoken With', weeklyGo: 400 },
		{ id: 3, who: 'Zig', measurable: 'Calls: Outbound Prospecting', weeklyGo: 400 },
		{ id: 4, who: 'Zig', measurable: 'Calls: Prospect Follow-Up', weeklyGo: 400 },
		{ id: 5, who: 'Zig', measurable: 'Calls: Strategic Partner', weeklyGo: 400 },
		{ id: 6, who: 'Zig', measurable: 'Calls: Client Nuturing', weeklyGo: 400 },
		{ id: 7, who: 'Zig', measurable: 'Asked for a Referral', weeklyGo: 400 },
		{ id: 8, who: 'Zig', measurable: 'Disqualified a Lead', weeklyGo: 400 },
		{ id: 9, who: 'Zig', measurable: 'Set Appointment: Qualified Buyer', weeklyGo: 400 },
		{ id: 10, who: 'Zig', measurable: 'Set Appointment: Qualified Buyer', weeklyGo: 400 },
		{ id: 11, who: 'Zig', measurable: 'Set Appointment: Qualified Buyer', weeklyGo: 400 },

		{ id: 12, who: 'Zig', measurable: 'Set Appointment: Qualified Buyer', weeklyGo: 400 },

		{ id: 13, who: 'Zig', measurable: 'Set Appointment: Qualified Buyer', weeklyGo: 400 },

		{ id: 14, who: 'Zig', measurable: 'Set Appointment: Qualified Buyer', weeklyGo: 400 },

		{ id: 15, who: 'Zig', measurable: 'Set Appointment: Qualified Buyer', weeklyGo: 400 },

		{ id: 16, who: 'Zig', measurable: 'Set Appointment: Qualified Buyer', weeklyGo: 400 },

		{ id: 17, who: 'Zig', measurable: 'Set Appointment: Qualified Buyer', weeklyGo: 400 },

	];

	const handleNext = () => {
		// Handle next button press
		console.log('Next pressed');
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
				<Text style={styles.title}>13 Weeks Metrics ScoreCard</Text>
				<Text style={styles.subtitle}>Weeks Beginning</Text>
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
						<View style={styles.whoColumn}>
							<Text style={[styles.headerText, { right: 5 }]}>Who</Text>
						</View>
						<View style={styles.measurableColumn}>
							<Text style={[styles.headerText, { right: 8 }]}>Measurable</Text>
						</View>
						<View style={styles.weeklyGoColumn}>
							<Text style={[styles.headerText, { left: 25 }]}>Weekly Goals</Text>
						</View>
					</View>

					{/* Scorecard Metrics List */}
					{scorecardMetrics.map((metric, index) => (
						<View key={metric.id} style={styles.metricRow}>
							<View style={styles.whoDataColumn}>
								<Text style={styles.metricText}>{metric.who}</Text>
							</View>
							<View style={styles.measurableDataColumn}>
								<Text style={[styles.metricText]}>{metric.measurable}</Text>
							</View>
							<View style={styles.weeklyGoDataColumn}>
								<Text style={styles.metricText}>{metric.weeklyGo}</Text>
							</View>
						</View>
					))}
				</View>
			</ScrollView>

			{/* Static Next Button */}

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
		paddingVertical: 10,
		paddingHorizontal: 17
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
		marginBottom: 8,
		paddingHorizontal: 30
	},
	subtitle: {
		fontSize: 16,
		color: '#666666',
		textAlign: 'center',
	},
	scrollContainer: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: 17,
	},
	card: {
		backgroundColor: '#FFFFFF',
		borderRadius: 16,
		marginVertical: 20,
		borderWidth: 1,
		borderColor: '#E0E0E0',
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
		backgroundColor: '#FFE5E9',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		paddingVertical: 12,
		borderColor: '#D11A38',
	},
	metricRow: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#00000010',
	},
	whoColumn: {
		paddingLeft: 30,

	},
	measurableColumn: {
		paddingHorizontal: 30,
		flex: 2.2,
	},
	weeklyGoColumn: {
		paddingRight: 40
	},
	headerText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#D11A38',
	},
	metricText: {
		fontSize: 14,
		color: '#333333',
		lineHeight: 18,
	},
	// Column data styles with borders
	whoDataColumn: {
		flex: 0.8,
		alignItems: 'center',
		justifyContent: 'center',
		borderRightWidth: 1,
		borderColor: '#00000010',
		paddingVertical: 8,
		minHeight: 50,
	},
	measurableDataColumn: {
		flex: 1.4,
		paddingHorizontal: 7,
		justifyContent: 'center',
		borderColor: '#00000010',
		paddingVertical: 8,
		minHeight: 50,
	},
	weeklyGoDataColumn: {
		flex: 1.2,
		paddingLeft: 3,
		alignItems: 'center',
		justifyContent: 'center',
		borderLeftWidth: 1,
		borderColor: '#00000010',
		paddingVertical: 8,
		minHeight: 50,
	},

});
