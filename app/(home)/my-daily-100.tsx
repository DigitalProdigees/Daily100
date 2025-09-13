import BackButtonWithText from '@/components/BackButtonWithText';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function MyDaily100Screen() {
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [dpiExpanded, setDpiExpanded] = useState(false);
  const [linkedinExpanded, setLinkedinExpanded] = useState(false);
  const [dailyMustExpanded, setDailyMustExpanded] = useState(false);
  const [qualifiedBuyerExpanded, setQualifiedBuyerExpanded] = useState(false);
  const dpiSlideAnimation = useRef(new Animated.Value(0)).current;
  const linkedinSlideAnimation = useRef(new Animated.Value(0)).current;
  const dailyMustSlideAnimation = useRef(new Animated.Value(0)).current;
  const qualifiedBuyerSlideAnimation = useRef(new Animated.Value(0)).current;

  const handleToggle = () => {
    setToggleEnabled(!toggleEnabled);
  };

  const handleDpiToggle = () => {
    const toValue = dpiExpanded ? 0 : 1;
    setDpiExpanded(!dpiExpanded);

    // Close LinkedIn, Daily Must, and Qualified Buyer if they're open
    if (linkedinExpanded) {
      setLinkedinExpanded(false);
      Animated.timing(linkedinSlideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    if (dailyMustExpanded) {
      setDailyMustExpanded(false);
      Animated.timing(dailyMustSlideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    if (qualifiedBuyerExpanded) {
      setQualifiedBuyerExpanded(false);
      Animated.timing(qualifiedBuyerSlideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    Animated.timing(dpiSlideAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleLinkedinToggle = () => {
    const toValue = linkedinExpanded ? 0 : 1;
    setLinkedinExpanded(!linkedinExpanded);

    // Close DPI, Daily Must, and Qualified Buyer if they're open
    if (dpiExpanded) {
      setDpiExpanded(false);
      Animated.timing(dpiSlideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    if (dailyMustExpanded) {
      setDailyMustExpanded(false);
      Animated.timing(dailyMustSlideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    if (qualifiedBuyerExpanded) {
      setQualifiedBuyerExpanded(false);
      Animated.timing(qualifiedBuyerSlideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    Animated.timing(linkedinSlideAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleDailyMustToggle = () => {
    const toValue = dailyMustExpanded ? 0 : 1;
    setDailyMustExpanded(!dailyMustExpanded);

    // Close DPI, LinkedIn, and Qualified Buyer if they're open
    if (dpiExpanded) {
      setDpiExpanded(false);
      Animated.timing(dpiSlideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    if (linkedinExpanded) {
      setLinkedinExpanded(false);
      Animated.timing(linkedinSlideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    if (qualifiedBuyerExpanded) {
      setQualifiedBuyerExpanded(false);
      Animated.timing(qualifiedBuyerSlideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    Animated.timing(dailyMustSlideAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleQualifiedBuyerToggle = () => {
    const toValue = qualifiedBuyerExpanded ? 0 : 1;
    setQualifiedBuyerExpanded(!qualifiedBuyerExpanded);

    // Close DPI, LinkedIn, and Daily Must if they're open
    if (dpiExpanded) {
      setDpiExpanded(false);
      Animated.timing(dpiSlideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    if (linkedinExpanded) {
      setLinkedinExpanded(false);
      Animated.timing(linkedinSlideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    if (dailyMustExpanded) {
      setDailyMustExpanded(false);
      Animated.timing(dailyMustSlideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    Animated.timing(qualifiedBuyerSlideAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const dpiTasks = [
    { id: 1, title: 'Calls: Outbound Prospecting', points: 1, total: 2 },
    { id: 2, title: 'Calls: Prospect Follow-Up', points: 1, total: 2 },
    { id: 3, title: 'Calls: Strategic Partner', points: 1, total: 2 },
    { id: 4, title: 'Calls: Client Nuturing', points: 1, total: 2 },
    { id: 5, title: 'Asked for a Referral', points: 1, total: 2 },
    { id: 6, title: 'Disqualified a Lead', points: 1, total: 2 },
    { id: 7, title: 'Set Appointment: Qualified Buyer', points: 1, total: 2 },
    { id: 8, title: 'Set Appointment: Strategic Partner', points: 1, total: 2 },
    { id: 9, title: 'Sales Meeting: Strategic Partner', points: 1, total: 2 },
    { id: 10, title: 'Sales Meeting: Qualified Buyer', points: 1, total: 2 },
    { id: 11, title: 'New Business Sold ($1,000-$5,000)', points: 1, total: 2 },
    { id: 12, title: 'New Buiness Sold ($10,000+)', points: 1, total: 2 },
    { id: 13, title: 'Sales Today', points: '$', total: '', isSpecial: true },
  ];

  const linkedinTasks = [
    { id: 1, title: 'Post/Share', dailyGoal: 1, points: 0, total: 0, extra: 1, extra2: 2 },
    { id: 2, title: 'Likes', dailyGoal: 1, points: 0, total: 0, extra: 1, extra2: 2 },
    { id: 3, title: 'Comments', dailyGoal: 1, points: 0, total: 0, extra: 1, extra2: 2 },
    { id: 4, title: 'Connection request\nsent', dailyGoal: 1, points: 0, total: 0, extra: 1, extra2: 2 },
    { id: 5, title: 'Message sent', dailyGoal: 1, points: 0, total: 0, extra: 1, extra2: 2 },
    { id: 6, title: 'Recommendation\nRequest', dailyGoal: 1, points: 0, total: 0, extra: 1, extra2: 2 },
  ];

  const dailyMustTasks = [
    { id: 1, title: 'Morning Exercise', points: 1, total: 2 },
    { id: 2, title: 'Healthy Breakfast', points: 1, total: 2 },
    { id: 3, title: 'Daily Reading', points: 1, total: 2 },
    { id: 4, title: 'Meditation', points: 1, total: 2 },
    { id: 5, title: 'Goal Review', points: 1, total: 2 },
    {
      id: 6, title: 'Facebook Live/ Social Media Post(Ladder Post) ', points: 1, total: 2
    },

  ];

  const qualifiedBuyerTasks = [
    { id: 1, title: 'Initial Discovery Call', points: 1, total: 2 },
    { id: 2, title: 'Follow-up Meeting', points: 1, total: 2 },
  ];

  const taskItems = [
    { id: 1, title: 'DPI (Tasks)', isExpandable: true },
    { id: 2, title: 'LinkedIn Activity', isExpandable: true },
    { id: 3, title: 'Daily Must', isExpandable: true },
    { id: 4, title: 'Qualified Buyer Conversation', isExpandable: true },
    { id: 5, title: 'Daily Calls' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButtonWithText />
        <View style={styles.headerCenter} />
        <TouchableOpacity style={styles.toggleContainer} onPress={handleToggle}>
          <View style={[
            styles.toggle,
            toggleEnabled && styles.toggleEnabled
          ]}>
            <View style={[
              styles.toggleThumb,
              toggleEnabled && styles.toggleThumbEnabled
            ]} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Title Section */}
      <View style={styles.titleSection}>
        <View style={styles.titleContainer}>
          <Text style={styles.appNameText}>My Daily </Text>
          <Image
            source={require('@/assets/images/100.png')}
            style={styles.appNameIcon}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Date and Time Info */}
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateText}>Date: 10/26/2023</Text>
        <Text style={styles.timeText}>Time: 08:23</Text>
      </View>

      {/* Task List */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {taskItems.map((item) => (
          <View key={item.id}>
            <TouchableOpacity
              style={[
                styles.taskCard,
                item.id === 1 && dpiExpanded && styles.expandedTaskCard,
                item.id === 2 && linkedinExpanded && styles.expandedTaskCard,
                item.id === 3 && dailyMustExpanded && styles.expandedTaskCard,
                item.id === 4 && qualifiedBuyerExpanded && styles.expandedTaskCard
              ]}
              onPress={item.isExpandable ? (item.id === 1 ? handleDpiToggle : item.id === 2 ? handleLinkedinToggle : item.id === 3 ? handleDailyMustToggle : handleQualifiedBuyerToggle) : undefined}
            >
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Image
                source={require('@/assets/images/chevron-right.png')}
                style={[
                  styles.chevronIcon,
                  {
                    transform: [
                      {
                        rotate: (item.id === 1 && dpiExpanded) || (item.id === 2 && linkedinExpanded) || (item.id === 3 && dailyMustExpanded) || (item.id === 4 && qualifiedBuyerExpanded) ? '270deg' : '90deg'
                      }
                    ]
                  }
                ]}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* DPI Tasks Dropdown */}
            {item.id === 1 && (
              <Animated.View
                style={[
                  styles.dropdownContent,
                  {
                    maxHeight: dpiSlideAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 900],
                    }),
                    opacity: dpiSlideAnimation,
                    marginBottom: dpiSlideAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 17],
                    }),
                  }
                ]}
              >
                {/* Header Row */}
                <View style={styles.dropdownHeader}>
                  <Text style={styles.dropdownHeaderText}>Tasks</Text>
                  <View style={styles.dropdownHeaderRight}>
                    <Text style={styles.dropdownHeaderText}>Points</Text>
                    <Text style={styles.dropdownHeaderText}>Total</Text>
                  </View>
                </View>

                {dpiTasks.map((task, index) => (
                  <View key={task.id} style={[
                    styles.taskItem,
                    task.isSpecial && styles.specialTaskItem,
                  ]}>
                    <Text style={styles.taskItemTitle}>{task.title}</Text>
                    <View style={styles.taskItemRight}>
                      <Text style={[
                        styles.pointsText,
                        task.isSpecial && styles.specialPointsText
                      ]}>
                        {task.points}
                      </Text>
                      <Text style={styles.totalText}>{task.total}</Text>
                    </View>
                  </View>
                ))}
              </Animated.View>
            )}

            {/* LinkedIn Activity Dropdown */}
            {item.id === 2 && (
              <Animated.View
                style={[
                  styles.linkedinDropdownContent,
                  {
                    maxHeight: linkedinSlideAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 550],
                    }),
                    opacity: linkedinSlideAnimation,
                    marginBottom: linkedinSlideAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 17],
                    }),
                  }
                ]}
              >
                {/* LinkedIn Header Row */}
                <View style={styles.linkedinDropdownHeader}>
                  <Text style={styles.linkedinDropdownHeaderText}>Activity</Text>
                  <View style={styles.linkedinDropdownHeaderRight}>
                    <Text style={styles.linkedinDropdownHeaderText}>DailyGoal points total</Text>

                  </View>
                </View>

                {linkedinTasks.map((task) => (
                  <View key={task.id} style={styles.linkedinTaskItem}>
                    <Text style={styles.linkedinTaskItemTitle}>{task.title}</Text>
                    <View style={styles.linkedinTaskItemRight}>
                      <Text style={styles.linkedinPointsText}>{task.dailyGoal}</Text>
                      <Text style={styles.linkedinPointsText}>{task.points}</Text>
                      <Text style={styles.linkedinPointsText}>{task.total}</Text>
                      <Text style={styles.linkedinPointsText}>{task.extra}</Text>
                      <Text style={styles.linkedinPointsText}>{task.extra2}</Text>
                    </View>
                  </View>
                ))}

                {/* LinkedIn Completed All Section */}
                <View style={styles.linkedinCompletedAllSection}>
                  <Text style={styles.linkedinCompletedAllText}>Completed All?</Text>
                  <View style={styles.linkedinYesNoButtons}>
                    <TouchableOpacity style={styles.linkedinNoButton}>
                      <Text style={styles.linkedinNoButtonText}>No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.linkedinYesButton}>
                      <Text style={styles.linkedinYesButtonText}>Yes</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Animated.View>
            )}

            {/* Daily Must Dropdown */}
            {item.id === 3 && (
              <Animated.View
                style={[
                  styles.dailyMustDropdownContent,
                  {
                    maxHeight: dailyMustSlideAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 500],
                    }),
                    opacity: dailyMustSlideAnimation,
                    marginBottom: dailyMustSlideAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 17],
                    }),
                  }
                ]}
              >
                {/* Daily Must Header Row */}
                <View style={styles.dailyMustDropdownHeader}>
                  <Text style={styles.dailyMustDropdownHeaderText}>Tasks</Text>
                  <View style={styles.dailyMustDropdownHeaderRight}>
                    <Text style={styles.dailyMustDropdownHeaderText}>Points</Text>
                    <Text style={styles.dailyMustDropdownHeaderText}>Total</Text>
                  </View>
                </View>

                {dailyMustTasks.map((task, index) => (
                  <View key={task.id} style={styles.dailyMustTaskItem}>
                    <Text style={styles.dailyMustTaskItemTitle}>{task.title}</Text>
                    <View style={styles.dailyMustTaskItemRight}>
                      <Text style={styles.dailyMustPointsText}>
                        {task.points}
                      </Text>
                      <Text style={styles.dailyMustTotalText}>{task.total}</Text>
                    </View>
                  </View>
                ))}
              </Animated.View>
            )}

            {/* Qualified Buyer Conversation Dropdown */}
            {item.id === 4 && (
              <Animated.View
                style={[
                  styles.qualifiedBuyerDropdownContent,
                  {
                    maxHeight: qualifiedBuyerSlideAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 200],
                    }),
                    opacity: qualifiedBuyerSlideAnimation,
                    marginBottom: qualifiedBuyerSlideAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 17],
                    }),
                  }
                ]}
              >
                {/* Qualified Buyer Header Row */}
                <View style={styles.qualifiedBuyerDropdownHeader}>
                  <Text style={styles.qualifiedBuyerDropdownHeaderText}>Tasks</Text>
                  <View style={styles.qualifiedBuyerDropdownHeaderRight}>
                    <Text style={styles.qualifiedBuyerDropdownHeaderText}>Points</Text>
                    <Text style={styles.qualifiedBuyerDropdownHeaderText}>Total</Text>
                  </View>
                </View>

                {qualifiedBuyerTasks.map((task, index) => (
                  <View key={task.id} style={styles.qualifiedBuyerTaskItem}>
                    <Text style={styles.qualifiedBuyerTaskItemTitle}>{task.title}</Text>
                    <View style={styles.qualifiedBuyerTaskItemRight}>
                      <Text style={styles.qualifiedBuyerPointsText}>
                        {task.points}
                      </Text>
                      <Text style={styles.qualifiedBuyerTotalText}>{task.total}</Text>
                    </View>
                  </View>
                ))}
              </Animated.View>
            )}
          </View>
        ))}
      </ScrollView>
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
  titleSection: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appNameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  appNameIcon: {
    width: 32,
    height: 32,
  },
  toggleContainer: {
    padding: 4,
  },
  toggle: {
    width: 50,
    height: 30,
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleEnabled: {
    backgroundColor: '#D11A38',
  },
  toggleThumb: {
    width: 26,
    height: 26,
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toggleThumbEnabled: {
    alignSelf: 'flex-end',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingVertical: 16,
  },
  dateText: {
    fontSize: 16,
    color: '#898989',
    fontWeight: '500',
  },
  timeText: {
    fontSize: 16,
    color: '#898989',
    fontWeight: '500',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 22,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D11A38',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 17,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskTitle: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
    flex: 1,
  },
  chevronIcon: {
    width: 15,
    height: 15,
    tintColor: '#666666',
  },
  expandedTaskCard: {
    borderColor: '#D11A38',
  },
  dropdownContent: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D11A38',
    borderTopWidth: 1,
    backgroundColor: '#FEE7EA',
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginRight: 10,
    paddingVertical: 12,
    borderBottomWidth: 0,
  },
  dropdownHeaderText: {
    fontSize: 14,
    color: '#C9485D',
    fontWeight: '600',
  },
  dropdownHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 90,
    justifyContent: 'space-between',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0,
    backgroundColor: '#FFECEC',
  },
  specialTaskItem: {
    borderRadius: 10
  },

  taskItemTitle: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
    marginRight: 16,
    fontWeight: '500',
  },
  taskItemRight: {
    flexDirection: 'row',
    minWidth: 100,
    borderRadius: 8,
    backgroundColor: '#FFE5E9',
    paddingVertical: 10,
  },
  pointsText: {

    color: '#D11A38',
    fontSize: 12,
    textAlign: 'center',
    flex: 1,
  },
  specialPointsText: {
    color: '#D11A38',
    fontWeight: '600',
    right: '-27%',
  },
  totalText: {
    fontSize: 12,
    color: '#D11A38',
    textAlign: 'center',
    flex: 1,
  },

  // LinkedIn-specific styles
  linkedinDropdownContent: {


    marginTop: -1,
  },
  linkedinDropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FEE7EA',
    borderTopWidth: 1,
    borderColor: '#D11A38',

    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  linkedinDropdownHeaderText: {

    fontSize: 14,
    color: '#C9485D',
    fontWeight: '600',
  },
  linkedinDropdownHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 90,
    justifyContent: 'space-between',
  },
  linkedinTaskItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderBottomWidth: 0,
    backgroundColor: '#FFECEC',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#D11A38',

  },
  linkedinTaskItemTitle: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
    marginRight: 16,
    fontWeight: '500',
  },
  linkedinTaskItemRight: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minWidth: 150,
    borderRadius: 8,
    backgroundColor: '#FFE5E9',
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  linkedinPointsText: {
    color: '#D11A38',
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    lineHeight: 22,
  },
  linkedinCompletedAllSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFECEC',
    paddingBottom: 15,
    paddingTop: 6,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderColor: '#D11A38',

  },
  linkedinCompletedAllText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  linkedinYesNoButtons: {
    flexDirection: 'row',
  },
  linkedinNoButton: {
    backgroundColor: '#FFE5E9',
    paddingHorizontal: 24,
    paddingVertical: 3,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
  },
  linkedinNoButtonText: {
    fontSize: 18,
    color: '#D11A38',
    fontWeight: '500',
  },
  linkedinYesButton: {
    backgroundColor: '#FFE5E9',
    paddingHorizontal: 24,
    paddingVertical: 3,
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
  },
  linkedinYesButtonText: {
    fontSize: 18,
    color: '#D11A38',
    fontWeight: '500',
  },

  // Daily Must-specific styles
  dailyMustDropdownContent: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D11A38',
    borderTopWidth: 1,
    backgroundColor: '#FFECEC',
  },
  dailyMustDropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginRight: 10,
    paddingVertical: 12,
    borderBottomWidth: 0,
  },
  dailyMustDropdownHeaderText: {
    fontSize: 14,
    color: '#C9485D',
    fontWeight: '600',
  },
  dailyMustDropdownHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 90,
    justifyContent: 'space-between',
  },
  dailyMustTaskItem: {
    backgroundColor: '#FFECEC',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0,
  },
  dailyMustSpecialTaskItem: {
    borderRadius: 10
  },
  dailyMustTaskItemTitle: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
    marginRight: 16,
    fontWeight: '500',
  },
  dailyMustTaskItemRight: {
    flexDirection: 'row',
    minWidth: 100,
    borderRadius: 8,
    backgroundColor: '#FFE5E9',
    paddingVertical: 10,
  },
  dailyMustPointsText: {
    color: '#D11A38',
    fontSize: 12,
    textAlign: 'center',
    flex: 1,
  },
  dailyMustSpecialPointsText: {
    color: '#D11A38',
    fontWeight: '600',
    right: '-27%',
  },
  dailyMustTotalText: {
    fontSize: 12,
    color: '#D11A38',
    textAlign: 'center',
    flex: 1,
  },

  // Qualified Buyer-specific styles
  qualifiedBuyerDropdownContent: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D11A38',
    borderTopWidth: 1,
    backgroundColor: '#FEE7EA',
  },
  qualifiedBuyerDropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginRight: 10,
    paddingVertical: 12,
    borderBottomWidth: 0,
  },
  qualifiedBuyerDropdownHeaderText: {
    fontSize: 14,
    color: '#C9485D',
    fontWeight: '600',
  },
  qualifiedBuyerDropdownHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 90,
    justifyContent: 'space-between',
  },
  qualifiedBuyerTaskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0,
    backgroundColor: '#FFECEC',
  },
  qualifiedBuyerTaskItemTitle: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
    marginRight: 16,
    fontWeight: '500',
  },
  qualifiedBuyerTaskItemRight: {
    flexDirection: 'row',
    minWidth: 100,
    borderRadius: 8,
    backgroundColor: '#FFE5E9',
    paddingVertical: 10,
  },
  qualifiedBuyerPointsText: {
    color: '#D11A38',
    fontSize: 12,
    textAlign: 'center',
    flex: 1,
  },
  qualifiedBuyerTotalText: {
    fontSize: 12,
    color: '#D11A38',
    textAlign: 'center',
    flex: 1,
  },
});