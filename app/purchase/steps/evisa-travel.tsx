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
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

const ENTRY_POINTS = [
  'Mohammed V International Airport - Casablanca',
  'Marrakesh Menara Airport',
  'Fès–Saïs Airport',
  'Rabat–Salé Airport',
  'Tangier Ibn Battouta Airport',
] as const;

const ACCOMMODATION_TYPES = [
  'Hotel',
  'Private Residence',
  'Tournament Accommodation',
  'Other',
] as const;

type FormData = {
  entryPoint: typeof ENTRY_POINTS[number];
  entryDate: Date;
  exitDate: Date;
  accommodationType: typeof ACCOMMODATION_TYPES[number];
  accommodationAddress: string;
  accommodationCity: string;
  phoneNumber: string;
  emergencyContact: string;
  showEntryPicker: boolean;
  showExitPicker: boolean;
};

export default function EvisaTravelScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [formData, setFormData] = useState<FormData>({
    entryPoint: ENTRY_POINTS[0],
    entryDate: new Date(),
    exitDate: new Date(),
    accommodationType: ACCOMMODATION_TYPES[0],
    accommodationAddress: '',
    accommodationCity: '',
    phoneNumber: '',
    emergencyContact: '',
    showEntryPicker: false,
    showExitPicker: false,
  });

  const handleNext = () => {
    if (!formData.accommodationAddress || !formData.accommodationCity || !formData.phoneNumber) {
      alert('Please fill in all required fields');
      return;
    }

    router.push({
      pathname: './evisa-personal',
      params: {
        ...params,
        entryPoint: formData.entryPoint,
        entryDate: formData.entryDate.toISOString(),
        exitDate: formData.exitDate.toISOString(),
        accommodationType: formData.accommodationType,
        accommodationAddress: formData.accommodationAddress,
        accommodationCity: formData.accommodationCity,
        phoneNumber: formData.phoneNumber,
        emergencyContact: formData.emergencyContact,
      },
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="plane" size={40} color="#fff" />
        <Text style={styles.headerTitle}>Travel Information</Text>
        <Text style={styles.headerSubtitle}>Entry and Stay Details</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Point of Entry *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.entryPoint}
              onValueChange={(value: typeof ENTRY_POINTS[number]) =>
                setFormData({ ...formData, entryPoint: value })
              }
              style={styles.picker}
            >
              {ENTRY_POINTS.map((point) => (
                <Picker.Item key={point} label={point} value={point} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Entry Date *</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setFormData({ ...formData, showEntryPicker: true })}
          >
            <Text style={styles.dateButtonText}>{formatDate(formData.entryDate)}</Text>
            <FontAwesome name="calendar" size={20} color="#666" />
          </TouchableOpacity>
          {formData.showEntryPicker && (
            <DateTimePicker
              value={formData.entryDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setFormData({
                  ...formData,
                  showEntryPicker: false,
                  entryDate: selectedDate || formData.entryDate,
                });
              }}
            />
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Exit Date *</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setFormData({ ...formData, showExitPicker: true })}
          >
            <Text style={styles.dateButtonText}>{formatDate(formData.exitDate)}</Text>
            <FontAwesome name="calendar" size={20} color="#666" />
          </TouchableOpacity>
          {formData.showExitPicker && (
            <DateTimePicker
              value={formData.exitDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setFormData({
                  ...formData,
                  showExitPicker: false,
                  exitDate: selectedDate || formData.exitDate,
                });
              }}
            />
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Accommodation Type *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.accommodationType}
              onValueChange={(value: typeof ACCOMMODATION_TYPES[number]) =>
                setFormData({ ...formData, accommodationType: value })
              }
              style={styles.picker}
            >
              {ACCOMMODATION_TYPES.map((type) => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Accommodation Address *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.accommodationAddress}
            onChangeText={(text) => setFormData({ ...formData, accommodationAddress: text })}
            placeholder="Enter your accommodation address"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>City *</Text>
          <TextInput
            style={styles.input}
            value={formData.accommodationCity}
            onChangeText={(text) => setFormData({ ...formData, accommodationCity: text })}
            placeholder="Enter city name"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone Number in Morocco *</Text>
          <TextInput
            style={styles.input}
            value={formData.phoneNumber}
            onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
            placeholder="+212"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Emergency Contact</Text>
          <TextInput
            style={styles.input}
            value={formData.emergencyContact}
            onChangeText={(text) => setFormData({ ...formData, emergencyContact: text })}
            placeholder="Name and phone number"
          />
        </View>

        <TouchableOpacity
          style={[
            styles.nextButton,
            (!formData.accommodationAddress || !formData.accommodationCity || !formData.phoneNumber) &&
              styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Continue to Personal Details</Text>
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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
  dateButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateButtonText: {
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