import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

export default function TicketDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
console.log(params);
  const handleSubmit = () => {
    Alert.alert(
      'Confirm Submission',
      'Are you sure you want to submit your ticket and visa application?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Submit',
          onPress: () => {
            // Here you would typically make an API call to submit the application
            Alert.alert(
              'Success',
              'Your ticket and visa application has been submitted successfully!',
              [
                {
                  text: 'OK',
                  onPress: () => router.push('/(tabs)'),
                },
              ]
            );
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="ticket" size={40} color="#fff" />
        <Text style={styles.headerTitle}>Review Details</Text>
        <Text style={styles.headerSubtitle}>Verify Your Information</Text>
      </View>

      <View style={styles.content}>
        <Section title="Match Details">
          <DetailItem
            label="Match"
            value={`${params.team1} vs ${params.team2}`}
          />
          <DetailItem
            label="Date"
            value={params.date ? formatDate(params.date as string) : 'N/A'}
          />
          <DetailItem
            label="Time"
            value={params.time ? params.time as string : 'N/A'}
          />
          <DetailItem
            label="Stadium"
            value={params.stadium as string}
          />
          {/* <DetailItem
            label="Section"
            value={params.section as string}
          /> */}
          <DetailItem
            label="Seat Number"
            value={params.selectedSeats as string}
          />
          <DetailItem
            label="Price"
            value={formatPrice(Number(params.totalPrice))}
          />
        </Section>

        <Section title="Flight Details">
          <DetailItem
            label="Departure City"
            value={params.departureCity as string}
          />
          <DetailItem
            label="Departure Date"
            value={params.departureDate ? formatDate(params.departureDate as string) : 'N/A'}
          />
          <DetailItem
            label="Return Date"
            value={params.returnDate ? formatDate(params.returnDate as string) : 'N/A'}
          />
          <DetailItem
            label="Cabin Class"
            value={params.cabinClass as string}
          />
          <DetailItem
            label="Passengers"
            value={`${params.numAdults} Adult(s), ${params.numChildren} Child(ren), ${params.numInfants} Infant(s)`}
          />
        </Section>

        <Section title="Personal Information">
          <DetailItem
            label="Full Name"
            value={`${params.firstName} ${params.lastName}`}
          />
          <DetailItem
            label="Gender"
            value={params.gender as string}
          />
          <DetailItem
            label="Date of Birth"
            value={params.dateOfBirth ? formatDate(params.dateOfBirth as string) : 'N/A'}
          />
          <DetailItem
            label="Nationality"
            value={params.nationality as string}
          />
          <DetailItem
            label="Passport Number"
            value={params.passportNumber as string}
          />
          <DetailItem
            label="Passport Expiry"
            value={params.passportExpiryDate ? formatDate(params.passportExpiryDate as string) : 'N/A'}
          />
        </Section>

        <Section title="Travel Information">
          <DetailItem
            label="Entry Point"
            value={params.entryPoint as string}
          />
          <DetailItem
            label="Accommodation"
            value={`${params.accommodationType} - ${params.accommodationCity}`}
          />
          <DetailItem
            label="Phone in Morocco"
            value={params.phoneNumber as string}
          />
        </Section>

        <View style={styles.infoBox}>
          <FontAwesome name="info-circle" size={20} color="#008C45" />
          <Text style={styles.infoText}>
            Please review all information carefully before submitting. Once submitted,
            modifications will require contacting support.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit Application</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
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
  submitButton: {
    backgroundColor: '#008C45',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 