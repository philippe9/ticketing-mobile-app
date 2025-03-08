import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const MATCHES = [
  {
    id: '1',
    team1: 'Morocco',
    team2: 'Ghana',
    date: '2025-01-12',
    time: '20:00',
    stadium: 'Mohammed V Stadium',
    city: 'Casablanca',
    group: 'Group A',
    availableSeats: 245,
  },
  {
    id: '2',
    team1: 'Egypt',
    team2: 'Nigeria',
    date: '2025-01-13',
    time: '17:00',
    stadium: 'Ibn Batouta Stadium',
    city: 'Tangier',
    group: 'Group B',
    availableSeats: 178,
  },
  {
    id: '3',
    team1: 'Senegal',
    team2: 'Algeria',
    date: '2025-01-14',
    time: '20:00',
    stadium: 'Moulay Abdellah Stadium',
    city: 'Rabat',
    group: 'Group C',
    availableSeats: 320,
  },
];

export default function PurchaseScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Available Matches</Text>
        <Text style={styles.headerSubtitle}>AFCON 2025 - Morocco</Text>
      </View>

      <View style={styles.content}>
        {MATCHES.map((match) => (
          <Link 
            key={match.id} 
            href={`../purchase/steps/seat-selection?matchId=${match.id}&team1=${match.team1}&team2=${match.team2}&date=${match.date}&time=${match.time}&stadium=${match.stadium}&city=${match.city}`} 
            asChild
          >
            <TouchableOpacity style={styles.matchCard}>
              <View style={styles.matchHeader}>
                <Text style={styles.groupText}>{match.group}</Text>
                <View style={styles.seatsContainer}>
                  <FontAwesome name="ticket" size={14} color="#008C45" />
                  <Text style={styles.seatsText}>{match.availableSeats} seats left</Text>
                </View>
              </View>

              <View style={styles.teamsContainer}>
                <View style={styles.team}>
                  <Text style={styles.teamName}>{match.team1}</Text>
                </View>
                <View style={styles.vsContainer}>
                  <Text style={styles.vsText}>VS</Text>
                </View>
                <View style={styles.team}>
                  <Text style={styles.teamName}>{match.team2}</Text>
                </View>
              </View>

              <View style={styles.matchFooter}>
                <View style={styles.dateTimeContainer}>
                  <FontAwesome name="calendar" size={14} color="#666" style={styles.icon} />
                  <Text style={styles.dateTimeText}>
                    {new Date(match.date).toLocaleDateString()} {match.time}
                  </Text>
                </View>
                <View style={styles.locationContainer}>
                  <FontAwesome name="map-marker" size={14} color="#666" style={styles.icon} />
                  <Text style={styles.locationText}>
                    {match.stadium}, {match.city}
                  </Text>
                </View>
              </View>

              <View style={styles.buyContainer}>
                <Text style={styles.buyText}>Select Seats</Text>
                <FontAwesome name="chevron-right" size={14} color="#008C45" />
              </View>
            </TouchableOpacity>
          </Link>
        ))}
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
    opacity: 0.9,
    marginTop: 5,
  },
  content: {
    padding: 15,
  },
  matchCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  groupText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#008C45',
  },
  seatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seatsText: {
    marginLeft: 5,
    color: '#008C45',
    fontSize: 14,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  team: {
    flex: 1,
    alignItems: 'center',
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  vsContainer: {
    paddingHorizontal: 15,
  },
  vsText: {
    color: '#666',
    fontWeight: '500',
  },
  matchFooter: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    marginTop: 5,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  dateTimeText: {
    color: '#666',
    fontSize: 14,
  },
  locationText: {
    color: '#666',
    fontSize: 14,
  },
  buyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  buyText: {
    color: '#008C45',
    fontWeight: '600',
    fontSize: 16,
  },
}); 