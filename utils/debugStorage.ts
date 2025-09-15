import AsyncStorage from '@react-native-async-storage/async-storage';

export const DebugStorage = {
  // Debug function to manually set onboarding as completed
  async forceSetOnboardingCompleted(): Promise<void> {
    try {
      await AsyncStorage.setItem('has_completed_onboarding', 'true');
      console.log('DEBUG - Force set onboarding as completed');
    } catch (error) {
      console.error('DEBUG - Error force setting onboarding:', error);
    }
  },

  // Debug function to clear onboarding state
  async clearOnboardingState(): Promise<void> {
    try {
      await AsyncStorage.removeItem('has_completed_onboarding');
      console.log('DEBUG - Cleared onboarding state');
    } catch (error) {
      console.error('DEBUG - Error clearing onboarding:', error);
    }
  },

  // Debug function to check all AsyncStorage keys
  async getAllKeys(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log('DEBUG - All AsyncStorage keys:', keys);
      
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        console.log(`DEBUG - ${key}:`, value);
      }
    } catch (error) {
      console.error('DEBUG - Error getting all keys:', error);
    }
  }
};