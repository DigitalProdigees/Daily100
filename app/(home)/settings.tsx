import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Image, ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
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

  const settingsSections = [
    {
      title: 'General',
      items: [
        { icon: 'bell', title: 'Notifications', type: 'toggle', value: true },
        { icon: 'moon', title: 'Dark Mode', type: 'toggle', value: colorScheme === 'dark' },
        { icon: 'globe', title: 'Language', type: 'arrow', value: 'English' },
      ]
    },
    {
      title: 'Privacy',
      items: [
        { icon: 'lock', title: 'Privacy Policy', type: 'arrow' },
        { icon: 'doc.text', title: 'Terms of Service', type: 'arrow' },
        { icon: 'trash', title: 'Delete Account', type: 'arrow', destructive: true },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: 'questionmark.circle', title: 'Help Center', type: 'arrow' },
        { icon: 'envelope', title: 'Contact Us', type: 'arrow' },
        { icon: 'star', title: 'Rate App', type: 'arrow' },
      ]
    }
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
          <ThemedText type="title" style={styles.title}>Settings</ThemedText>
          <View style={styles.placeholder} />
        </View>

        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>{section.title}</ThemedText>
            <View style={[styles.sectionContent, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.settingItem,
                    { 
                      borderBottomColor: Colors[colorScheme ?? 'light'].border,
                      borderBottomWidth: itemIndex < section.items.length - 1 ? 1 : 0
                    }
                  ]}
                  onPress={() => {
                    if (item.title === 'Delete Account') {
                      Alert.alert('Delete Account', 'This action cannot be undone. Are you sure?');
                    }
                  }}
                >
                  <View style={styles.settingItemLeft}>
                    <IconSymbol 
                      name={item.icon} 
                      size={20} 
                      color={item.destructive ? '#FF3B30' : Colors[colorScheme ?? 'light'].text} 
                    />
                    <ThemedText 
                      type="default" 
                      style={[
                        styles.settingItemText,
                        { color: item.destructive ? '#FF3B30' : undefined }
                      ]}
                    >
                      {item.title}
                    </ThemedText>
                  </View>
                  
                  <View style={styles.settingItemRight}>
                    {item.type === 'toggle' ? (
                      <Switch
                        value={item.value}
                        onValueChange={() => {}}
                        trackColor={{ false: '#767577', true: Colors[colorScheme ?? 'light'].tint }}
                        thumbColor={item.value ? '#fff' : '#f4f3f4'}
                      />
                    ) : item.type === 'arrow' ? (
                      <View style={styles.arrowContainer}>
                        {item.value && (
                          <ThemedText type="default" style={styles.settingValue}>
                            {item.value}
                          </ThemedText>
                        )}
                        <IconSymbol name="chevron.right" size={16} color={Colors[colorScheme ?? 'light'].text + '60'} />
                      </View>
                    ) : null}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

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
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.7,
  },
  sectionContent: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingItemText: {
    fontSize: 16,
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    fontSize: 14,
    opacity: 0.7,
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