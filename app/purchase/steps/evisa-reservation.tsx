import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function VisaServicesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Visa Services</Text>
        <Text style={styles.subtitle}>Apply for your E-Visa</Text>
      </View>

      <View style={styles.content}>
        <Link href="./request" asChild>
          <TouchableOpacity style={styles.card}>
            <FontAwesome name="id-card" size={24} color="#FF6B6B" />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>E-Visa Request</Text>
              <Text style={styles.cardDescription}>
                Submit your E-Visa application for the tournament
              </Text>
            </View>
            <FontAwesome name="chevron-right" size={20} color="#666" />
          </TouchableOpacity>
        </Link>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Important Information</Text>
          <View style={styles.infoItem}>
            <FontAwesome name="clock-o" size={20} color="#666" style={styles.infoIcon} />
            <Text style={styles.infoText}>Processing time: 3-5 business days</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome name="calendar" size={20} color="#666" style={styles.infoIcon} />
            <Text style={styles.infoText}>Validity: Duration of the tournament</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome name="file-text" size={20} color="#666" style={styles.infoIcon} />
            <Text style={styles.infoText}>Required: Valid passport with 6 months validity</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome name="camera" size={20} color="#666" style={styles.infoIcon} />
            <Text style={styles.infoText}>Recent passport-size photograph needed</Text>
          </View>
        </View>

        <View style={styles.noteSection}>
          <Text style={styles.noteTitle}>Note</Text>
          <Text style={styles.noteText}>
            Please ensure all information provided in your application is accurate and matches your passport details. 
            Incomplete or incorrect applications may result in processing delays.
          </Text>
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
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoIcon: {
    width: 30,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
  noteSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  noteText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
}); 