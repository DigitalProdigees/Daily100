import BackButtonWithText from '@/components/BackButtonWithText';
import CenteredTitle from '@/components/CenteredTitle';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropdownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthContext } from '../../contexts/AuthContext';
import { getDisplayName } from '../../utils/nameUtils';

export default function ProfileInformationScreen() {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    fullName: '',
    country: '',
    city: '',
    address: '',
  });

  // Set the name from email when component mounts
  useEffect(() => {
    if (user && (!formData.fullName || formData.fullName === 'User')) {
      const extractedName = getDisplayName(user);
      setFormData(prev => ({ ...prev, fullName: extractedName }));
    }
  }, [user, formData.fullName]);

  // Dropdown states
  const [countryOpen, setCountryOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [countryValue, setCountryValue] = useState(null);
  const [cityValue, setCityValue] = useState(null);

  // Country options
  const countryItems = [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
    { label: 'Italy', value: 'it' },
    { label: 'Australia', value: 'au' },
    { label: 'Japan', value: 'jp' },
    { label: 'China', value: 'cn' },
    { label: 'India', value: 'in' },
    { label: 'Brazil', value: 'br' },
    { label: 'Mexico', value: 'mx' },
    { label: 'Argentina', value: 'ar' },
    { label: 'South Africa', value: 'za' },
  ];

  // City options (based on selected country)
  const getCityItems = (country: string) => {
    const cityMap: { [key: string]: any[] } = {
      'us': [
        { label: 'New York', value: 'new-york' },
        { label: 'Los Angeles', value: 'los-angeles' },
        { label: 'Chicago', value: 'chicago' },
        { label: 'Houston', value: 'houston' },
        { label: 'Phoenix', value: 'phoenix' },
        { label: 'Philadelphia', value: 'philadelphia' },
        { label: 'San Antonio', value: 'san-antonio' },
        { label: 'San Diego', value: 'san-diego' },
        { label: 'Dallas', value: 'dallas' },
        { label: 'San Jose', value: 'san-jose' },
      ],
      'ca': [
        { label: 'Toronto', value: 'toronto' },
        { label: 'Vancouver', value: 'vancouver' },
        { label: 'Montreal', value: 'montreal' },
        { label: 'Calgary', value: 'calgary' },
        { label: 'Ottawa', value: 'ottawa' },
        { label: 'Edmonton', value: 'edmonton' },
        { label: 'Winnipeg', value: 'winnipeg' },
        { label: 'Quebec City', value: 'quebec-city' },
        { label: 'Hamilton', value: 'hamilton' },
        { label: 'Kitchener', value: 'kitchener' },
      ],
      'uk': [
        { label: 'London', value: 'london' },
        { label: 'Birmingham', value: 'birmingham' },
        { label: 'Manchester', value: 'manchester' },
        { label: 'Glasgow', value: 'glasgow' },
        { label: 'Liverpool', value: 'liverpool' },
        { label: 'Leeds', value: 'leeds' },
        { label: 'Sheffield', value: 'sheffield' },
        { label: 'Edinburgh', value: 'edinburgh' },
        { label: 'Bristol', value: 'bristol' },
        { label: 'Newcastle', value: 'newcastle' },
      ],
    };
    return cityMap[country] || [];
  };

  const cityItems = getCityItems(countryValue || '');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCountryChange = (value: any) => {
    setCountryValue(value);
    setFormData(prev => ({ ...prev, country: value }));
    // Reset city when country changes
    setCityValue(null);
    setFormData(prev => ({ ...prev, city: '' }));
  };

  const handleCityChange = (value: any) => {
    setCityValue(value);
    setFormData(prev => ({ ...prev, city: value }));
  };

  const handleAddMotivations = () => {
    // Navigate to add motivation screen
    router.push('/(home)/add-motivation');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButtonWithText />
        <CenteredTitle title="Profile Information" />
      </View>

      {/* Profile Picture Section */}
      <View style={styles.profileSection}>
        <View style={styles.profilePictureContainer}>
          <Image 
            source={require('@/assets/images/profile.png')} 
            style={styles.profilePicture}
            resizeMode="contain"
          />
        </View>
      
      </View>

      {/* Form Fields */}
      <View style={styles.formContainer}>
        {/* Full Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={formData.fullName}
            onChangeText={(value) => handleInputChange('fullName', value)}
            placeholder="Enter your full name"
          />
        </View>

        {/* Country */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Country</Text>
          <DropdownPicker
            open={countryOpen}
            value={countryValue}
            items={countryItems}
            setOpen={setCountryOpen}
            setValue={setCountryValue}
            onSelectItem={(item) => handleCountryChange(item.value)}
            placeholder="Select your country"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={styles.dropdownText}
            placeholderStyle={styles.dropdownPlaceholder}
            arrowIconStyle={styles.dropdownArrow}
            tickIconStyle={styles.dropdownTick}
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>

        {/* City */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>City</Text>
          <DropdownPicker
            open={cityOpen}
            value={cityValue}
            items={cityItems}
            setOpen={setCityOpen}
            setValue={setCityValue}
            onSelectItem={(item) => handleCityChange(item.value)}
            placeholder="Select your city"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={styles.dropdownText}
            placeholderStyle={styles.dropdownPlaceholder}
            arrowIconStyle={styles.dropdownArrow}
            tickIconStyle={styles.dropdownTick}
            disabled={!countryValue}
            zIndex={2000}
            zIndexInverse={2000}
          />
        </View>

        {/* Address */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={formData.address}
            onChangeText={(value) => handleInputChange('address', value)}
            placeholder="Enter your address"
          />
        </View>
      </View>

      {/* Add Motivations Button */}
      <TouchableOpacity style={styles.addMotivationsButton} onPress={handleAddMotivations}>
        <Text style={styles.addMotivationsText}>Add Motivations</Text>
      </TouchableOpacity>
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
    paddingVertical: 30,
  },
  profilePictureContainer: {
  
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: 150,
    height: 150,
  },
  addPhotoButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D11A38',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -16,
  },
  addPhotoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#595959',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
  },
  inputWithIcon: {
    position: 'relative',
  },
  dropdownIcon: {
    position: 'absolute',
    right: 16,
    top: 12,
    fontSize: 12,
    color: '#C9C9C9',
  },
  // Dropdown styles
  dropdown: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 0,
    minHeight: 48,
  },
  dropdownContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 0,
    marginTop: 4,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333333',
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#999999',
  },
  dropdownArrow: {
    width: 16,
    height: 16,
    tintColor: '#999999',
  },
  dropdownTick: {
    width: 16,
    height: 16,
  },
  addMotivationsButton: {
    backgroundColor: '#D11A38',
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addMotivationsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});