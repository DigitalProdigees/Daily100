import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => router.replace('/(auth)/login')
        }
      ]
    );
  };

  const menuItems = [
    { icon: 'person.circle', title: 'Edit Profile', onPress: () => {} },
    { icon: 'bell', title: 'Notifications', onPress: () => {} },
    { icon: 'lock', title: 'Privacy & Security', onPress: () => {} },
    { icon: 'questionmark.circle', title: 'Help & Support', onPress: () => {} },
    { icon: 'info.circle', title: 'About', onPress: () => {} },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Image 
              source={require('@/assets/images/backB.png')} 
              style={styles.backButtonImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <ThemedText type="title" style={styles.title}>Profile</ThemedText>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.profileSection}>
          <View style={[styles.avatar, { backgroundColor: Colors[colorScheme ?? 'light'].tint + '20' }]}>
            <IconSymbol name="person.fill" size={40} color={Colors[colorScheme ?? 'light'].tint} />
          </View>
          <ThemedText type="subtitle" style={styles.name}>John Doe</ThemedText>
          <ThemedText type="default" style={styles.email}>john.doe@example.com</ThemedText>
        </View>

        <View style={styles.statsContainer}>
          <View style={[styles.statItem, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
            <ThemedText type="title" style={styles.statNumber}>45</ThemedText>
            <ThemedText type="default" style={styles.statLabel}>Days Streak</ThemedText>
          </View>
          <View style={[styles.statItem, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
            <ThemedText type="title" style={styles.statNumber}>12</ThemedText>
            <ThemedText type="default" style={styles.statLabel}>Habits</ThemedText>
          </View>
          <View style={[styles.statItem, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
            <ThemedText type="title" style={styles.statNumber}>89%</ThemedText>
            <ThemedText type="default" style={styles.statLabel}>Success Rate</ThemedText>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { borderBottomColor: Colors[colorScheme ?? 'light'].border }]}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <IconSymbol name={item.icon} size={20} color={Colors[colorScheme ?? 'light'].text} />
                <ThemedText type="default" style={styles.menuItemText}>{item.title}</ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={16} color={Colors[colorScheme ?? 'light'].text + '60'} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint + '20' }]}
          onPress={handleLogout}
        >
          <IconSymbol name="power" size={20} color={Colors[colorScheme ?? 'light'].tint} />
          <ThemedText type="default" style={[styles.logoutText, { color: Colors[colorScheme ?? 'light'].tint }]}>
            Logout
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  backButtonImage: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 12,
  },
  statItem: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});