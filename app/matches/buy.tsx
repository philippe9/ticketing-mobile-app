import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';

const { width } = Dimensions.get('window');

const STADIUM_SECTIONS = [
  { id: 'vip', name: 'VIP', price: 150, color: '#FFD700' },
  { id: 'premium', name: 'Premium', price: 100, color: '#4CAF50' },
  { id: 'regular', name: 'Regular', price: 80, color: '#2196F3' },
  { id: 'economy', name: 'Economy', price: 50, color: '#9E9E9E' },
];

const SEATS_PER_ROW = 10;
const ROWS = 15;

export default function BuyScreen() {
  const params = useLocalSearchParams();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  // If no match is selected, redirect to matches screen
  if (!params.matchId) {
    router.replace('/matches');
    return null;
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
            <Text style={styles.legendText}>{section.name} - ${section.price}</Text>
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

    // TODO: Implement ticket purchase logic
    Alert.alert(
      'Success',
      'Tickets purchased successfully!',
      [
        {
          text: 'OK',
          onPress: () => router.replace('/(tabs)/tickets'),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Select Seats</Text>
        <Text style={styles.headerSubtitle}>
          {params.team1} vs {params.team2}
        </Text>
        <Text style={styles.matchInfo}>
          {new Date(params.date as string).toLocaleDateString()} {params.time}
        </Text>
        <Text style={styles.stadiumInfo}>{params.stadium}</Text>
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
            <Text style={styles.totalAmount}>${calculateTotal()}</Text>
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
    fontSize: 18,
    color: '#fff',
    marginTop: 5,
  },
  matchInfo: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginTop: 5,
  },
  stadiumInfo: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginTop: 5,
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