import BackButtonWithText from '@/components/BackButtonWithText';
import CenteredTitle from '@/components/CenteredTitle';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const settingsOptions = [
    {
      id: 1,
      title: 'Subscriptions',
      icon: require('@/assets/images/wallet.png'),
    },
    {
      id: 2,
      title: 'Notification Settings',
      icon: require('@/assets/images/bell.png'),
    },
    {
      id: 3,
      title: 'Change Password',
      icon: require('@/assets/images/privacy.png'),
    },
  ];

  const handleOptionPress = (title: string) => {
    if (title === 'Change Password') {
      router.push('/(home)/change-password');
    } else {
      console.log(`Navigate to: ${title}`);
    }
  };

  const handleEditProfile = () => {
    console.log('Edit Profile');
    // Add edit profile logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButtonWithText />
<View style={{marginTop:30}}/><CenteredTitle title="Settings" />
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('@/assets/images/ellipse.png')}
          style={styles.profilePicture}
          resizeMode="cover"
        />
        <TouchableOpacity onPress={handleEditProfile}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Settings Options */}
      <View style={styles.optionsContainer}>
        {settingsOptions.map((option, index) => (
          <View key={option.id}>
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => handleOptionPress(option.title)}
            >
              <Image
                source={option.icon}
                style={styles.optionIcon}
                resizeMode="contain"
              />
                <Text style={styles.optionText}>{option.title}</Text>
                <Image
                  source={require('@/assets/images/chevron-right.png')}
                  style={styles.chevronIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            {index < settingsOptions.length - 0 && (
              <View style={styles.separator} />
            )}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 1,
  },
  profilePicture: {
    width: 190,
    height: 190,
    borderRadius: 50,
    marginBottom: 4,
  },
  editProfileText: {
    top:-50,
    fontSize: 16,
    color: '#666666',
  },
  optionsContainer: {
    paddingHorizontal: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
    position: 'relative',
  },
  optionIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
    tintColor: '#595959',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  chevronIcon: {
    width: 16,
    height: 16,
    position: 'absolute',
    tintColor:'#595959',
    right: 0,
  },
  separator: {
    height: 1,
    backgroundColor: '#E2E2E2',
  },
});