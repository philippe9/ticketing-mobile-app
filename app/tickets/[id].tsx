import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  Share,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

type DocumentStatus = 'pending' | 'approved' | 'rejected';

interface DocumentInfo {
  type: string;
  status: DocumentStatus;
  downloadUrl?: string;
}

export default function TicketDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // In a real app, this would be fetched from an API
  const ticketDetails = {
    matchDetails: {
      team1: params.team1,
      team2: params.team2,
      date: params.date,
      time: params.time,
      stadium: params.stadium,
      city: params.city,
      seats: (params.selectedSeats as string).split(','),
      totalPrice: params.totalPrice,
    },
    visaDetails: {
      nationality: params.nationality,
      passportType: params.passportType,
      status: 'approved' as DocumentStatus,
      downloadUrl: 'https://example.com/visa.pdf',
    },
    hotelDetails: {
      hotelName: 'Luxury Hotel Morocco',
      checkIn: params.hotelArrivalDate,
      checkOut: params.hotelDepartureDate,
      roomType: params.roomPreference,
      guests: params.numberOfGuests,
      status: 'approved' as DocumentStatus,
      downloadUrl: 'https://example.com/hotel.pdf',
    },
    flightDetails: {
      airline: 'Royal Air Maroc',
      departureCity: params.departureCity,
      departureDate: params.departureDate,
      returnDate: params.returnDate,
      cabinClass: params.cabinClass,
      passengers: {
        adults: params.numAdults,
        children: params.numChildren,
        infants: params.numInfants,
      },
      status: 'approved' as DocumentStatus,
      downloadUrl: 'https://example.com/flight.pdf',
    },
  };

  const handleDownload = async (documentType: string, url: string) => {
    try {
      // In a real app, this would download from your server
      const filename = `${documentType.toLowerCase()}_${Date.now()}.pdf`;
      const fileUri = `${FileSystem.documentDirectory}${filename}`;

      // Simulate download
      Alert.alert(
        'Download Started',
        `Downloading ${documentType}...`,
        [
          {
            text: 'OK',
            onPress: async () => {
              // Simulate successful download
              if (Platform.OS === 'ios') {
                await Sharing.shareAsync(fileUri);
              } else {
                // For Android, you might want to use a different approach
                // like react-native-fs to save to Downloads folder
                Share.share({
                  title: filename,
                  url: fileUri,
                });
              }
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to download document');
    }
  };

  const StatusBadge = ({ status }: { status: DocumentStatus }) => (
    <View
      style={[
        styles.statusBadge,
        {
          backgroundColor:
            status === 'approved'
              ? '#4CAF50'
              : status === 'rejected'
              ? '#f44336'
              : '#ff9800',
        },
      ]}
    >
      <Text style={styles.statusText}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Text>
    </View>
  );

  const DocumentSection = ({
    title,
    info,
    status,
    downloadUrl,
  }: {
    title: string;
    info: React.ReactNode;
    status: DocumentStatus;
    downloadUrl?: string;
  }) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <StatusBadge status={status} />
      </View>
      {info}
      {downloadUrl && status === 'approved' && (
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={() => handleDownload(title, downloadUrl)}
        >
          <FontAwesome name="download" size={20} color="#fff" />
          <Text style={styles.downloadButtonText}>Download {title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="ticket" size={40} color="#fff" />
        <Text style={styles.headerTitle}>Ticket Details</Text>
        <Text style={styles.headerSubtitle}>AFCON 2025</Text>
      </View>

      <View style={styles.content}>
        <DocumentSection
          title="Match Ticket"
          status="approved"
          downloadUrl="https://example.com/ticket.pdf"
          info={
            <View>
              <Text style={styles.matchTitle}>
                {ticketDetails.matchDetails.team1} vs {ticketDetails.matchDetails.team2}
              </Text>
              <Text style={styles.infoText}>
                Date: {new Date(ticketDetails.matchDetails.date as string).toLocaleDateString()}
              </Text>
              <Text style={styles.infoText}>Time: {ticketDetails.matchDetails.time}</Text>
              <Text style={styles.infoText}>
                Venue: {ticketDetails.matchDetails.stadium}, {ticketDetails.matchDetails.city}
              </Text>
              <Text style={styles.infoText}>
                Seats: {ticketDetails.matchDetails.seats.join(', ')}
              </Text>
              <Text style={styles.infoText}>
                Total Price: ${ticketDetails.matchDetails.totalPrice}
              </Text>
            </View>
          }
        />

        <DocumentSection
          title="E-Visa"
          status={ticketDetails.visaDetails.status}
          downloadUrl={ticketDetails.visaDetails.downloadUrl}
          info={
            <View>
              <Text style={styles.infoText}>
                Nationality: {ticketDetails.visaDetails.nationality}
              </Text>
              <Text style={styles.infoText}>
                Passport Type: {ticketDetails.visaDetails.passportType}
              </Text>
            </View>
          }
        />

        <DocumentSection
          title="Hotel Booking"
          status={ticketDetails.hotelDetails.status}
          downloadUrl={ticketDetails.hotelDetails.downloadUrl}
          info={
            <View>
              <Text style={styles.infoText}>
                Hotel: {ticketDetails.hotelDetails.hotelName}
              </Text>
              <Text style={styles.infoText}>
                Check-in: {new Date(ticketDetails.hotelDetails.checkIn as string).toLocaleDateString()}
              </Text>
              <Text style={styles.infoText}>
                Check-out: {new Date(ticketDetails.hotelDetails.checkOut as string).toLocaleDateString()}
              </Text>
              <Text style={styles.infoText}>
                Room Type: {ticketDetails.hotelDetails.roomType}
              </Text>
              <Text style={styles.infoText}>
                Guests: {ticketDetails.hotelDetails.guests}
              </Text>
            </View>
          }
        />

        <DocumentSection
          title="Flight Booking"
          status={ticketDetails.flightDetails.status}
          downloadUrl={ticketDetails.flightDetails.downloadUrl}
          info={
            <View>
              <Text style={styles.infoText}>
                Airline: {ticketDetails.flightDetails.airline}
              </Text>
              <Text style={styles.infoText}>
                From: {ticketDetails.flightDetails.departureCity}
              </Text>
              <Text style={styles.infoText}>
                Departure: {new Date(ticketDetails.flightDetails.departureDate as string).toLocaleDateString()}
              </Text>
              <Text style={styles.infoText}>
                Return: {new Date(ticketDetails.flightDetails.returnDate as string).toLocaleDateString()}
              </Text>
              <Text style={styles.infoText}>
                Class: {ticketDetails.flightDetails.cabinClass}
              </Text>
              <Text style={styles.infoText}>
                Passengers: {ticketDetails.flightDetails.passengers.adults} Adult(s),{' '}
                {ticketDetails.flightDetails.passengers.children} Child(ren),{' '}
                {ticketDetails.flightDetails.passengers.infants} Infant(s)
              </Text>
            </View>
          }
        />
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
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  matchTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#008C45',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  downloadButton: {
    backgroundColor: '#008C45',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 