import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

interface Hotel {
  id: number;
  name: string;
  address: string;
  description: string;
  rate: number;
  image: string;
  city: string;
  country: string;
  services: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export default function HotelSelectionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await fetch('https://reservapihotel.xoboevents.com/api/hotels/');
      if (!response.ok) {
        throw new Error('Failed to fetch hotels');
      }
      const data = await response.json();
      setHotels(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!selectedHotel) {
      return;
    }

    router.push({
      pathname: './room-selection',
      params: {
        ...params,
        hotelId: selectedHotel,
      },
    });
  };

  const renderRatingStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FontAwesome
        key={index}
        name="star"
        size={16}
        color={index < rating ? '#FFD700' : '#E0E0E0'}
        style={{ marginRight: 2 }}
      />
    ));
  };

  const renderServiceIcon = (service: string) => {
    const icons: { [key: string]: any } = {
      wifi: 'wifi',
      restaurant: 'cutlery',
      parking: 'car',
      bar: 'glass',
      gym: 'heartbeat',
      spa: 'tint',
      pool: 'life-ring',
    };

    return icons[service] || 'check';
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#008C45" />
        <Text style={styles.loadingText}>Loading hotels...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <FontAwesome name="exclamation-circle" size={50} color="#FF4B4B" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchHotels}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Select Hotel</Text>
        <Text style={styles.headerSubtitle}>Choose your accommodation</Text>
      </View>

      <View style={styles.content}>
        {hotels.map(hotel => (
          <TouchableOpacity
            key={hotel.id}
            style={[
              styles.hotelCard,
              selectedHotel === hotel.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedHotel(hotel.id)}
          >
            <Image
              source={{ uri: `https://reservapihotel.xoboevents.com${hotel.image}` }}
              style={styles.hotelImage}
            />
            <View style={styles.hotelInfo}>
              <Text style={styles.hotelName}>{hotel.name}</Text>
              <View style={styles.ratingContainer}>
                {renderRatingStars(hotel.rate)}
              </View>
              <Text style={styles.location}>
                <FontAwesome name="map-marker" size={14} color="#666" /> {hotel.address}
              </Text>
              <Text style={styles.description} numberOfLines={2}>
                {hotel.description}
              </Text>
              <View style={styles.servicesContainer}>
                {hotel.services.map((service, index) => (
                  <View key={index} style={styles.serviceTag}>
                    <FontAwesome name={renderServiceIcon(service)} size={12} color="#666" />
                    <Text style={styles.serviceText}> {service}</Text>
                  </View>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[
            styles.nextButton,
            { opacity: selectedHotel ? 1 : 0.5 },
          ]}
          disabled={!selectedHotel}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Continue to Room Selection</Text>
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
  hotelCard: {
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
  hotelImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  hotelInfo: {
    padding: 15,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  serviceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
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