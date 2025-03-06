import { Stack } from 'expo-router';

export default function MatchesLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FF6B6B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Select Match',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="buy"
        options={{
          title: 'Select Seats',
          headerShown: false,
        }}
      />
    </Stack>
  );
} 