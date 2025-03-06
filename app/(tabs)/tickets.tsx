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

const MY_TICKETS = [
  {
    id: '1',
    match: 'Nigeria vs Egypt',
    date: '2024-01-14',
    time: '20:00',
    stadium: 'Alassane Ouattara Stadium',
    seats: ['A12', 'A13'],
    category: 'VIP',
    price: 150,
    status: 'active',
  },
  {
    id: '2',
    match: 'Senegal vs Cameroon',
    date: '2024-01-15',
    time: '17:00',
    stadium: 'Charles Konan Banny Stadium',
    seats: ['B5', 'B6'],
    category: 'Regular',
    price: 80,
    status: 'active',
  },
];

export default function TicketsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tickets</Text>
      </View>

      {MY_TICKETS.length === 0 ? (
        <View style={styles.emptyState}>
          <FontAwesome name="ticket" size={64} color="#ccc" />
          <Text style={styles.emptyStateText}>No tickets purchased yet</Text>
          <Link href="/buy" asChild>
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
              onPress={() => {}}
            >
              <View style={styles.ticketHeader}>
                <Text style={styles.matchTitle}>{ticket.match}</Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: ticket.status === 'active' ? '#4CAF50' : '#FF6B6B' }
                ]}>
                  <Text style={styles.statusText}>
                    {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                  </Text>
                </View>
              </View>

              <View style={styles.ticketDetails}>
                <View style={styles.detailRow}>
                  <FontAwesome name="calendar" size={16} color="#666" />
                  <Text style={styles.detailText}>
                    {new Date(ticket.date).toLocaleDateString()} {ticket.time}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <FontAwesome name="map-marker" size={16} color="#666" />
                  <Text style={styles.detailText}>{ticket.stadium}</Text>
                </View>
                <View style={styles.detailRow}>
                  <FontAwesome name="car" size={16} color="#666" />
                  <Text style={styles.detailText}>Seats: {ticket.seats.join(', ')}</Text>
                </View>
              </View>

              <View style={styles.ticketFooter}>
                <View style={styles.categoryContainer}>
                  <Text style={styles.categoryText}>{ticket.category}</Text>
                </View>
                <Text style={styles.priceText}>${ticket.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
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
  emptyState: {
    flex: 1,
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
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ticketsContainer: {
    padding: 20,
  },
  ticketCard: {
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
  ticketDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    marginLeft: 10,
    color: '#666',
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  categoryContainer: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  categoryText: {
    color: '#666',
    fontSize: 12,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
}); 