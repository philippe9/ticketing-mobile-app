import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';

const PASSPORT_TYPES = [
  'Ordinary Passport',
  'Diplomatic Passport',
  'Service Passport',
  'Travel Document',
] as const;

type FormData = {
  nationality: string;
  countryOfResidence: string;
  passportType: typeof PASSPORT_TYPES[number];
  hasValidVisa: boolean;
};

export default function EvisaEligibilityScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [formData, setFormData] = useState<FormData>({
    nationality: '',
    countryOfResidence: '',
    passportType: PASSPORT_TYPES[0],
    hasValidVisa: false,
  });

  const handleNext = () => {
    if (!formData.nationality || !formData.countryOfResidence) {
      alert('Please fill in all required fields');
      return;
    }

    router.push({
      pathname: './hotel-booking',
      params: {
        // Match details
        matchId: params.matchId,
        team1: params.team1,
        team2: params.team2,
        date: params.date,
        time: params.time,
        stadium: params.stadium,
        city: params.city,
        // Seat details
        selectedSeats: params.selectedSeats,
        totalPrice: params.totalPrice,
        // Visa eligibility details
        nationality: formData.nationality,
        countryOfResidence: formData.countryOfResidence,
        passportType: formData.passportType,
        hasValidVisa: formData.hasValidVisa ? '1' : '0',
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="id-card" size={40} color="#fff" />
        <Text style={styles.headerTitle}>E-Visa Eligibility Check</Text>
        <Text style={styles.headerSubtitle}>Kingdom of Morocco</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nationality *</Text>
          <TextInput
            style={styles.input}
            value={formData.nationality}
            onChangeText={(text) => setFormData({ ...formData, nationality: text })}
            placeholder="Enter your nationality"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Country of Residence *</Text>
          <TextInput
            style={styles.input}
            value={formData.countryOfResidence}
            onChangeText={(text) => setFormData({ ...formData, countryOfResidence: text })}
            placeholder="Enter your country of residence"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Passport Type *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.passportType}
              onValueChange={(value: typeof PASSPORT_TYPES[number]) => 
                setFormData({ ...formData, passportType: value })
              }
              style={styles.picker}
            >
              {PASSPORT_TYPES.map((type) => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Event Participation</Text>
          <View style={styles.infoBox}>
            <FontAwesome name="info-circle" size={20} color="#008C45" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              You are applying for an e-visa to attend AFCON 2025 in Morocco
            </Text>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Do you have another valid visa?</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setFormData({ ...formData, hasValidVisa: true })}
            >
              <View style={styles.radio}>
                {formData.hasValidVisa && <View style={styles.radioSelected} />}
              </View>
              <Text style={styles.radioLabel}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setFormData({ ...formData, hasValidVisa: false })}
            >
              <View style={styles.radio}>
                {!formData.hasValidVisa && <View style={styles.radioSelected} />}
              </View>
              <Text style={styles.radioLabel}>No</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.nextButton,
            (!formData.nationality || !formData.countryOfResidence) && styles.nextButtonDisabled
          ]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Check Eligibility</Text>
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
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  infoBox: {
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    flex: 1,
    color: '#2e7d32',
    fontSize: 14,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#008C45',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#008C45',
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
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