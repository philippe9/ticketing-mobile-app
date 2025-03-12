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
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

interface Match {
  id_match: number;
  nom_match: string;
  equipeA: {
    nom_equipe: string;
    drapeau: string;
  };
  equipeB: {
    nom_equipe: string;
    drapeau: string;
  };
  date_match: string;
  statut: string;
  Stade: {
    nom: string;
  };
  Groupe: {
    nom_groupe: string;
  };
}

export default function PurchaseScreen() {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://canbilletterie.xoboevents.com/api/matchs/');
      if (!response.ok) {
        throw new Error('Failed to fetch matches');
      }
      const data = await response.json();
      setMatches(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleMatchSelect = (match: Match) => {
    router.push({
      pathname: '/matches/buy',
      params: {
        matchId: match.id_match,
        team1: match.equipeA.nom_equipe,
        team2: match.equipeB.nom_equipe,
        date: match.date_match,
        status: match.statut,
        stadium: match.Stade.nom,
      },
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#008C45" />
          <Text style={styles.loadingText}>Loading matches...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <FontAwesome name="exclamation-circle" size={50} color="#FF4B4B" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchMatches}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Available Matches</Text>
          <Text style={styles.headerSubtitle}>AFCON 2025 - Morocco</Text>
        </View>

        <View style={styles.content}>
          {matches.map((match) => (
            <TouchableOpacity 
              key={match.id_match} 
              style={styles.matchCard}
              onPress={() => handleMatchSelect(match)}
            >
              <View style={styles.matchHeader}>
                <Text style={styles.groupText}>{match.Groupe.nom_groupe}</Text>
                <View style={styles.statusContainer}>
                  <FontAwesome name="circle" size={12} color={match.statut === 'À venir' ? '#660101' : '#666'} />
                  <Text style={styles.statusText}>{match.statut}</Text>
                </View>
              </View>

              <View style={styles.teamsContainer}>
                <View style={styles.team}>
                  <Image 
                    source={{ uri: `https://canbilletterie.xoboevents.com${match.equipeA.drapeau}` }}
                    style={styles.teamFlag}
                  />
                  <Text style={styles.teamName}>{match.equipeA.nom_equipe}</Text>
                </View>
                <View style={styles.vsContainer}>
                  <Text style={styles.vsText}>VS</Text>
                </View>
                <View style={styles.team}>
                  <Image 
                    source={{ uri: `https://canbilletterie.xoboevents.com${match.equipeB.drapeau}` }}
                    style={styles.teamFlag}
                  />
                  <Text style={styles.teamName}>{match.equipeB.nom_equipe}</Text>
                </View>
              </View>

              <View style={styles.matchFooter}>
                <View style={styles.dateTimeContainer}>
                  <FontAwesome name="calendar" size={14} color="#666" style={styles.icon} />
                  <Text style={styles.dateTimeText}>
                    {new Date(match.date_match).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.locationContainer}>
                  <FontAwesome name="map-marker" size={14} color="#666" style={styles.icon} />
                  <Text style={styles.locationText}>
                    {match.Stade.nom}
                  </Text>
                </View>
              </View>

              <View style={styles.buyContainer}>
                <Text style={styles.buyText}>Select Seats</Text>
                <FontAwesome name="chevron-right" size={14} color="#660101" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#660101',
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
    color: '#660101',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginLeft: 5,
    color: '#666',
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
    color: '#660101',
    fontWeight: '600',
    fontSize: 16,
  },
  teamFlag: {
    width: 40,
    height: 40,
    marginBottom: 8,
    borderRadius: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#660101',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 