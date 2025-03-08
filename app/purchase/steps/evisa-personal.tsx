import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const GENDER_OPTIONS = ['Male', 'Female'] as const;
const MARITAL_STATUS = ['Single', 'Married', 'Divorced', 'Widowed'] as const;

type FormData = {
  firstName: string;
  lastName: string;
  gender: typeof GENDER_OPTIONS[number];
  dateOfBirth: Date;
  placeOfBirth: string;
  countryOfBirth: string;
  maritalStatus: typeof MARITAL_STATUS[number];
  occupation: string;
  employerName: string;
  employerAddress: string;
  passportNumber: string;
  passportIssueDate: Date;
  passportExpiryDate: Date;
  passportIssuePlace: string;
  showDateOfBirthPicker: boolean;
  showPassportIssuePicker: boolean;
  showPassportExpiryPicker: boolean;
};

export default function EvisaPersonalScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    gender: GENDER_OPTIONS[0],
    dateOfBirth: new Date(1990, 0, 1),
    placeOfBirth: '',
    countryOfBirth: '',
    maritalStatus: MARITAL_STATUS[0],
    occupation: '',
    employerName: '',
    employerAddress: '',
    passportNumber: '',
    passportIssueDate: new Date(),
    passportExpiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    passportIssuePlace: '',
    showDateOfBirthPicker: false,
    showPassportIssuePicker: false,
    showPassportExpiryPicker: false,
  });

  const handleNext = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.dateOfBirth ||
      !formData.passportNumber ||
      !formData.passportExpiryDate
    ) {
      alert('Please fill in all required fields');
      return;
    }

    router.push({
      pathname: './evisa-documents',
      params: {
        ...params,
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth.toISOString(),
        placeOfBirth: formData.placeOfBirth,
        countryOfBirth: formData.countryOfBirth,
        maritalStatus: formData.maritalStatus,
        occupation: formData.occupation,
        employerName: formData.employerName,
        employerAddress: formData.employerAddress,
        passportNumber: formData.passportNumber,
        passportIssueDate: formData.passportIssueDate.toISOString(),
        passportExpiryDate: formData.passportExpiryDate.toISOString(),
        passportIssuePlace: formData.passportIssuePlace,
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
        <FontAwesome name="user" size={40} color="#fff" />
        <Text style={styles.headerTitle}>Personal Information</Text>
        <Text style={styles.headerSubtitle}>E-Visa Application Details</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Details</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>First Name (as in passport) *</Text>
            <TextInput
              style={styles.input}
              value={formData.firstName}
              onChangeText={(text) => setFormData({ ...formData, firstName: text })}
              placeholder="Enter your first name"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Last Name (as in passport) *</Text>
            <TextInput
              style={styles.input}
              value={formData.lastName}
              onChangeText={(text) => setFormData({ ...formData, lastName: text })}
              placeholder="Enter your last name"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Gender *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.gender}
                onValueChange={(value: typeof GENDER_OPTIONS[number]) =>
                  setFormData({ ...formData, gender: value })
                }
                style={styles.picker}
              >
                {GENDER_OPTIONS.map((gender) => (
                  <Picker.Item key={gender} label={gender} value={gender} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Date of Birth *</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setFormData({ ...formData, showDateOfBirthPicker: true })}
            >
              <Text style={styles.dateButtonText}>{formatDate(formData.dateOfBirth)}</Text>
              <FontAwesome name="calendar" size={20} color="#666" />
            </TouchableOpacity>
            {formData.showDateOfBirthPicker && (
              <DateTimePicker
                value={formData.dateOfBirth}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setFormData({
                    ...formData,
                    showDateOfBirthPicker: false,
                    dateOfBirth: selectedDate || formData.dateOfBirth,
                  });
                }}
              />
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Place of Birth *</Text>
            <TextInput
              style={styles.input}
              value={formData.placeOfBirth}
              onChangeText={(text) => setFormData({ ...formData, placeOfBirth: text })}
              placeholder="City and Country"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Country of Birth *</Text>
            <TextInput
              style={styles.input}
              value={formData.countryOfBirth}
              onChangeText={(text) => setFormData({ ...formData, countryOfBirth: text })}
              placeholder="Enter country of birth"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Marital Status *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.maritalStatus}
                onValueChange={(value: typeof MARITAL_STATUS[number]) =>
                  setFormData({ ...formData, maritalStatus: value })
                }
                style={styles.picker}
              >
                {MARITAL_STATUS.map((status) => (
                  <Picker.Item key={status} label={status} value={status} />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Information</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Occupation *</Text>
            <TextInput
              style={styles.input}
              value={formData.occupation}
              onChangeText={(text) => setFormData({ ...formData, occupation: text })}
              placeholder="Enter your occupation"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Employer Name</Text>
            <TextInput
              style={styles.input}
              value={formData.employerName}
              onChangeText={(text) => setFormData({ ...formData, employerName: text })}
              placeholder="Enter employer name"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Employer Address</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.employerAddress}
              onChangeText={(text) => setFormData({ ...formData, employerAddress: text })}
              placeholder="Enter employer address"
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Passport Information</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Passport Number *</Text>
            <TextInput
              style={styles.input}
              value={formData.passportNumber}
              onChangeText={(text) => setFormData({ ...formData, passportNumber: text })}
              placeholder="Enter passport number"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Issue Date *</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setFormData({ ...formData, showPassportIssuePicker: true })}
            >
              <Text style={styles.dateButtonText}>{formatDate(formData.passportIssueDate)}</Text>
              <FontAwesome name="calendar" size={20} color="#666" />
            </TouchableOpacity>
            {formData.showPassportIssuePicker && (
              <DateTimePicker
                value={formData.passportIssueDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setFormData({
                    ...formData,
                    showPassportIssuePicker: false,
                    passportIssueDate: selectedDate || formData.passportIssueDate,
                  });
                }}
              />
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Expiry Date *</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setFormData({ ...formData, showPassportExpiryPicker: true })}
            >
              <Text style={styles.dateButtonText}>{formatDate(formData.passportExpiryDate)}</Text>
              <FontAwesome name="calendar" size={20} color="#666" />
            </TouchableOpacity>
            {formData.showPassportExpiryPicker && (
              <DateTimePicker
                value={formData.passportExpiryDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setFormData({
                    ...formData,
                    showPassportExpiryPicker: false,
                    passportExpiryDate: selectedDate || formData.passportExpiryDate,
                  });
                }}
              />
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Place of Issue *</Text>
            <TextInput
              style={styles.input}
              value={formData.passportIssuePlace}
              onChangeText={(text) => setFormData({ ...formData, passportIssuePlace: text })}
              placeholder="Enter place of issue"
            />
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.nextButton,
            (!formData.firstName ||
              !formData.lastName ||
              !formData.dateOfBirth ||
              !formData.passportNumber ||
              !formData.passportExpiryDate) &&
              styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Continue to Travel Details</Text>
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