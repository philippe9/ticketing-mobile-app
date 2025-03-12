import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
  availability: boolean;
  description: string;
  caracteristiques: string[];
  capacity: number;
  mainImage: string;
  images: string[];
  policies: string;
  arrivalTime: string;
  departureTime: string;
  cancellationPolicy: string;
}

export default function RoomSelectionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch(`https://reservapihotel.xoboevents.com/api/hotels/${params.hotelId}/rooms`);
      if (!response.ok) {
        throw new Error('Failed to fetch rooms');
      }
      const data = await response.json();
      setRooms(data.rooms || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!selectedRoom) {
      return;
    }

    router.push({
      pathname: './hotel-registration',
      params: {
        ...params,
        roomId: selectedRoom,
      },
    });
  };

  const renderRoomCard = (room: Room) => {
    const isSelected = selectedRoom === room.id;

    return (
      <TouchableOpacity
        key={room.id}
        style={[styles.roomCard, isSelected && styles.selectedCard]}
        onPress={() => setSelectedRoom(room.id)}
      >
        <Image 
          source={{ uri: `https://reservapihotel.xoboevents.com/uploadsrooms/${room.mainImage}` }} 
          style={styles.roomImage} 
        />
        <View style={styles.roomInfo}>
          <View style={styles.roomHeader}>
            <Text style={styles.roomType}>{room.name}</Text>
            <Text style={styles.price}>${room.price} / night</Text>
          </View>

          <View style={styles.roomDetails}>
            <Text style={styles.detailText}>
              <FontAwesome name="users" size={14} color="#666" /> Capacity: {room.capacity}
            </Text>
            <Text style={styles.detailText}>
              <FontAwesome name="bed" size={14} color="#666" /> {room.type}
            </Text>
            <Text style={styles.detailText}>
              <FontAwesome name="clock-o" size={14} color="#666" /> Check-in: {room.arrivalTime}
            </Text>
          </View>

          <Text style={styles.description} numberOfLines={2}>
            {room.description}
          </Text>

          <View style={styles.amenitiesContainer}>
            {room.caracteristiques.map((feature, index) => (
              <View key={index} style={styles.amenityTag}>
                <Text style={styles.amenityText}>{feature}</Text>
              </View>
            ))}
          </View>

          <Text style={[styles.availability, !room.availability && styles.unavailable]}>
            {room.availability ? 'Available' : 'Not Available'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#008C45" />
        <Text style={styles.loadingText}>Loading rooms...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <FontAwesome name="exclamation-circle" size={50} color="#FF4B4B" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchRooms}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Select Room</Text>
        <Text style={styles.headerSubtitle}>Choose your room type</Text>
      </View>

      <View style={styles.content}>
        {rooms.map(room => renderRoomCard(room))}

        <TouchableOpacity
          style={[
            styles.nextButton,
            { opacity: selectedRoom ? 1 : 0.5 },
          ]}
          disabled={!selectedRoom}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Continue to Registration</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#008C45',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  roomCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#008C45',
  },
  roomImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  roomInfo: {
    padding: 15,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  roomType: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#008C45',
  },
  roomDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginRight: 15,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  amenityTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 12,
    color: '#666',
  },
  availability: {
    fontSize: 14,
    color: '#008C45',
    fontWeight: 'bold',
    marginTop: 10,
  },
  unavailable: {
    color: '#FF4B4B',
  },
  nextButton: {
    backgroundColor: '#008C45',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 