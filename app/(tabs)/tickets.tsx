import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const MY_TICKETS = [
  {
    id: '1',
    matchId: '1',
    team1: 'Morocco',
    team2: 'Ghana',
    date: '2025-01-12',
    time: '20:00',
    stadium: 'Mohammed V Stadium',
    city: 'Casablanca',
    selectedSeats: ['A12', 'A13'],
    totalPrice: 300,
    nationality: 'Nigerian',
    passportType: 'Ordinary Passport',
    hotelArrivalDate: '2025-01-10',
    hotelDepartureDate: '2025-01-14',
    roomPreference: 'Double',
    numberOfGuests: '2',
    departureCity: 'Lagos (LOS)',
    departureDate: '2025-01-10',
    returnDate: '2025-01-14',
    cabinClass: 'Economy',
    numAdults: '2',
    numChildren: '0',
    numInfants: '0',
    status: 'active',
  },
  {
    id: '2',
    matchId: '2',
    team1: 'Egypt',
    team2: 'Nigeria',
    date: '2025-01-13',
    time: '17:00',
    stadium: 'Ibn Batouta Stadium',
    city: 'Tangier',
    selectedSeats: ['B5', 'B6'],
    totalPrice: 200,
    nationality: 'Egyptian',
    passportType: 'Ordinary Passport',
    hotelArrivalDate: '2025-01-12',
    hotelDepartureDate: '2025-01-15',
    roomPreference: 'Twin',
    numberOfGuests: '2',
    departureCity: 'Cairo (CAI)',
    departureDate: '2025-01-12',
    returnDate: '2025-01-15',
    cabinClass: 'Economy',
    numAdults: '2',
    numChildren: '0',
    numInfants: '0',
    status: 'active',
  },
];

export default function TicketsScreen() {
  const router = useRouter();

  const handleTicketPress = (ticket: typeof MY_TICKETS[0]) => {
    const { id, ...ticketData } = ticket;
    router.push({
      pathname: '../tickets/[id]',
      params: {
        id,
        ...ticketData,
        selectedSeats: ticket.selectedSeats.join(','),
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tickets</Text>
      </View>

      <View style={styles.content}>
        {MY_TICKETS.length === 0 ? (
          <View style={styles.emptyState}>
            <FontAwesome name="ticket" size={64} color="#ccc" />
            <Text style={styles.emptyStateText}>No tickets purchased yet</Text>
            <Link href="/purchase" asChild>
              <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyButtonText}>Buy Tickets</Text>
              </TouchableOpacity>
            </Link>
          </View>
        ) : (
          <View style={styles.ticketsContainer}>
            {MY_TICKETS.map((ticket) => (
              <TouchableOpacity
                key={ticket.id}
                style={styles.ticketCard}
                onPress={() => handleTicketPress(ticket)}
              >
                <View style={styles.ticketHeader}>
                  <Text style={styles.matchTitle}>{ticket.team1} vs {ticket.team2}</Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: ticket.status === 'active' ? '#4CAF50' : '#FF6B6B' }
                  ]}>
                    <Text style={styles.statusText}>
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </Text>
                  </View>
                </View>

                <View style={styles.ticketInfo}>
                  <View style={styles.infoRow}>
                    <FontAwesome name="calendar" size={16} color="#666" />
                    <Text style={styles.infoText}>
                      {new Date(ticket.date).toLocaleDateString()} at {ticket.time}
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <FontAwesome name="map-marker" size={16} color="#666" />
                    <Text style={styles.infoText}>
                      {ticket.stadium}, {ticket.city}
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <FontAwesome name="ticket" size={16} color="#666" />
                    <Text style={styles.infoText}>
                      Seats: {ticket.selectedSeats.join(', ')}
                    </Text>
                  </View>
                </View>

                <View style={styles.ticketFooter}>
                  <Text style={styles.priceText}>${ticket.totalPrice}</Text>
                  <Text style={styles.viewDetailsText}>View Details</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
  content: {
    padding: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    marginTop: 20,
    marginBottom: 30,
  },
  buyButton: {
    backgroundColor: '#008C45',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ticketsContainer: {
    gap: 20,
  },
  ticketCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  matchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  ticketInfo: {
    gap: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#008C45',
  },
  viewDetailsText: {
    fontSize: 14,
    color: '#008C45',
    fontWeight: '600',
  },
}); 