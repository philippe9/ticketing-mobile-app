import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

type DocumentType = {
  uri: string;
  name: string;
  type: string;
  size: number;
};

type FormData = {
  passportScan: DocumentType | null;
  photoId: DocumentType | null;
  hotelReservation: DocumentType | null;
  flightReservation: DocumentType | null;
  matchTicket: DocumentType | null;
  bankStatement: DocumentType | null;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png'];
const ACCEPTED_DOC_TYPES = ['application/pdf', ...ACCEPTED_IMAGE_TYPES];

export default function EvisaDocumentsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [formData, setFormData] = useState<FormData>({
    passportScan: null,
    photoId: null,
    hotelReservation: null,
    flightReservation: null,
    matchTicket: null,
    bankStatement: null,
  });

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Sorry, we need camera roll permissions to upload documents.'
        );
        return false;
      }
    }
    return true;
  };

  const validateFile = (file: DocumentType, isImage: boolean = false) => {
    if (file.size > MAX_FILE_SIZE) {
      Alert.alert('File Too Large', 'Please select a file smaller than 5MB');
      return false;
    }

    const acceptedTypes = isImage ? ACCEPTED_IMAGE_TYPES : ACCEPTED_DOC_TYPES;
    if (!acceptedTypes.includes(file.type)) {
      Alert.alert(
        'Invalid File Type',
        `Please select a ${isImage ? 'JPEG or PNG image' : 'PDF, JPEG, or PNG file'}`
      );
      return false;
    }

    return true;
  };

  const pickImage = async (field: keyof FormData, isPhoto: boolean = false) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      if (isPhoto) {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [3, 4],
          quality: 0.8,
        });

        if (!result.canceled) {
          const asset = result.assets[0];
          const fileInfo: DocumentType = {
            uri: asset.uri,
            name: asset.uri.split('/').pop() || 'photo.jpg',
            type: 'image/jpeg',
            size: asset.fileSize || 0,
          };

          if (validateFile(fileInfo, true)) {
            setFormData({ ...formData, [field]: fileInfo });
          }
        }
      } else {
        const result = await DocumentPicker.getDocumentAsync({
          type: ACCEPTED_DOC_TYPES,
          copyToCacheDirectory: true,
        });

        if (result.type === 'success') {
          const fileInfo: DocumentType = {
            uri: result.uri,
            name: result.name,
            type: result.mimeType || '',
            size: result.size,
          };

          if (validateFile(fileInfo)) {
            setFormData({ ...formData, [field]: fileInfo });
          }
        }
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while picking the file');
    }
  };

  const handleNext = () => {
    if (!formData.passportScan || !formData.photoId) {
      Alert.alert('Required Documents', 'Please upload passport scan and photo ID');
      return;
    }

    router.push({
      pathname: './ticket-details',
      params: {
        ...params,
        documentsUploaded: 'true',
      },
    });
  };

  const renderDocumentItem = (
    title: string,
    field: keyof FormData,
    required: boolean = false,
    isPhoto: boolean = false
  ) => (
    <View style={styles.documentItem}>
      <View style={styles.documentHeader}>
        <Text style={styles.documentTitle}>
          {title} {required && '*'}
        </Text>
        {formData[field] && (
          <TouchableOpacity
            onPress={() => setFormData({ ...formData, [field]: null })}
            style={styles.removeButton}
          >
            <FontAwesome name="trash" size={20} color="#ff4444" />
          </TouchableOpacity>
        )}
      </View>

      {formData[field] ? (
        <View style={styles.uploadedFile}>
          <FontAwesome
            name={formData[field]?.type.includes('image') ? 'file-image-o' : 'file-pdf-o'}
            size={24}
            color="#008C45"
          />
          <Text style={styles.fileName} numberOfLines={1}>
            {formData[field]?.name}
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => pickImage(field, isPhoto)}
        >
          <FontAwesome name="upload" size={24} color="#008C45" />
          <Text style={styles.uploadButtonText}>Choose File</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="file" size={40} color="#fff" />
        <Text style={styles.headerTitle}>Required Documents</Text>
        <Text style={styles.headerSubtitle}>Upload Supporting Documents</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Identity Documents</Text>
          {renderDocumentItem('Passport Scan (Bio Page)', 'passportScan',true, true)}
          {renderDocumentItem('Recent Passport Photo', 'photoId', true, true)}
        </View>

        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Travel Documents</Text>
          {renderDocumentItem('Hotel Reservation', 'hotelReservation')}
          {renderDocumentItem('Flight Reservation', 'flightReservation')}
          {renderDocumentItem('AFCON Match Ticket', 'matchTicket')}
        </View> */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Supporting Documents(Optional)</Text>
          {renderDocumentItem('Bank Statement', 'bankStatement')}
        </View>

        <View style={styles.infoBox}>
          <FontAwesome name="info-circle" size={20} color="#008C45" />
          <Text style={styles.infoText}>
            Please ensure all documents are clear and legible. Maximum file size: 5MB.
            Accepted formats: PDF, JPEG, PNG
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.nextButton,
            (!formData.passportScan || !formData.photoId) && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Continue to Review</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#008C45',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  documentItem: {
    marginBottom: 20,
  },
  documentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  documentTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  uploadButton: {
    borderWidth: 2,
    borderColor: '#008C45',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  uploadButtonText: {
    color: '#008C45',
    fontSize: 16,
    marginTop: 10,
    fontWeight: '500',
  },
  uploadedFile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
  },
  fileName: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  removeButton: {
    padding: 5,
  },
  infoBox: {
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoText: {
    marginLeft: 10,
    color: '#333',
    flex: 1,
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: '#008C45',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 