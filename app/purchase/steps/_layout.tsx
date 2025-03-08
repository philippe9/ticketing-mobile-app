import { Stack, usePathname } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

const STEPS = [
  { id: 'seat-selection', title: 'Select Seats' },
  { id: 'evisa-eligibility', title: 'Visa Eligibility' },
  { id: 'hotel-booking', title: 'Hotel Booking' },
  { id: 'flight-reservation', title: 'Flight Reservation' },
  { id: 'evisa-travel', title: 'Travel Conditions' },
  { id: 'evisa-personal', title: 'Personal Details' },
  { id: 'evisa-documents', title: 'Documents' },
  { id: 'ticket-details', title: 'Ticket Details and Confirmation' },
];

export default function StepsLayout() {
  const pathname = usePathname();
  const currentStep = STEPS.findIndex(step => pathname.includes(step.id)) + 1;

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(currentStep / STEPS.length) * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.stepText}>
          Step {currentStep} of {STEPS.length}
        </Text>
      </View>

      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#008C45',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="seat-selection"
          options={{
            title: 'Select Seats',
          }}
        />
        <Stack.Screen
          name="evisa-eligibility"
          options={{
            title: 'Visa Eligibility',
          }}
        />
        <Stack.Screen
          name="hotel-booking"
          options={{
            title: 'Hotel Booking',
          }}
        />
        <Stack.Screen
          name="evisa-travel"
          options={{
            title: 'Travel Conditions',
          }}
        />
        <Stack.Screen
          name="evisa-personal"
          options={{
            title: 'Personal Details',
          }}
        />

        <Stack.Screen
          name="evisa-documents"
          options={{
            title: 'Required Documents',
          }}
        />
        <Stack.Screen
          name="ticket-details"
          options={{
            title: 'Ticket Details',
          }}
        />
        
        <Stack.Screen
          name="confirmation"
          options={{
            title: 'Confirm Purchase',
          }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#008C45',
    borderRadius: 2,
  },
  stepText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
}); 