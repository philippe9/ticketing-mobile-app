import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function HotelReservationIndex() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const handleStartBooking = () => {
    router.push({
      pathname: '/hotel-reservation/hotel-selection',
      params: params,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hotel Booking</Text>
        <Text style={styles.headerSubtitle}>Find your perfect stay in Morocco</Text>
      </View>

      <View style={styles.content}>
        <Image
          source={require('../../assets/images/morocco-background.jpg')}
          style={styles.heroImage}
        />

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Why Book With Us?</Text>
          
          <View style={styles.featureRow}>
            <FontAwesome name="check-circle" size={24} color="#008C45" />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Best Locations</Text>
              <Text style={styles.featureDescription}>
                Premium hotels near match venues
              </Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <FontAwesome name="star" size={24} color="#008C45" />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Quality Assured</Text>
              <Text style={styles.featureDescription}>
                Handpicked luxury accommodations
              </Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <FontAwesome name="shield" size={24} color="#008C45" />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Secure Booking</Text>
              <Text style={styles.featureDescription}>
                Safe and easy reservation process
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartBooking}
        >
          <Text style={styles.startButtonText}>Start Booking</Text>
          <FontAwesome name="arrow-right" size={20} color="#fff" />
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
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureText: {
    marginLeft: 15,
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
  },
  startButton: {
    backgroundColor: '#008C45',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
}); 