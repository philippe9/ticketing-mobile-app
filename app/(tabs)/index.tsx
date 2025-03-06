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
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/afcon-logo.png')}
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>AFCON 2024</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Matches</Text>
        {UPCOMING_MATCHES.map((match) => (
          <TouchableOpacity
            key={match.id}
            style={styles.matchCard}
            onPress={() => {}}
          >
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
            <View style={styles.stadiumContainer}>
              <FontAwesome name="map-marker" size={14} color="#666" />
              <Text style={styles.stadiumText}>{match.stadium}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <Link href="/(tabs)/buy" asChild>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome name="ticket" size={24} color="#FF6B6B" />
              <Text style={styles.actionText}>Buy Tickets</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/(tabs)/tickets" asChild>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome name="list" size={24} color="#FF6B6B" />
              <Text style={styles.actionText}>My Tickets</Text>
            </TouchableOpacity>
          </Link>
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
  header: {
    backgroundColor: '#FF6B6B',
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  matchCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
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
    marginBottom: 10,
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
    marginBottom: 10,
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
  stadiumContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  stadiumText: {
    color: '#666',
    marginLeft: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '45%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionText: {
    marginTop: 10,
    color: '#333',
    fontWeight: 'bold',
  },
}); 