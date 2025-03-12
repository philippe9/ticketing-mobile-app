import React, { useEffect, useState } from 'react';
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
  date_match: string;
  statut: string;
  score: string;
  Competition: {
    nom_competition: string;
    annee: number;
  };
  Groupe: {
    nom_groupe: string;
  };
  equipeA: {
    nom_equipe: string;
    drapeau: string;
  };
  equipeB: {
    nom_equipe: string;
    drapeau: string;
  };
  Stade: {
    nom: string;
    photo: string;
  };
}

export default function MatchesScreen() {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
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

  const handleMatchPress = (matchId: number) => {
    router.push({
      pathname: '/matches/buy',
      params: { matchId },
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terminé':
        return '#FF4B4B';
      case 'À venir':
        return '#4CAF50';
      default:
        return '#FFA500';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#008C45" />
        <Text style={styles.loadingText}>Loading matches...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <FontAwesome name="exclamation-circle" size={50} color="#FF4B4B" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchMatches}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CAN 2025 Matches</Text>
        <Text style={styles.headerSubtitle}>Book your tickets now</Text>
      </View>

      <View style={styles.content}>
        {matches.map((match) => (
          <TouchableOpacity
            key={match.id_match}
            style={styles.matchCard}
            onPress={() => handleMatchPress(match.id_match)}
          >
            <View style={styles.matchHeader}>
              <Text style={styles.competition}>
                {match.Competition.nom_competition} {match.Competition.annee}
              </Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(match.statut) }]}>
                <Text style={styles.statusText}>{match.statut}</Text>
              </View>
            </View>

            <View style={styles.teamsContainer}>
              <View style={styles.teamInfo}>
                <Image
                  source={{ uri: `https://canbilletterie.xoboevents.com${match.equipeA.drapeau}` }}
                  style={styles.teamFlag}
                />
                <Text style={styles.teamName}>{match.equipeA.nom_equipe}</Text>
              </View>

              <View style={styles.scoreContainer}>
                <Text style={styles.score}>{match.score}</Text>
                <Text style={styles.vsText}>VS</Text>
              </View>

              <View style={styles.teamInfo}>
                <Image
                  source={{ uri: `https://canbilletterie.xoboevents.com${match.equipeB.drapeau}` }}
                  style={styles.teamFlag}
                />
                <Text style={styles.teamName}>{match.equipeB.nom_equipe}</Text>
              </View>
            </View>

            <View style={styles.matchFooter}>
              <View style={styles.matchDetails}>
                <FontAwesome name="calendar" size={14} color="#666" />
                <Text style={styles.detailText}>{formatDate(match.date_match)}</Text>
              </View>

              <View style={styles.matchDetails}>
                <FontAwesome name="users" size={14} color="#666" />
                <Text style={styles.detailText}>{match.Groupe.nom_groupe}</Text>
              </View>
            </View>
            <View style={styles.matchFooter}>
              <View style={styles.matchDetails}>
                <FontAwesome name="map-marker" size={14} color="#666" />
                <Text style={styles.detailText}>{match.Stade.nom.replace(/_/g, ' ')}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.buyButton,
                { opacity: match.statut === 'Terminé' ? 0.5 : 1 },
              ]}
              disabled={match.statut === 'Terminé'}
              onPress={() => handleMatchPress(match.id_match)}
            >
              <Text style={styles.buyButtonText}>
                {match.statut === 'Terminé' ? 'Match Ended' : 'Buy Tickets'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
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
  matchCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    padding: 15,
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
    alignItems: 'center',
    marginBottom: 15,
  },
  competition: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  teamInfo: {
    flex: 1,
    alignItems: 'center',
  },
  teamFlag: {
    width: 60,
    height: 40,
    marginBottom: 8,
    borderRadius: 4,
  },
  teamName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  vsText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  matchFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  matchDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#666',
  },
  buyButton: {
    backgroundColor: '#008C45',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 