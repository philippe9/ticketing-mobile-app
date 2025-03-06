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
    team1: 'Nigeria',
    team2: 'Egypt',
    date: '2024-01-14',
    time: '20:00',
    stadium: 'Alassane Ouattara Stadium',
    group: 'Group A',
    priceRange: '50 - 150',
    availableTickets: 1200,
  },
  {
    id: '2',
    team1: 'Senegal',
    team2: 'Cameroon',
    date: '2024-01-15',
    time: '17:00',
    stadium: 'Charles Konan Banny Stadium',
    group: 'Group C',
    priceRange: '50 - 150',
    availableTickets: 800,
  },
  {
    id: '3',
    team1: 'Morocco',
    team2: 'Ghana',
    date: '2024-01-16',
    time: '14:00',
    stadium: 'Felix Houphouet Boigny Stadium',
    group: 'Group B',
    priceRange: '50 - 150',
    availableTickets: 1500,
  },
  {
    id: '4',
    team1: 'Algeria',
    team2: 'Tunisia',
    date: '2024-01-17',
    time: '20:00',
    stadium: 'Amadou Gon Coulibaly Stadium',
    group: 'Group D',
    priceRange: '50 - 150',
    availableTickets: 900,
  },
];

export default function MatchesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Select Match</Text>
        <Text style={styles.headerSubtitle}>Choose a match to buy tickets</Text>
      </View>

      <View style={styles.matchesContainer}>
        {MATCHES.map((match) => (
          <Link
            key={match.id}
            href={{
              pathname: '/(tabs)/buy',
              params: {
                matchId: match.id,
                team1: match.team1,
                team2: match.team2,
                date: match.date,
                time: match.time,
                stadium: match.stadium,
                group: match.group,
              },
            }}
            asChild
          >
            <TouchableOpacity style={styles.matchCard}>
              <View style={styles.matchHeader}>
                <Text style={styles.groupText}>{match.group}</Text>
                <Text style={styles.dateText}>
                  {new Date(match.date).toLocaleDateString()} {match.time}
                </Text>
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
                <View style={styles.stadiumContainer}>
                  <FontAwesome name="map-marker" size={14} color="#666" />
                  <Text style={styles.stadiumText}>{match.stadium}</Text>
                </View>
                <View style={styles.ticketInfo}>
                  <View style={styles.priceContainer}>
                    <FontAwesome name="ticket" size={14} color="#FF6B6B" />
                    <Text style={styles.priceText}>${match.priceRange}</Text>
                  </View>
                  <View style={styles.availabilityContainer}>
                    <FontAwesome name="check-circle" size={14} color="#4CAF50" />
                    <Text style={styles.availabilityText}>
                      {match.availableTickets} tickets available
                    </Text>
                  </View>
                </View>
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
    backgroundColor: '#FF6B6B',
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
  matchesContainer: {
    padding: 20,
  },
  matchCard: {
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
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  groupText: {
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  dateText: {
    color: '#666',
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
    fontWeight: 'bold',
  },
  matchFooter: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  stadiumContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stadiumText: {
    color: '#666',
    marginLeft: 5,
  },
  ticketInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    color: '#FF6B6B',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityText: {
    color: '#4CAF50',
    marginLeft: 5,
  },
}); 