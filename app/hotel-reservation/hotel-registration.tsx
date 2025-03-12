import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function HotelRegistrationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    numeroTicket: params.selectedSeats as string,
  });

  const handleInputChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid = () => {
    return (
      form.name !== '' &&
      form.email !== '' &&
      form.numeroTicket !== ''
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://reservapihotel.xoboevents.com/api/booking/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId: params.roomId,
          email: form.email,
          numeroTicket: form.numeroTicket,
          name: form.name,
          status: 'En attente'
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw new Error(data.message);
      }
      Alert.alert(
        'Success',
        'Hotel reservation completed successfully!',
        [
          {
            text: 'OK',
            onPress: () => router.push('/(tabs)/tickets'),
          },
        ]
      );
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Failed to complete reservation'
      );
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (
    label: string,
    field: keyof typeof form,
    placeholder: string,
    keyboardType: 'default' | 'email-address' | 'phone-pad' | 'numeric' = 'default'
  ) => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
          value={form[field]}
          onChangeText={(value) => handleInputChange(field, value)}
          placeholder={placeholder}
          keyboardType={keyboardType}
          autoCapitalize="none"
        />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hotel Registration</Text>
        <Text style={styles.headerSubtitle}>Complete your booking details</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Booking Information</Text>
          {renderInput('Full Name *', 'name', 'Enter your full name')}
          {renderInput('Email *', 'email', 'Enter your email address', 'email-address')}
          {renderInput('Ticket Number *', 'numeroTicket', 'Your ticket number')}
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            { opacity: isFormValid() && !loading ? 1 : 0.5 },
          ]}
          disabled={!isFormValid() || loading}
          onPress={handleSubmit}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Complete Reservation</Text>
          )}
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
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#008C45',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    height: 55,
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 