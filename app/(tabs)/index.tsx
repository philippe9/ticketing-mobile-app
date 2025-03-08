import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const UPCOMING_MATCHES = [
  {
    id: '1',
    team1: 'Nigeria',
    team2: 'Egypt',
    date: '2024-01-14',
    time: '20:00',
    stadium: 'Alassane Ouattara Stadium',
    group: 'Group A',
  },
  {
    id: '2',
    team1: 'Senegal',
    team2: 'Cameroon',
    date: '2024-01-15',
    time: '17:00',
    stadium: 'Charles Konan Banny Stadium',
    group: 'Group C',
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/morocco-background.jpg')}
        style={styles.hero}
      >
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>AFCON 2025</Text>
          <Text style={styles.heroSubtitle}>Morocco</Text>
        </View>
      </ImageBackground>

      <View style={styles.content}>
      <React.Fragment>
        <Link href="../purchase" asChild>
          <TouchableOpacity style={styles.card}>
            <FontAwesome name="ticket" size={24} color="#008C45" />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Buy Match Tickets</Text>
              <Text style={styles.cardDescription}>
                Select your matches and book your complete experience
              </Text>
            </View>
            <FontAwesome name="chevron-right" size={20} color="#666" />
          </TouchableOpacity>
        </Link>
        </React.Fragment>
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Tournament Information</Text>
          <View style={styles.infoItem}>
            <FontAwesome name="calendar" size={20} color="#666" style={styles.infoIcon} />
            <Text style={styles.infoText}>January - February 2025</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome name="map-marker" size={20} color="#666" style={styles.infoIcon} />
            <Text style={styles.infoText}>Multiple Cities in Morocco</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome name="trophy" size={20} color="#666" style={styles.infoIcon} />
            <Text style={styles.infoText}>Africa Cup of Nations 2025</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome name="flag" size={20} color="#666" style={styles.infoIcon} />
            <Text style={styles.infoText}>24 National Teams</Text>
          </View>
        </View>

        <View style={styles.noteSection}>
          <Text style={styles.noteTitle}>Ticket Purchase Process</Text>
          <Text style={styles.noteText}>
            The ticket purchase includes match selection, seat reservation, visa eligibility check, 
            and optional hotel booking - all in one seamless process.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  hero: {
    height: 200,
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 24,
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
  cardContent: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoIcon: {
    width: 30,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
  noteSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  noteText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
}); 