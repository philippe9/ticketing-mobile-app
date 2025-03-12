import { Stack } from 'expo-router';

export default function HotelReservationLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Hotel Reservation',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="hotel-selection"
        options={{
          title: 'Select Hotel',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="room-selection"
        options={{
          title: 'Select Room',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="hotel-registration"
        options={{
          title: 'Registration',
          headerShown: false,
        }}
      />
    </Stack>
  );
} 