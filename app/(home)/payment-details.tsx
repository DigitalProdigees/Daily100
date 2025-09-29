import BackButtonWithText from '@/components/BackButtonWithText';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Image,
    Keyboard,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaymentDetailsScreen() {
  const [cardNumber, setCardNumber] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCardDetails, setSaveCardDetails] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  const handlePayAndConfirm = () => {
    console.log('Payment details:', { cardNumber, expireDate, cvv, saveCardDetails });
    // Navigate to payment success screen
    router.push('/payment-success');
  };

  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      // Handle backspace logic
      if (cardNumber.length > 0) {
        setCardNumber(cardNumber.slice(0, -1));
      } else if (expireDate.length > 0) {
        setExpireDate(expireDate.slice(0, -1));
      } else if (cvv.length > 0) {
        setCvv(cvv.slice(0, -1));
      }
    } else {
      // Handle number input
      if (cardNumber.length < 19) { // 16 digits + 3 hyphens
        if (cardNumber.length === 4 || cardNumber.length === 9 || cardNumber.length === 14) {
          setCardNumber(cardNumber + '-' + key);
        } else {
          setCardNumber(cardNumber + key);
        }
      } else if (expireDate.length < 5) { // MM/YY format
        if (expireDate.length === 2) {
          setExpireDate(expireDate + '/' + key);
        } else {
          setExpireDate(expireDate + key);
        }
      } else if (cvv.length < 3) {
        setCvv(cvv + key);
      }
    }
  };

  
  

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButtonWithText />
        <Text style={styles.title}>Enter Payment Details</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Payment Form */}
          <View style={styles.formContainer}>
            {/* Card Number */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Card Number</Text>
              <TextInput
                style={styles.input}
                placeholder="1234-5678-9101-1121"
                placeholderTextColor="#999999"
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
                maxLength={19}
              />
            </View>

            {/* Expire Date and CVV Row */}
            <View style={styles.rowContainer}>
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={styles.label}>Expire Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="12/34"
                  placeholderTextColor="#999999"
                  value={expireDate}
                  onChangeText={setExpireDate}
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>

              <View style={[styles.inputContainer, styles.halfWidth]}>
                <View style={styles.cvvLabelContainer}>
                  <Text style={styles.label}>CVV</Text>
                  <TouchableOpacity style={styles.questionButton}>
                    <Image
                      source={require('@/assets/images/question.png')}
                      style={styles.questionIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="123"
                  placeholderTextColor="#999999"
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="numeric"
                  maxLength={3}
                />
              </View>
            </View>

            {/* Save Card Details */}
            <TouchableOpacity 
              style={styles.checkboxContainer}
              onPress={() => setSaveCardDetails(!saveCardDetails)}
            >
              <View style={[styles.checkbox, saveCardDetails && styles.checkedBox]}>
                {saveCardDetails && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={styles.checkboxText}>Save card details</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>

      {/* Bottom Section - Total and Pay Button */}
      <View style={[
        styles.bottomSection, 
        { marginBottom: keyboardHeight },
        keyboardHeight > 0 && styles.bottomSectionKeyboardOpen
      ]}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>$26</Text>
        </View>
        
        <TouchableOpacity style={[
          styles.payButton,
          keyboardHeight > 0 && styles.payButtonKeyboardOpen
        ]} onPress={handlePayAndConfirm}>
          <Text style={styles.payButtonText}>Pay & Confirm</Text>
        </TouchableOpacity>
      </View>

      {/* Custom Keypad */}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D11A38',
    textAlign: 'center',
    marginTop: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formContainer: {
    paddingTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: '#595959',
    marginBottom: 8,
    fontWeight: '500',
    height: 24, // Fixed height to match CVV label container
    lineHeight: 24,
  },
  cvvLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    height: 24, // Fixed height to match other labels
  },
  questionButton: {
    marginLeft: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    top:-4
  },
  questionIcon: {
    width: 20,
    height: 20,
    tintColor: '#595959',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000000',
    backgroundColor: 'white',
    
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#D11A38',
    borderColor: '#D11A38',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxText: {
    fontSize: 16,
    color: '#333333',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderTopColor: '#E0E0E0',},
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 16,
    color: '#595959',
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#595959',
  },
  payButton: {
    backgroundColor: '#D11A38',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Keyboard-specific styles
  bottomSectionKeyboardOpen: {
    top:30,
    paddingVertical: 6,
    
  },
  payButtonKeyboardOpen: {
    paddingHorizontal: 18,
  },
  keypad: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  keypadKey: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '30%',
    aspectRatio: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  keypadKeyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  keypadKeySubtext: {
    fontSize: 10,
    color: '#999999',
    marginTop: 2,
  },
  backspaceIcon: {
    width: 20,
    height: 20,
    tintColor: '#333333',
  },
});