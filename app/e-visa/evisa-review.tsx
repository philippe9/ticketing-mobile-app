import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function EVisaReviewScreen() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Implement API submission
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
      router.push('/e-visa/evisa-confirmation');
    } catch (err) {
      setError('Failed to submit visa application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderSection = (title: string, data: { label: string; value: string }[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {data.map((item, index) => (
        <View key={index} style={styles.detailRow}>
          <Text style={styles.label}>{item.label}:</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#660101" />
        <Text style={styles.loadingText}>Submitting your application...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Review Your Application</Text>
        <Text style={styles.subtitle}>Please verify all information before submitting</Text>

        {renderSection('Personal Information', [
          { label: 'Full Name', value: 'John Doe' },
          { label: 'Date of Birth', value: '1990-01-01' },
          { label: 'Nationality', value: 'United States' },
          { label: 'Passport Number', value: 'US123456789' },
        ])}

        {renderSection('Travel Details', [
          { label: 'Purpose of Visit', value: 'Tourism' },
          { label: 'Duration of Stay', value: '15 days' },
          { label: 'Arrival Date', value: '2025-01-15' },
          { label: 'Departure Date', value: '2025-01-30' },
        ])}

        {renderSection('Contact Information', [
          { label: 'Email', value: 'john.doe@example.com' },
          { label: 'Phone', value: '+1 234 567 8900' },
          { label: 'Address', value: '123 Main St, New York, NY' },
        ])}

        {renderSection('Documents', [
          { label: 'Passport Copy', value: 'Uploaded' },
          { label: 'Photo', value: 'Uploaded' },
          { label: 'Hotel Reservation', value: 'Uploaded' },
          { label: 'Return Ticket', value: 'Uploaded' },
        ])}

        {error && (
          <View style={styles.errorContainer}>
            <FontAwesome name="exclamation-circle" size={20} color="#FF4B4B" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Application</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          By submitting this application, you confirm that all provided information is accurate and complete.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#660101',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  submitButton: {
    backgroundColor: '#660101',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disclaimer: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5E5',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  errorText: {
    color: '#FF4B4B',
    marginLeft: 8,
    flex: 1,
  },
}); 