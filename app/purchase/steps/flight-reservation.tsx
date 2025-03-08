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

const DEPARTURE_CITIES = [
  'New York (JFK)',
  'London (LHR)',
  'Paris (CDG)',
  'Dubai (DXB)',
  'Tokyo (NRT)',
  'Beijing (PEK)',
  'Sydney (SYD)',
  'Lagos (LOS)',
  'Cairo (CAI)',
  'Johannesburg (JNB)',
] as const;

const CABIN_CLASSES = [
  'Economy',
  'Premium Economy',
  'Business',
  'First',
] as const;

type FormData = {
  departureCity: typeof DEPARTURE_CITIES[number];
  departureDate: Date;
  returnDate: Date;
  cabinClass: typeof CABIN_CLASSES[number];
  numAdults: string;
  numChildren: string;
  numInfants: string;
  specialRequests: string;
  showDeparturePicker: boolean;
  showReturnPicker: boolean;
  flexibleDates: boolean;
};

export default function FlightReservationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [formData, setFormData] = useState<FormData>({
    departureCity: DEPARTURE_CITIES[0],
    departureDate: new Date(),
    returnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Default to 2 weeks later
    cabinClass: CABIN_CLASSES[0],
    numAdults: '1',
    numChildren: '0',
    numInfants: '0',
    specialRequests: '',
    showDeparturePicker: false,
    showReturnPicker: false,
    flexibleDates: false,
  });

  const handleNext = () => {
    if (!formData.departureCity || !formData.numAdults) {
      alert('Please fill in all required fields');
      return;
    }

    router.push({
      pathname: './evisa-travel',
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
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        phone: params.phone,
        hotelPassportNumber: params.hotelPassportNumber,
        hotelArrivalDate: params.arrivalDate,
        hotelDepartureDate: params.departureDate,
        numberOfGuests: params.numberOfGuests,
        roomPreference: params.roomPreference,
        // Flight details
        departureCity: formData.departureCity,
        departureDate: formData.departureDate.toISOString(),
        returnDate: formData.returnDate.toISOString(),
        cabinClass: formData.cabinClass,
        numAdults: formData.numAdults,
        numChildren: formData.numChildren,
        numInfants: formData.numInfants,
        specialRequests: formData.specialRequests,
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
        <Text style={styles.headerTitle}>Flight Reservation</Text>
        <Text style={styles.headerSubtitle}>Book Your Trip to Morocco</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Departure City *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.departureCity}
              onValueChange={(value: typeof DEPARTURE_CITIES[number]) =>
                setFormData({ ...formData, departureCity: value })
              }
              style={styles.picker}
            >
              {DEPARTURE_CITIES.map((city) => (
                <Picker.Item key={city} label={city} value={city} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Departure Date *</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setFormData({ ...formData, showDeparturePicker: true })}
          >
            <Text style={styles.dateButtonText}>{formatDate(formData.departureDate)}</Text>
            <FontAwesome name="calendar" size={20} color="#666" />
          </TouchableOpacity>
          {formData.showDeparturePicker && (
            <DateTimePicker
              value={formData.departureDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setFormData({
                  ...formData,
                  showDeparturePicker: false,
                  departureDate: selectedDate || formData.departureDate,
                });
              }}
            />
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Return Date *</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setFormData({ ...formData, showReturnPicker: true })}
          >
            <Text style={styles.dateButtonText}>{formatDate(formData.returnDate)}</Text>
            <FontAwesome name="calendar" size={20} color="#666" />
          </TouchableOpacity>
          {formData.showReturnPicker && (
            <DateTimePicker
              value={formData.returnDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setFormData({
                  ...formData,
                  showReturnPicker: false,
                  returnDate: selectedDate || formData.returnDate,
                });
              }}
            />
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Cabin Class *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.cabinClass}
              onValueChange={(value: typeof CABIN_CLASSES[number]) =>
                setFormData({ ...formData, cabinClass: value })
              }
              style={styles.picker}
            >
              {CABIN_CLASSES.map((cabin) => (
                <Picker.Item key={cabin} label={cabin} value={cabin} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.passengerSection}>
          <Text style={styles.sectionTitle}>Number of Passengers</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Adults (12+ years) *</Text>
            <TextInput
              style={styles.input}
              value={formData.numAdults}
              onChangeText={(text) => setFormData({ ...formData, numAdults: text })}
              keyboardType="numeric"
              placeholder="1"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Children (2-11 years)</Text>
            <TextInput
              style={styles.input}
              value={formData.numChildren}
              onChangeText={(text) => setFormData({ ...formData, numChildren: text })}
              keyboardType="numeric"
              placeholder="0"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Infants (under 2 years)</Text>
            <TextInput
              style={styles.input}
              value={formData.numInfants}
              onChangeText={(text) => setFormData({ ...formData, numInfants: text })}
              keyboardType="numeric"
              placeholder="0"
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Special Requests</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.specialRequests}
            onChangeText={(text) => setFormData({ ...formData, specialRequests: text })}
            placeholder="Meal preferences, wheelchair assistance, etc."
            multiline
            numberOfLines={3}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.nextButton,
            (!formData.departureCity || !formData.numAdults) && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Continue to Evisa conditions</Text>
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
  passengerSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
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