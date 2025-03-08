import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

export default function HotelServicesScreen() {
  const params = useLocalSearchParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    passportNumber: '',
    arrivalDate: '',
    departureDate: '',
    numberOfGuests: '',
    roomPreference: '',
  });

  const handleSubmit = () => {
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    router.push({
      pathname: './flight-reservation',
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
        nationality: params.nationality,
        countryOfResidence: params.countryOfResidence,
        passportType: params.passportType,
        hasValidVisa: params.hasValidVisa,
        // Hotel details
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        hotelPassportNumber: formData.passportNumber,
        arrivalDate: formData.arrivalDate,
        departureDate: formData.departureDate,
        numberOfGuests: formData.numberOfGuests,
        roomPreference: formData.roomPreference,
      },
    });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hotel Services</Text>
        <Text style={styles.subtitle}>Book your stay for the tournament</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Available Services</Text>
          <View style={styles.serviceItem}>
            <FontAwesome name="wifi" size={20} color="#666" style={styles.serviceIcon} />
            <Text style={styles.serviceText}>Free Wi-Fi</Text>
          </View>
          <View style={styles.serviceItem}>
            <FontAwesome name="car" size={20} color="#666" style={styles.serviceIcon} />
            <Text style={styles.serviceText}>Airport Transfer</Text>
          </View>
          <View style={styles.serviceItem}>
            <FontAwesome name="cutlery" size={20} color="#666" style={styles.serviceIcon} />
            <Text style={styles.serviceText}>Restaurant</Text>
          </View>
          <View style={styles.serviceItem}>
            <FontAwesome name="bed" size={20} color="#666" style={styles.serviceIcon} />
            <Text style={styles.serviceText}>24/7 Room Service</Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>First Name *</Text>
          <TextInput
            style={styles.input}
            value={formData.firstName}
            onChangeText={(text) => setFormData({ ...formData, firstName: text })}
            placeholder="Enter your first name"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Last Name *</Text>
          <TextInput
            style={styles.input}
            value={formData.lastName}
            onChangeText={(text) => setFormData({ ...formData, lastName: text })}
            placeholder="Enter your last name"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone Number *</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nationality</Text>
          <TextInput
            style={styles.input}
            value={formData.nationality}
            onChangeText={(text) => setFormData({ ...formData, nationality: text })}
            placeholder="Enter your nationality"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Passport Number</Text>
          <TextInput
            style={styles.input}
            value={formData.passportNumber}
            onChangeText={(text) => setFormData({ ...formData, passportNumber: text })}
            placeholder="Enter your passport number"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Arrival Date</Text>
          <TextInput
            style={styles.input}
            value={formData.arrivalDate}
            onChangeText={(text) => setFormData({ ...formData, arrivalDate: text })}
            placeholder="DD/MM/YYYY"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Departure Date</Text>
          <TextInput
            style={styles.input}
            value={formData.departureDate}
            onChangeText={(text) => setFormData({ ...formData, departureDate: text })}
            placeholder="DD/MM/YYYY"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Number of Guests</Text>
          <TextInput
            style={styles.input}
            value={formData.numberOfGuests}
            onChangeText={(text) => setFormData({ ...formData, numberOfGuests: text })}
            placeholder="Enter number of guests"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Room Preference</Text>
          <TextInput
            style={styles.input}
            value={formData.roomPreference}
            onChangeText={(text) => setFormData({ ...formData, roomPreference: text })}
            placeholder="e.g., Single, Double, Suite"
          />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Register</Text>
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
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  serviceIcon: {
    width: 30,
  },
  serviceText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
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
  submitButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 