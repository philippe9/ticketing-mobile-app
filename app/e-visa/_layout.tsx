import { Stack, usePathname } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

const STEPS = [
  { id: 'evisa-eligibility', title: 'Visa Eligibility' },
  { id: 'evisa-travel', title: 'Travel Conditions' },
  { id: 'evisa-personal', title: 'Personal Details' },
  { id: 'evisa-documents', title: 'Documents' },
  { id: 'evisa-review', title: 'Review & Submit' },
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
            backgroundColor: '#660101',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="evisa-eligibility"
          options={{
            title: 'Visa Eligibility',
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
          name="evisa-review"
          options={{
            title: 'Review & Submit',
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
    backgroundColor: '#660101',
    borderRadius: 2,
  },
  stepText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
}); 