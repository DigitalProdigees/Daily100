import BackButtonWithText from '@/components/BackButtonWithText';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AttachedFile {
  id: string;
  name: string;
  size: string;
}

export default function ContactFormScreen() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([
    { id: '1', name: 'File Name 1', size: '24 mb' },
    { id: '2', name: 'File Name 2', size: '15 mb' },
    { id: '3', name: 'File Name 3', size: '8 mb' },
    { id: '4', name: 'File Name 4', size: '8 mb' },
    { id: '5', name: 'File Name 5', size: '8 mb' },
    { id: '6', name: 'File Name 6', size: '8 mb' },
    { id: '7', name: 'File Name 7', size: '8 mb' },
    { id: '8', name: 'File Name 8', size: '8 mb' },
    { id: '9', name: 'File Name 9', size: '8 mb' },

  ]);

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setMessageError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    if (!message.trim()) {
      setMessageError('Message is required');
      isValid = false;
    }

    return isValid;
  };

  const showSuccessAnimation = () => {
    setShowSuccessOverlay(true);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowSuccessOverlay(false);
    });
  };

  const handleAttachFile = () => {
    // Handle file attachment logic here
    console.log('Attach file pressed');
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Handle form submission logic here
      setEmail('');
      setMessage('');
      setAttachedFiles([])
      console.log('Submit pressed', { email, message, attachedFiles });
      showSuccessAnimation();
    }
  };

  const handleRemoveFile = (fileId: string) => {
    setAttachedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButtonWithText />
        <Text style={styles.title}>Contact Us</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, emailError ? styles.inputError : null]}
            placeholder="example@example.com"
            placeholderTextColor="#999999"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError('');
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Message</Text>
          <TextInput
            style={[styles.input, styles.messageInput, messageError ? styles.inputError : null]}
            placeholder="Tell to us here..."
            placeholderTextColor="#999999"
            value={message}
            onChangeText={(text) => {
              setMessage(text);
              if (messageError) setMessageError('');
            }}
            multiline
            textAlignVertical="top"
          />
          {messageError ? <Text style={styles.errorText}>{messageError}</Text> : null}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.attachButton} onPress={handleAttachFile}>
            <Text style={styles.attachButtonText}>Attach file</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        {/* Attached Files Section */}
        {attachedFiles.length > 0 && (
          <View style={styles.filesContainer}>
            <ScrollView style={styles.filesScrollView} showsVerticalScrollIndicator={false}>
              {attachedFiles.map((file) => (
                <View key={file.id} style={styles.fileItem}>
                  <View style={styles.fileInfo}>
                    <Text style={styles.fileName}>{file.name}</Text>
                    <Text style={styles.fileSize}>{file.size}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleRemoveFile(file.id)}
                  >
                    <Image
                      source={require('@/assets/images/trash.png')}
                      style={styles.trashIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>

      {/* Full Screen Success Overlay */}
      {showSuccessOverlay && (
        <Animated.View style={[styles.fullScreenOverlay, { opacity: fadeAnim }]}>
          <View style={styles.successCircle}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
          <Text style={styles.successText}>Your Request Sent!</Text>
        </Animated.View>
      )}
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
    fontSize: 34,
    fontWeight: '600',
    color: '#D11A38',
    textAlign: 'center',
    marginTop: 16,
  },
  content: {
    flex: 1,
    marginTop:30,
    paddingHorizontal: 20,
 },
  inputContainer: {
    marginBottom: 20, 
  },
  label: {
    fontSize: 16,
    color: '#595959',
    marginBottom: 8,
    fontWeight: '500',
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
  inputError: {
    borderColor: '#D11A38',
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#D11A38',
    fontSize: 14,
    marginTop: 4,
  },
  fullScreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth:4,
    borderColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkmark: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  successText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 30,
  },
  attachButton: {
    borderWidth: 1,
    borderColor: '#D11A38',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  attachButtonText: {
    fontSize: 16,
    color: '#595959',
    textAlign: 'center',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#D11A38',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  submitButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  filesContainer: {
    marginBottom: 20,
  },
  filesScrollView: {
    maxHeight: 200,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    marginBottom: 8,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
    marginBottom: 2,
  },
  fileSize: {
    fontSize: 14,
    color: '#999999',
  },
  deleteButton: {
    padding: 8,
  },
  trashIcon: {
    width: 20,
    height: 20,
    tintColor: '#999999',
  },
});