import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const STADIUM_SECTIONS = [
  { id: 'vip', name: 'VIP', price: 150, color: '#FFD700' },
  { id: 'premium', name: 'Premium', price: 100, color: '#4CAF50' },
  { id: 'regular', name: 'Regular', price: 80, color: '#2196F3' },
  { id: 'economy', name: 'Economy', price: 50, color: '#9E9E9E' },
];

const SEATS_PER_ROW = 10;
const ROWS = 15;

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

export default function BuyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  useEffect(() => {
    fetchMatchDetails();
  }, []);

  const fetchMatchDetails = async () => {
    try {
      const response = await fetch(`https://canbilletterie.xoboevents.com/api/matchs/${params.matchId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch match details');
      }
      const data = await response.json();
      setMatch(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
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
        <Text style={styles.loadingText}>Loading match details...</Text>
      </View>
    );
  }

  if (error || !match) {
    return (
      <View style={styles.errorContainer}>
        <FontAwesome name="exclamation-circle" size={50} color="#FF4B4B" />
        <Text style={styles.errorText}>{error || 'Match not found'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchMatchDetails}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleSeat = (row: number, seat: number) => {
    const seatId = `${String.fromCharCode(65 + row)}${seat + 1}`;
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(s => s !== seatId);
      }
      return [...prev, seatId];
    });
  };

  const renderStadiumView = () => {
    return (
      <View style={styles.stadiumContainer}>
        <View style={styles.field}>
          <Text style={styles.fieldText}>PITCH</Text>
        </View>
        <View style={styles.stands}>
          {Array.from({ length: ROWS }).map((_, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {Array.from({ length: SEATS_PER_ROW }).map((_, seatIndex) => {
                const seatId = `${String.fromCharCode(65 + rowIndex)}${seatIndex + 1}`;
                const isSelected = selectedSeats.includes(seatId);
                const sectionColor = STADIUM_SECTIONS.find(s => 
                  rowIndex < 5 ? s.id === 'vip' :
                  rowIndex < 10 ? s.id === 'premium' :
                  rowIndex < 12 ? s.id === 'regular' :
                  s.id === 'economy'
                )?.color || '#9E9E9E';

                return (
                  <TouchableOpacity
                    key={seatIndex}
                    style={[
                      styles.seat,
                      {
                        backgroundColor: isSelected ? '#FF6B6B' : sectionColor,
                        opacity: isSelected ? 1 : 0.7,
                      },
                    ]}
                    onPress={() => toggleSeat(rowIndex, seatIndex)}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderLegend = () => {
    return (
      <View style={styles.legend}>
        {STADIUM_SECTIONS.map(section => (
          <View key={section.id} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: section.color }]} />
            <Text style={styles.legendText}>{section.name} - {section.price.toLocaleString()} FCFA</Text>
          </View>
        ))}
      </View>
    );
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seat) => {
      const row = seat.charCodeAt(0) - 65;
      const section = STADIUM_SECTIONS.find(s => 
        row < 5 ? s.id === 'vip' :
        row < 10 ? s.id === 'premium' :
        row < 12 ? s.id === 'regular' :
        s.id === 'economy'
      );
      return total + (section?.price || 0);
    }, 0);
  };

  const handleConfirmSelection = () => {
    if (selectedSeats.length === 0) {
      Alert.alert('Error', 'Please select at least one seat');
      return;
    }

    router.push({
      pathname: './payment',
      params: {
        matchId: params.matchId,
        selectedSeats: selectedSeats.join(','),
        total: calculateTotal(),
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
        <View style={styles.bannerContent}>
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

          <View style={styles.matchDetails}>
            <View style={styles.detailItem}>
              <FontAwesome name="calendar" size={16} color="#fff" />
              <Text style={styles.detailText}>{formatDate(match.date_match)}</Text>
            </View>
            <View style={styles.detailItem}>
              <FontAwesome name="map-marker" size={16} color="#fff" />
              <Text style={styles.detailText}>{match.Stade.nom.replace(/_/g, ' ')}</Text>
            </View>
            <View style={styles.detailItem}>
              <FontAwesome name="users" size={16} color="#fff" />
              <Text style={styles.detailText}>{match.Groupe.nom_groupe}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {renderStadiumView()}
        {renderLegend()}

        <View style={styles.selectionSummary}>
          <Text style={styles.summaryTitle}>Selected Seats</Text>
          <Text style={styles.selectedSeats}>
            {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'No seats selected'}
          </Text>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>{calculateTotal()} FCFA</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.confirmButton,
            { opacity: selectedSeats.length > 0 ? 1 : 0.5 },
          ]}
          disabled={selectedSeats.length === 0}
          onPress={handleConfirmSelection}
        >
          <Text style={styles.confirmButtonText}>Confirm Selection</Text>
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
  banner: {
    backgroundColor: '#008C45',
    paddingTop: 40,
    paddingBottom: 20,
  },
  bannerContent: {
    padding: 20,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  competition: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
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
    marginBottom: 20,
  },
  teamInfo: {
    flex: 1,
    alignItems: 'center',
  },
  teamFlag: {
    width: 80,
    height: 53,
    marginBottom: 10,
    borderRadius: 4,
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  score: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  vsText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginTop: 5,
  },
  matchDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  stadiumContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  field: {
    width: width * 0.8,
    height: 60,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  fieldText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stands: {
    width: '100%',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  seat: {
    width: 25,
    height: 25,
    margin: 2,
    borderRadius: 5,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    color: '#666',
    fontSize: 14,
  },
  selectionSummary: {
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
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  selectedSeats: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  totalLabel: {
    fontSize: 18,
    color: '#333',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  confirmButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 