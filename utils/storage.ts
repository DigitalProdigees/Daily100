import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageService {
  private static readonly ONBOARDING_KEY = 'has_completed_onboarding';
  private static readonly USER_DATA_KEY = 'user_data';
  private static readonly TEMP_SIGNUP_DATA_KEY = 'temp_signup_data';
  private static readonly PROFILE_SETUP_KEY = 'has_completed_profile_setup';

  // Onboarding state management
  static async hasCompletedOnboarding(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(this.ONBOARDING_KEY);
      console.log('Storage - Reading onboarding state:', value);
      const result = value === 'true';
      console.log('Storage - Has completed onboarding:', result);
      return result;
    } catch (error) {
      console.error('Error reading onboarding state:', error);
      return false;
    }
  }

  static async setOnboardingCompleted(): Promise<void> {
    try {
      await AsyncStorage.setItem(this.ONBOARDING_KEY, 'true');
      console.log('Storage - Onboarding completion saved successfully');
    } catch (error) {
      console.error('Error setting onboarding state:', error);
    }
  }

  // User data management
  static async saveUserData(userData: any): Promise<void> {
    try {
      await AsyncStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }

  static async getUserData(): Promise<any | null> {
    try {
      const value = await AsyncStorage.getItem(this.USER_DATA_KEY);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error reading user data:', error);
      return null;
    }
  }

  static async clearUserData(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.USER_DATA_KEY);
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  }

  // Temporary signup data management
  static async setTempSignupData(signupData: { email: string; password: string }): Promise<void> {
    try {
      await AsyncStorage.setItem(this.TEMP_SIGNUP_DATA_KEY, JSON.stringify(signupData));
      console.log('Storage - Temporary signup data saved successfully');
    } catch (error) {
      console.error('Error saving temporary signup data:', error);
    }
  }

  static async getTempSignupData(): Promise<{ email: string; password: string } | null> {
    try {
      const value = await AsyncStorage.getItem(this.TEMP_SIGNUP_DATA_KEY);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error reading temporary signup data:', error);
      return null;
    }
  }

  static async clearTempSignupData(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.TEMP_SIGNUP_DATA_KEY);
      console.log('Storage - Temporary signup data cleared successfully');
    } catch (error) {
      console.error('Error clearing temporary signup data:', error);
    }
  }

  // Profile setup state management
  static async hasCompletedProfileSetup(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(this.PROFILE_SETUP_KEY);
      console.log('Storage - Reading profile setup state:', value);
      const result = value === 'true';
      console.log('Storage - Has completed profile setup:', result);
      return result;
    } catch (error) {
      console.error('Error reading profile setup state:', error);
      return false;
    }
  }

  static async setProfileSetupCompleted(): Promise<void> {
    try {
      await AsyncStorage.setItem(this.PROFILE_SETUP_KEY, 'true');
      console.log('Storage - Profile setup completion saved successfully');
    } catch (error) {
      console.error('Error setting profile setup state:', error);
    }
  }

  static async clearProfileSetupState(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.PROFILE_SETUP_KEY);
      console.log('Storage - Profile setup state cleared successfully');
    } catch (error) {
      console.error('Error clearing profile setup state:', error);
    }
  }

  // Clear all app data (for logout)
  static async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([this.ONBOARDING_KEY, this.USER_DATA_KEY, this.TEMP_SIGNUP_DATA_KEY, this.PROFILE_SETUP_KEY]);
      console.log('Storage - All data cleared successfully');
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  }

  // Debug method to clear only profile setup state
  static async debugClearProfileSetup(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.PROFILE_SETUP_KEY);
      console.log('Storage - Profile setup state cleared for debugging');
    } catch (error) {
      console.error('Error clearing profile setup state:', error);
    }
  }

  // Debug method to get all storage keys
  static async debugGetAllKeys(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log('Storage - All keys:', keys);
      
      for (const key of keys || []) {
        const value = await AsyncStorage.getItem(key);
        console.log(`Storage - ${key}:`, value);
      }
    } catch (error) {
      console.error('Error getting all keys:', error);
    }
  }
}