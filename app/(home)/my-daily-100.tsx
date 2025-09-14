import BackButtonWithText from '@/components/BackButtonWithText';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
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
  const [dailyCallsExpanded, setDailyCallsExpanded] = useState(false);
  const dpiSlideAnimation = useRef(new Animated.Value(0)).current;
  const linkedinSlideAnimation = useRef(new Animated.Value(0)).current;
  const dailyMustSlideAnimation = useRef(new Animated.Value(0)).current;
  const qualifiedBuyerSlideAnimation = useRef(new Animated.Value(0)).current;
  const dailyCallsSlideAnimation = useRef(new Animated.Value(0)).current;

  const handleToggle = () => {
    setToggleEnabled(!toggleEnabled);
  };

  const handleDpiToggle = () => {
    const toValue = dpiExpanded ? 0 : 1;
    setDpiExpanded(!dpiExpanded);

    // Close LinkedIn, Daily Must, Qualified Buyer, and Daily Calls if they're open
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
    if (dailyCallsExpanded) {
      setDailyCallsExpanded(false);
      Animated.timing(dailyCallsSlideAnimation, {
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

    // Close DPI, Daily Must, Qualified Buyer, and Daily Calls if they're open
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
    if (dailyCallsExpanded) {
      setDailyCallsExpanded(false);
      Animated.timing(dailyCallsSlideAnimation, {
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

    // Close DPI, LinkedIn, Qualified Buyer, and Daily Calls if they're open
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
    if (dailyCallsExpanded) {
      setDailyCallsExpanded(false);
      Animated.timing(dailyCallsSlideAnimation, {
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

    // Close DPI, LinkedIn, Daily Must, and Daily Calls if they're open
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
    if (dailyCallsExpanded) {
      setDailyCallsExpanded(false);
      Animated.timing(dailyCallsSlideAnimation, {
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

  const handleDailyCallsToggle = () => {
    const toValue = dailyCallsExpanded ? 0 : 1;
    setDailyCallsExpanded(!dailyCallsExpanded);

    // Close DPI, LinkedIn, Daily Must, and Qualified Buyer if they're open
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
    if (qualifiedBuyerExpanded) {
      setQualifiedBuyerExpanded(false);
      Animated.timing(qualifiedBuyerSlideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    Animated.timing(dailyCallsSlideAnimation, {
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

  // Create array of 55 daily calls (1-55)
  const dailyCallsTasks = Array.from({ length: 55 }, (_, index) => {
    const callNumber = index + 1;
    let status = 'regular'; // default status

    // Based on the image, these are the completed calls (solid pink circles)
    const completedCalls = [13, 16, 20, 23, 33, 36, 40, 43];
    // These are pending/planned calls (pink circle outlines) - random numbers
    const pendingCalls = [3, 8, 19, 27, 35, 42, 48, 52];
    // These are crossed-out calls (diagonal red lines)
    const crossedOutCalls = [4, 11, 14, 53];

    if (completedCalls.includes(callNumber)) {
      status = 'completed';
    } else if (pendingCalls.includes(callNumber)) {
      status = 'pending';
    } else if (crossedOutCalls.includes(callNumber)) {
      status = 'crossed';
    }

    return {
      id: callNumber,
      number: callNumber,
      status: status
    };
  });

  const taskItems = [
    { id: 1, title: 'DPI (Tasks)', isExpandable: true },
    { id: 2, title: 'LinkedIn Activity', isExpandable: true },
    { id: 3, title: 'Daily Must', isExpandable: true },
    { id: 4, title: 'Qualified Buyer Conversation', isExpandable: true },
    { id: 5, title: 'Daily Calls', isExpandable: true },
  ];

  return (
    <SafeAreaView style={[styles.container, toggleEnabled && styles.containerDark]}>
      <StatusBar
        barStyle={toggleEnabled ? 'light-content' : 'dark-content'}
        backgroundColor={toggleEnabled ? '#000000' : '#FFFFFF'}
      />
      {/* Header */}
      <View style={styles.header}>
        <BackButtonWithText isDarkMode={toggleEnabled} />
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
          <Text style={[styles.appNameText, toggleEnabled && styles.appNameTextDark]}>My Daily </Text>
          <Image
            source={require('@/assets/images/100.png')}
            style={[styles.appNameIcon, toggleEnabled && styles.appNameIconDark]}
            resizeMode="contain"
          />
        </View>

        {/* Metric Buttons - Only show when Daily Calls is open and toggle is on */}
        {dailyCallsExpanded && toggleEnabled && (
          <View style={styles.metricButtonsContainer}>
            <View style={styles.metricButtonsRow}>
              <View style={styles.metricButton}>
                <View style={[styles.metricButtonIcon, styles.callMadeIcon]}>
                  <Text style={styles.metricButtonIconText}>4</Text>
                  <View style={styles.crossLine} />
                </View>
                <Text style={styles.metricButtonText}>Call Made</Text>
              </View>
              <View style={styles.metricButton}>
                <View style={[styles.metricButtonIcon, styles.prospectIcon]}>
                  <Text style={styles.metricButtonIconText}>4</Text>
                </View>
                <Text style={styles.metricButtonText}>Prospect</Text>
              </View>
              <View style={styles.metricButton}>
                <View style={[styles.metricButtonIcon, styles.appointmentIcon]}>
                  <Text style={styles.metricButtonIconText}>4</Text>
                </View>
                <Text style={styles.metricButtonText}>Appointment</Text>
              </View>
            </View>
            <View style={styles.totalCallsButton}>
              <Text style={styles.totalCallsButtonText}>Total Calls Made: 59</Text>
            </View>
          </View>
        )}
      </View>

      {/* Date and Time Info */}
      <View style={styles.dateTimeContainer}>
        <Text style={[styles.dateText, toggleEnabled && styles.dateTextDark]}>Date: 10/26/2023</Text>
        <Text style={[styles.timeText, toggleEnabled && styles.timeTextDark]}>Time: 08:23</Text>
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
                toggleEnabled && styles.taskCardDark,
                item.id === 1 && dpiExpanded && (toggleEnabled ? styles.expandedTaskCardDark : styles.expandedTaskCard),
                item.id === 2 && linkedinExpanded && (toggleEnabled ? styles.expandedTaskCardDark : styles.expandedTaskCard),
                item.id === 3 && dailyMustExpanded && (toggleEnabled ? styles.expandedTaskCardDark : styles.expandedTaskCard),
                item.id === 4 && qualifiedBuyerExpanded && (toggleEnabled ? styles.expandedTaskCardDark : styles.expandedTaskCard),
                item.id === 5 && dailyCallsExpanded && (toggleEnabled ? styles.expandedTaskCardDark : styles.expandedTaskCard)
              ]}
              onPress={item.isExpandable ? (item.id === 1 ? handleDpiToggle : item.id === 2 ? handleLinkedinToggle : item.id === 3 ? handleDailyMustToggle : item.id === 4 ? handleQualifiedBuyerToggle : handleDailyCallsToggle) : undefined}
            >
              <Text style={[styles.taskTitle, toggleEnabled && styles.taskTitleDark]}>{item.title}</Text>
              <Image
                source={require('@/assets/images/chevron-right.png')}
                style={[
                  styles.chevronIcon,
                  toggleEnabled && styles.chevronIconDark,
                  {
                    transform: [
                      {
                        rotate: (item.id === 1 && dpiExpanded) || (item.id === 2 && linkedinExpanded) || (item.id === 3 && dailyMustExpanded) || (item.id === 4 && qualifiedBuyerExpanded) || (item.id === 5 && dailyCallsExpanded) ? '270deg' : '90deg'
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
                  toggleEnabled && styles.dropdownContentDark,
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
                  <Text style={[styles.dropdownHeaderText, toggleEnabled && styles.dropdownHeaderTextDark]}>Tasks</Text>
                  <View style={styles.dropdownHeaderRight}>
                    <Text style={[styles.dropdownHeaderText, toggleEnabled && styles.dropdownHeaderTextDark]}>Points</Text>
                    <Text style={[styles.dropdownHeaderText, toggleEnabled && styles.dropdownHeaderTextDark]}>Total</Text>
                  </View>
                </View>

                {dpiTasks.map((task, index) => (
                  <View key={task.id} style={[
                    styles.taskItem,
                    toggleEnabled && styles.taskItemDark,
                    task.isSpecial && styles.specialTaskItem,
                  ]}>
                    <Text style={[styles.taskItemTitle, toggleEnabled && styles.taskItemTitleDark]}>{task.title}</Text>
                    <View style={[styles.taskItemRight, toggleEnabled && styles.taskItemRightDark]}>
                      <Text style={[
                        styles.pointsText,
                        toggleEnabled && styles.pointsTextDark,
                        task.isSpecial && (toggleEnabled ? styles.specialPointsTextDark : styles.specialPointsText)
                      ]}>
                        {task.points}
                      </Text>
                      <Text style={[styles.totalText, toggleEnabled && styles.totalTextDark]}>{task.total}</Text>
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
                  toggleEnabled && styles.linkedinDropdownContentDark,
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
                <View style={[styles.linkedinDropdownHeader, toggleEnabled && styles.linkedinDropdownHeaderDark]}>
                  <Text style={[styles.linkedinDropdownHeaderText, toggleEnabled && styles.linkedinDropdownHeaderTextDark]}>Activity</Text>
                  <View style={styles.linkedinDropdownHeaderRight}>
                    <Text style={[styles.linkedinDropdownHeaderText, toggleEnabled && styles.linkedinDropdownHeaderTextDark]}>DailyGoal points total</Text>

                  </View>
                </View>

                {linkedinTasks.map((task) => (
                  <View key={task.id} style={[styles.linkedinTaskItem, toggleEnabled && styles.linkedinTaskItemDark]}>
                    <Text style={[styles.linkedinTaskItemTitle, toggleEnabled && styles.linkedinTaskItemTitleDark]}>{task.title}</Text>
                    <View style={[styles.linkedinTaskItemRight, toggleEnabled && styles.linkedinTaskItemRightDark]}>
                      <Text style={[styles.linkedinPointsText, toggleEnabled && styles.linkedinPointsTextDark]}>{task.dailyGoal}</Text>
                      <Text style={[styles.linkedinPointsText, toggleEnabled && styles.linkedinPointsTextDark]}>{task.points}</Text>
                      <Text style={[styles.linkedinPointsText, toggleEnabled && styles.linkedinPointsTextDark]}>{task.total}</Text>
                      <Text style={[styles.linkedinPointsText, toggleEnabled && styles.linkedinPointsTextDark]}>{task.extra}</Text>
                      <Text style={[styles.linkedinPointsText, toggleEnabled && styles.linkedinPointsTextDark]}>{task.extra2}</Text>
                    </View>
                  </View>
                ))}

                {/* LinkedIn Completed All Section */}
                <View style={[styles.linkedinCompletedAllSection, toggleEnabled && styles.linkedinCompletedAllSectionDark]}>
                  <Text style={[styles.linkedinCompletedAllText, toggleEnabled && styles.linkedinCompletedAllTextDark]}>Completed All?</Text>
                  <View style={styles.linkedinYesNoButtons}>
                    <TouchableOpacity style={[styles.linkedinNoButton, toggleEnabled && styles.linkedinNoButtonDark]}>
                      <Text style={[styles.linkedinNoButtonText, toggleEnabled && styles.linkedinNoButtonTextDark]}>No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.linkedinYesButton, toggleEnabled && styles.linkedinYesButtonDark]}>
                      <Text style={[styles.linkedinYesButtonText, toggleEnabled && styles.linkedinYesButtonTextDark]}>Yes</Text>
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
                  toggleEnabled && styles.dailyMustDropdownContentDark,
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
                <View style={[styles.dailyMustDropdownHeader, toggleEnabled && styles.dailyMustDropdownHeaderDark]}>
                  <Text style={[styles.dailyMustDropdownHeaderText, toggleEnabled && styles.dailyMustDropdownHeaderTextDark]}>Tasks</Text>
                  <View style={styles.dailyMustDropdownHeaderRight}>
                    <Text style={[styles.dailyMustDropdownHeaderText, toggleEnabled && styles.dailyMustDropdownHeaderTextDark]}>Points</Text>
                    <Text style={[styles.dailyMustDropdownHeaderText, toggleEnabled && styles.dailyMustDropdownHeaderTextDark]}>Total</Text>
                  </View>
                </View>

                {dailyMustTasks.map((task, index) => (
                  <View key={task.id} style={[styles.dailyMustTaskItem, toggleEnabled && styles.dailyMustTaskItemDark]}>
                    <Text style={[styles.dailyMustTaskItemTitle, toggleEnabled && styles.dailyMustTaskItemTitleDark]}>{task.title}</Text>
                    <View style={[styles.dailyMustTaskItemRight, toggleEnabled && styles.dailyMustTaskItemRightDark]}>
                      <Text style={[styles.dailyMustPointsText, toggleEnabled && styles.dailyMustPointsTextDark]}>
                        {task.points}
                      </Text>
                      <Text style={[styles.dailyMustTotalText, toggleEnabled && styles.dailyMustTotalTextDark]}>{task.total}</Text>
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
                  toggleEnabled && styles.qualifiedBuyerDropdownContentDark,
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
                <View style={[styles.qualifiedBuyerDropdownHeader, toggleEnabled && styles.qualifiedBuyerDropdownHeaderDark]}>
                  <Text style={[styles.qualifiedBuyerDropdownHeaderText, toggleEnabled && styles.qualifiedBuyerDropdownHeaderTextDark]}>Tasks</Text>
                  <View style={styles.qualifiedBuyerDropdownHeaderRight}>
                    <Text style={[styles.qualifiedBuyerDropdownHeaderText, toggleEnabled && styles.qualifiedBuyerDropdownHeaderTextDark]}>Points</Text>
                    <Text style={[styles.qualifiedBuyerDropdownHeaderText, toggleEnabled && styles.qualifiedBuyerDropdownHeaderTextDark]}>Total</Text>
                  </View>
                </View>

                {qualifiedBuyerTasks.map((task, index) => (
                  <View key={task.id} style={[styles.qualifiedBuyerTaskItem, toggleEnabled && styles.qualifiedBuyerTaskItemDark]}>
                    <Text style={[styles.qualifiedBuyerTaskItemTitle, toggleEnabled && styles.qualifiedBuyerTaskItemTitleDark]}>{task.title}</Text>
                    <View style={[styles.qualifiedBuyerTaskItemRight, toggleEnabled && styles.qualifiedBuyerTaskItemRightDark]}>
                      <Text style={[styles.qualifiedBuyerPointsText, toggleEnabled && styles.qualifiedBuyerPointsTextDark]}>
                        {task.points}
                      </Text>
                      <Text style={[styles.qualifiedBuyerTotalText, toggleEnabled && styles.qualifiedBuyerTotalTextDark]}>{task.total}</Text>
                    </View>
                  </View>
                ))}
              </Animated.View>
            )}

            {/* Daily Calls Grid Dropdown */}
            {item.id === 5 && (
              <Animated.View
                style={[
                  styles.dailyCallsDropdownContent,
                  toggleEnabled && styles.dailyCallsDropdownContentDark,
                  {
                    height: dailyCallsSlideAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 666],
                    }),
                    opacity: dailyCallsSlideAnimation,
                    marginBottom: dailyCallsSlideAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 17],
                    }),
                  }
                ]}
              >
                {/* Daily Calls Grid */}
                <View style={styles.dailyCallsGrid}>
                  {dailyCallsTasks.map((call) => (
                    <TouchableOpacity
                      key={call.id}
                      style={[
                        styles.dailyCallsGridItem,
                        toggleEnabled && styles.dailyCallsGridItemDark,
                        call.status === 'completed' && styles.dailyCallsCompleted,
                        call.status === 'pending' && styles.dailyCallsPending,
                        call.status === 'crossed' && styles.dailyCallsCrossed,
                        call.number === 1 && styles.dailyCallsFirstItem,
                        call.number === 5 && styles.dailyCallsFiveItem,
                        call.number === 51 && styles.dailyCalls51Item,
                        call.number === 55 && styles.dailyCalls55Item,



                      ]}
                    >
                      {call.status === 'completed' && (
                        <View style={[styles.dailyCallsCompletedCircle, toggleEnabled && styles.dailyCallsCompletedCircleDark]} />
                      )}
                      {call.status === 'pending' && (
                        <View style={[styles.dailyCallsPendingCircle, toggleEnabled && styles.dailyCallsPendingCircleDark]} />
                      )}
                      {call.status === 'crossed' && (
                        <View style={[styles.dailyCallsCrossedLine, toggleEnabled && styles.dailyCallsCrossedLineDark]} />
                      )}
                      <Text style={[
                        styles.dailyCallsGridText,
                        toggleEnabled && styles.dailyCallsGridTextDark,
                        call.status === 'completed' && styles.dailyCallsCompletedText,
                        call.status === 'completed' && toggleEnabled && styles.dailyCallsCompletedTextDark,
                        call.status === 'pending' && styles.dailyCallsPendingText,
                        call.status === 'pending' && toggleEnabled && styles.dailyCallsPendingTextDark,
                        call.status === 'crossed' && styles.dailyCallsCrossedText,
                        call.status === 'crossed' && toggleEnabled && styles.dailyCallsCrossedTextDark,
                      ]}>
                        {call.number}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
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
  containerDark: {
    flex: 1,
    backgroundColor: '#000000',
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
  appNameTextDark: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  appNameIcon: {
    width: 32,
    height: 32,
  },
  appNameIconDark: {
    width: 32,
    height: 32,
    tintColor: '#FFFFFF',
  },
  metricButtonsContainer: {
    paddingHorizontal: 22,
    marginTop: 16,
  },
  metricButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  metricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D11A38',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginHorizontal: 4,
    alignSelf: 'flex-start',
  },
  metricButtonIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  metricButtonIconText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  callMadeIcon: {
    backgroundColor: '#280E0E',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  prospectIcon: {
    backgroundColor: '#280E0E',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  appointmentIcon: {
    backgroundColor: '#FFFFFF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  crossLine: {
    position: 'absolute',
    width: 19,
    height: 2,
    backgroundColor: '#FFFFFF90',
    transform: [{ rotate: '125deg' }],
  },
  metricButtonText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '500',
    numberOfLines: 1,
  },
  totalCallsButton: {
    backgroundColor: '#D11A38',
    borderRadius: 8,
    paddingHorizontal: 40,
    marginHorizontal: 50,
    paddingVertical: 12,
    alignItems: 'center',
  },
  totalCallsButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  toggleContainer: {
    padding: 4,
  },
  toggle: {
    width: 50,
    height: 30,
    backgroundColor: '#262A36',
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleEnabled: {
    backgroundColor: '#FFFFFF',
  },
  toggleThumb: {
    width: 26,
    height: 26,
    backgroundColor: '#5F626B',
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
    backgroundColor: '#D11A38',
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
  dateTextDark: {
    fontSize: 16,
    color: '#CCCCCC',
    fontWeight: '500',
  },
  timeText: {
    fontSize: 16,
    color: '#898989',
    fontWeight: '500',
  },
  timeTextDark: {
    fontSize: 16,
    color: '#CCCCCC',
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
  taskCardDark: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#BB1A34',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF',
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
  taskTitleDark: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    flex: 1,
  },
  chevronIcon: {
    width: 15,
    height: 15,
    tintColor: '#666666',
  },
  chevronIconDark: {
    width: 15,
    height: 15,
    tintColor: '#FFFFFF',
  },
  expandedTaskCard: {
    borderColor: '#D11A38',
  },
  expandedTaskCardDark: {
    borderColor: '#FFFFFF',
  },
  dropdownContent: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D11A38',
    borderTopWidth: 1,
    backgroundColor: '#FFECEC',
  },
  dropdownContentDark: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderTopWidth: 1,
    backgroundColor: '#280E0E',
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
  dropdownHeaderTextDark: {
    fontSize: 14,
    color: '#FFFFFF',
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
  taskItemDark: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0,
    backgroundColor: '#280E0E',
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
  taskItemTitleDark: {
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
    marginRight: 16,
    fontWeight: '500',
    backgroundColor: '#280E0E',

  },
  taskItemRight: {
    flexDirection: 'row',
    minWidth: 100,
    borderRadius: 8,
    backgroundColor: '#FFE5E9',
    paddingVertical: 10,
  },
  taskItemRightDark: {
    flexDirection: 'row',
    minWidth: 100,
    borderRadius: 8,
    backgroundColor: '#D11A38',
    paddingVertical: 10,
  },
  pointsText: {

    color: '#D11A38',
    fontSize: 12,
    textAlign: 'center',
    flex: 1,
  },
  pointsTextDark: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    flex: 1,
  },
  specialPointsText: {
    color: '#D11A38',
    fontWeight: '600',
    right: '-27%',
  },
  specialPointsTextDark: {
    color: '#FFFFFF',
    fontWeight: '600',
    right: '-27%',
  },
  totalText: {
    fontSize: 12,
    color: '#D11A38',
    textAlign: 'center',
    flex: 1,
  },
  totalTextDark: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
  },

  // LinkedIn-specific styles
  linkedinDropdownContent: {


    marginTop: -1,
  },
  linkedinDropdownContentDark: {
    marginTop: -1,
    backgroundColor: '#280E0E',
    borderColor: '#FFFFFF',
  },
  linkedinDropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFECEC',
    borderTopWidth: 1,
    borderColor: '#D11A38',

    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  linkedinDropdownHeaderDark: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#280E0E',
    borderTopWidth: 1,
    borderColor: '#FFFFFF',
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
  linkedinDropdownHeaderTextDark: {
    fontSize: 14,
    color: '#FFFFFF',
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
  linkedinTaskItemDark: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderBottomWidth: 0,
    backgroundColor: '#280E0E',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#FFFFFF',
  },
  linkedinTaskItemTitle: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
    marginRight: 16,
    fontWeight: '500',
  },
  linkedinTaskItemTitleDark: {
    fontSize: 14,
    color: '#FFFFFF',
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
  linkedinTaskItemRightDark: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minWidth: 150,
    borderRadius: 8,
    backgroundColor: '#D11A38',
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
  linkedinPointsTextDark: {
    color: '#FFFFFF',
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
  linkedinCompletedAllSectionDark: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#280E0E',
    paddingBottom: 15,
    paddingTop: 6,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderColor: '#FFFFFF',
  },
  linkedinCompletedAllText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  linkedinCompletedAllTextDark: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  linkedinYesNoButtons: {
    flexDirection: 'row',
  },
  linkedinNoButton: {
    backgroundColor: '#FFE5E9',
    paddingHorizontal: 27,
    paddingVertical: 10,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
  },
  linkedinNoButtonDark: {
    backgroundColor: '#D11A38',
    paddingHorizontal: 27,
    paddingVertical: 10,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
  },
  linkedinNoButtonText: {
    fontSize: 18,
    color: '#D11A38',
    fontWeight: '500',
  },
  linkedinNoButtonTextDark: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  linkedinYesButton: {
    backgroundColor: '#FFE5E9',
    paddingHorizontal: 26,
    paddingVertical: 10,
    marginHorizontal: -4,

    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
  },
  linkedinYesButtonDark: {
    backgroundColor: '#D11A38',
    paddingHorizontal: 24,
    marginHorizontal: -4,
    paddingVertical: 10,
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
  },
  linkedinYesButtonText: {
    fontSize: 18,
    color: '#D11A38',
    fontWeight: '500',
  },
  linkedinYesButtonTextDark: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },

  // Daily Must-specific styles
  dailyMustDropdownContent: {
    borderRadius: 12,
    borderColor: '#D11A38',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: '#FFECEC',
  },
  dailyMustDropdownContentDark: {
    borderRadius: 12,
    borderColor: '#FFFFFF',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: '#280E0E',
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
  dailyMustDropdownHeaderDark: {
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
  dailyMustDropdownHeaderTextDark: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  dailyMustDropdownHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 90,
    justifyContent: 'space-between',
  },
  dailyMustTaskItem: {
    flexDirection: 'row',
    borderRadius: 16,
    backgroundColor: '#FFECEC',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0,
  },
  dailyMustTaskItemDark: {
    flexDirection: 'row',
    borderRadius: 16,
    backgroundColor: '#280E0E',
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
  dailyMustTaskItemTitleDark: {
    fontSize: 14,
    color: '#FFFFFF',
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
  dailyMustTaskItemRightDark: {
    flexDirection: 'row',
    minWidth: 100,
    borderRadius: 8,
    backgroundColor: '#D11A38',
    paddingVertical: 10,
  },
  dailyMustPointsText: {
    color: '#D11A38',
    fontSize: 12,
    textAlign: 'center',
    flex: 1,
  },
  dailyMustPointsTextDark: {
    color: '#FFFFFF',
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
  dailyMustTotalTextDark: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
  },

  // Qualified Buyer-specific styles
  qualifiedBuyerDropdownContent: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D11A38',
    borderTopWidth: 1,
    backgroundColor: '#FFECEC',
  },
  qualifiedBuyerDropdownContentDark: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderTopWidth: 1,
    backgroundColor: '#280E0E',
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
  qualifiedBuyerDropdownHeaderDark: {
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
  qualifiedBuyerDropdownHeaderTextDark: {
    fontSize: 14,
    color: '#FFFFFF',
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
    borderRadius: 16,
    borderBottomWidth: 0,
    backgroundColor: '#FFECEC',
  },
  qualifiedBuyerTaskItemDark: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderBottomWidth: 0,
    backgroundColor: '#280E0E',
  },
  qualifiedBuyerTaskItemTitle: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
    marginRight: 16,
    fontWeight: '500',
  },
  qualifiedBuyerTaskItemTitleDark: {
    fontSize: 14,
    color: '#FFFFFF',
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
  qualifiedBuyerTaskItemRightDark: {
    flexDirection: 'row',
    minWidth: 100,
    borderRadius: 8,
    backgroundColor: '#D11A38',
    paddingVertical: 10,
  },
  qualifiedBuyerPointsText: {
    color: '#D11A38',
    fontSize: 12,
    textAlign: 'center',
    flex: 1,
  },
  qualifiedBuyerPointsTextDark: {
    color: '#FFFFFF',
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
  qualifiedBuyerTotalTextDark: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
  },

  // Daily Calls Grid-specific styles
  dailyCallsDropdownContent: {
    padding: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D11A38',
    backgroundColor: '#FFECEC',
    zIndex: 10,
  },
  dailyCallsDropdownContentDark: {
    padding: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#2A1A1A',
  },
  dailyCallsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dailyCallsGridItem: {
    width: '20%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#D11A38',
    backgroundColor: '#FFFFFF',
  },
  dailyCallsGridItemDark: {
    width: '20%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#280E0E',
  },
  dailyCallsFirstItem: {
    borderTopLeftRadius: 12,
  },
  dailyCallsFiveItem: {
    borderTopRightRadius: 12,
  },
  dailyCalls51Item: {
    borderBottomLeftRadius: 12
  },
  dailyCalls55Item: {
    borderBottomRightRadius: 12
  },
  dailyCallsGridText: {
    fontSize: 14,
    color: '#999999',
    fontWeight: '500',
  },
  dailyCallsGridTextDark: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  dailyCallsCompleted: {
    // No additional styling needed for completed items
  },
  dailyCallsCompletedText: {
    color: '#91505B',

    fontWeight: '600',
  },
  dailyCallsCompletedTextDark: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  dailyCallsCompletedCircle: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 150,
    backgroundColor: '#E49AA5',
    zIndex: -1,
  },
  dailyCallsCompletedCircleDark: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 150,
    backgroundColor: 'rgba(179, 179, 179, 0.5)',
    zIndex: -1,
  },
  dailyCallsPending: {
    // No additional styling needed for pending items
  },
  dailyCallsPendingText: {
    color: '#91505B',
    fontWeight: '600',
  },
  dailyCallsPendingTextDark: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  dailyCallsPendingCircle: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 150,
    borderWidth: 5,
    borderColor: '#FFBFC0',
    backgroundColor: 'transparent',
    zIndex: -1,
  },
  dailyCallsPendingCircleDark: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 150,
    borderWidth: 5,
    borderColor: 'rgba(179, 179, 179, 0.5)',
    zIndex: -1,
  },
  dailyCallsCrossed: {
    // No additional styling needed for crossed items
  },
  dailyCallsCrossedText: {
    color: '#00000080',
    textDecorationLine: 'line-through',
  },
  dailyCallsCrossedTextDark: {
    color: '#FFFFFF',
    textDecorationLine: 'line-through',
  },
  dailyCallsCrossedLine: {
    position: 'absolute',
    width: '140%',
    height: 2,
    backgroundColor: '#C9485D',
    transform: [{ rotate: '136deg' }],
    zIndex: 1,
  },
  dailyCallsCrossedLineDark: {
    position: 'absolute',
    width: '140%',
    height: 2,
    backgroundColor: 'rgba(179, 179, 179, 0.5)',
    transform: [{ rotate: '136deg' }],
    zIndex: 1,
  },
});