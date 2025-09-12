import Drawer from '@/components/Drawer';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleMenuPress = () => {
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
          <Image
            source={require('@/assets/images/menu.png')}
            style={styles.menuIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bellButton}>
          <Image
            source={require('@/assets/images/bell.png')}
            style={styles.bellIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Your Goals Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Goals</Text>
          <TouchableOpacity style={styles.goalCard}>
            <Image
              source={require('@/assets/images/2.png')}
              style={styles.goalCardBackground}
              resizeMode="cover"
            />
            <View style={styles.goalCardOverlay}>
              <Text style={styles.goalCategory}>Wealth</Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBar}>
                    <View style={styles.progressFill} />
                  </View>
                  <Text style={styles.progressPercentage}>10%</Text>
                </View>
                <Text style={styles.progressLabel}>Goal Progress</Text>

              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Your Assessment Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Assessment</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.assessmentList}>
            <View style={styles.assessmentItem}>
              <View style={styles.assessmentContent}>
                <Text style={styles.assessmentName}>Assessment Name</Text>
                <Text style={styles.todoCount}>8 To-Do</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.viewText}>View</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.assessmentItem}>
              <Image
                source={require('@/assets/images/ellipse.png')}
                style={styles.assessmentImage}
                resizeMode='contain'
              />
              <View style={styles.assessmentContent}>
                <Text style={styles.assessmentName}>Assessment Name</Text>
                <Text style={styles.todoCount}>8 To-Do</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.viewText}>View</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.assessmentItem}>
              <Image
                source={require('@/assets/images/ellipse.png')}
                style={styles.assessmentImage}
                resizeMode="cover"
              />
              <View style={styles.assessmentContent}>
                <Text style={styles.assessmentName}>Assessment Name</Text>
                <Text style={styles.todoCount}>8 To-Do</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.viewText}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* My Completed 100 Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Completed 100</Text>
            <TouchableOpacity onPress={() => router.push('/(home)/my-completed-100')}>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.completedList}>
            <View style={styles.completedItem}>
              <Image
                source={require('@/assets/images/ellipse.png')}
                style={styles.completedImage}
                resizeMode="cover"
              />
              <View style={styles.completedContent}>
                <Text style={styles.completedName}>My Completed 100</Text>
                <Text style={styles.finishedText}>Finished</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.downloadText}>Download</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.completedItem}>
              <Image
                source={require('@/assets/images/ellipse.png')}
                style={styles.completedImage}
                resizeMode="cover"
              />
              <View style={styles.completedContent}>
                <Text style={styles.completedName}>My Completed 100</Text>
                <Text style={styles.finishedText}>Finished</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.downloadText}>Download</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.completedItem}>
              <Image
                source={require('@/assets/images/ellipse.png')}
                style={styles.completedImage}
                resizeMode="cover"
              />
              <View style={styles.completedContent}>
                <Text style={styles.completedName}>My Completed 100</Text>
                <Text style={styles.finishedText}>Finished</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.downloadText}>Download</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.completedItem}>
              <Image
                source={require('@/assets/images/ellipse.png')}
                style={styles.completedImage}
                resizeMode="cover"
              />
              <View style={styles.completedContent}>
                <Text style={styles.completedName}>My Completed 100</Text>
                <Text style={styles.finishedText}>Finished</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.downloadText}>Download</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.completedItem}>
              <Image
                source={require('@/assets/images/ellipse.png')}
                style={styles.completedImage}
                resizeMode="cover"
              />
              <View style={styles.completedContent}>
                <Text style={styles.completedName}>My Completed 100</Text>
                <Text style={styles.finishedText}>Finished</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.downloadText}>Download</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.completedItem}>
              <Image
                source={require('@/assets/images/ellipse.png')}
                style={styles.completedImage}
                resizeMode="cover"
              />
              <View style={styles.completedContent}>
                <Text style={styles.completedName}>My Completed 100</Text>
                <Text style={styles.finishedText}>Finished</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.downloadText}>Download</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Drawer */}
      <Drawer visible={drawerVisible} onClose={handleCloseDrawer} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
marginHorizontal:4,   
 paddingVertical: 16,
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: '#333333',
  },
  bellButton: {
    padding: 8,
  },
  bellIcon: {
    width: 24,
    height: 24,
    tintColor: '#D11A38',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    marginHorizontal: 16,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#595959',
    fontWeight:600
  },
  viewAllText: {
    fontSize: 16,
    color: '#D11A38',
    fontWeight: 500,
  },
  goalCard: {
    height: 200,
    borderRadius: 36,
    overflow:'hidden'
  },
  goalCardBackground: {
    width: '100%',
    height: '110%',
  },
  goalCardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  goalCategory: {
    fontSize: 32,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 20,
  },
  progressContainer: {
    width: '100%',
  },
  progressLabel: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#FFB3BA',
    borderRadius: 4,
    marginRight: 12,
  },
  progressFill: {
    width: '10%',
    height: '100%',
    backgroundColor: '#D11A38',
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  assessmentList: {
    gap: 10
  },
  assessmentItem: {
    flexDirection: 'row',
  },
  assessmentImage: {
    width: 50,
    height: 50,
    borderRadius:35,
  marginLeft:-12
    
  },
  assessmentContent: {
    flex: 1,
  },
  assessmentName: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  todoCount: {
    fontSize: 14,
    color: '#D11A38',
  },
  viewText: {
    fontSize: 14,
    color: '#D11A38',
    fontWeight: '500',
  },
  completedList: {
  
  },
  completedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  completedImage: {
    width: 50,
    height: 50,
    marginLeft:-12
  },
  completedContent: {
    flex: 1,
  },
  completedName: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  finishedText: {
    fontSize: 14,
    color: '#D11A38',
    fontWeight: '500',
  },
  downloadText: {
    fontSize: 14,
    color: '#D11A38',
    fontWeight: '500',
  },
});