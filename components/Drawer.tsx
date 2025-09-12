import { router } from 'expo-router';
import React from 'react';
import { Animated, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface DrawerProps {
  visible: boolean;
  onClose: () => void;
}

const { width: screenWidth } = Dimensions.get('window');

export default function Drawer({ visible, onClose }: DrawerProps) {
  const translateX = React.useRef(new Animated.Value(-screenWidth)).current;
  const [shouldRender, setShouldRender] = React.useState(false);

  React.useEffect(() => {
    if (visible) {
      setShouldRender(true);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: -screenWidth,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShouldRender(false);
      });
    }
  }, [visible, translateX]);

  const menuItems = [
    { id: 1, title: 'My Daily 100', icon: 'globe' },
    { id: 2, title: 'My Team', icon: 'team' },
    { id: 3, title: 'Journal', icon: 'journal' },
    { id: 4, title: 'Library', icon: 'library' },
    { id: 5, title: 'Notifications', icon: 'bell' },
    { id: 6, title: 'Settings', icon: 'setting1' },
    { id: 7, title: 'How to use app', icon: 'camera' },
    { id: 8, title: 'Terms of services', icon: 'terms' },
    { id: 9, title: 'Privacy Policy', icon: 'privacy' },
    { id: 10, title: 'Contact Us / Request Coach', icon: 'phone' },
    { id: 11, title: 'Referral to friend', icon: 'user' },
    { id: 12, title: 'My Daily 100', icon: 'daily', isHighlighted: true },
  ];

  const handleMenuPress = (title: string) => {
    onClose();
    // Add navigation logic here based on menu item
    if (title === 'Settings') {
      router.push('/(home)/settings');
    } else if (title === 'Contact Us / Request Coach') {
      router.push('/(home)/contact');
    } else if (title === 'Journal') {
      router.push('/(home)/journal');
    } else {
        console.log(`Navigate to: ${title}`);
        }
  };

  const handleLogout = () => {
    onClose();
    // Add logout logic here
    console.log('Logout');
  };

  const getIconSource = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      'globe': require('@/assets/images/globe.png'),
      'team': require('@/assets/images/team.png'),
      'journal': require('@/assets/images/journal.png'),
      'library': require('@/assets/images/library.png'),
      'setting1': require('@/assets/images/setting1.png'),
      'bell': require('@/assets/images/bell.png'),
      'camera': require('@/assets/images/camera.png'),
      'terms': require('@/assets/images/terms.png'),
      'privacy': require('@/assets/images/privacy.png'),
      'phone': require('@/assets/images/phone.png'),
      'user': require('@/assets/images/profile1.png'),
      'daily': require('@/assets/images/daily.png'),
    };
    return iconMap[iconName] || require('@/assets/images/bell.png');
  };

  if (!shouldRender) return null;

  return (
    <>
      {/* Backdrop */}
      <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
      
      {/* Drawer */}
      <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
        <View style={styles.drawerContent}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Image
              source={require('@/assets/images/ellipse.png')}
              style={styles.profilePicture}
              resizeMode="cover"
            />
            <Text style={styles.profileName}>Mary Linton</Text>
            <TouchableOpacity onPress={() => handleMenuPress('Edit Profile')}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <ScrollView 
            style={styles.menuList}
            contentContainerStyle={styles.menuListContent}
            showsVerticalScrollIndicator={false}
          >
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleMenuPress(item.title)}
              >
                <View style={styles.menuItemContent}>
                  <Image
                    source={getIconSource(item.icon)}
                    style={[
                      styles.menuIcon,
                      item.isHighlighted && styles.highlightedMenuIcon
                    ]}
                    resizeMode="contain"
                  />
                  <Text style={[
                    styles.menuText,
                    item.isHighlighted && styles.highlightedMenuText
                  ]}>
                    {item.title}
                  </Text>
                </View>
                <View style={[
                  styles.underline,
                  item.isHighlighted && styles.highlightedUnderline
                ]} />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>LogOut</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: screenWidth * 0.8,
    backgroundColor: 'white',
    zIndex: 1001,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  drawerContent: {
    flex: 1,
    paddingTop:40,
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePicture: {
    width: 200,
    height: 200,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D11A38',
    marginBottom: 8,
    marginTop:-50
  },
  editProfileText: {
    fontSize: 16,
    color: '#666666',
  },
  menuList: {
    flex: 1,
    marginBottom: 20,
  },
  menuListContent: {
    paddingBottom: 10,
  },
  menuItem: {
    paddingVertical: 9,
    paddingHorizontal: 12,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
    tintColor: '#666666',
  },
  highlightedMenuIcon: {
    tintColor: '#D11A38',
  },
  menuText: {
    fontSize: 14,
    color: '#333333',
  },
  highlightedMenuText: {
    color: '#D11A38',
    fontWeight: 'bold',
  },
  underline: {
    height: 0.5,
    backgroundColor: '#E2E2E2',
    marginTop: 8,
    marginRight: 12,
  },
  highlightedUnderline: {
    backgroundColor: '#D11A38',
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 40,
    alignSelf:'center',
width:150  },
  logoutText: {
    fontSize: 16,
    color: '#595959',
    fontWeight: '500',
  },
});