import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const TOURNAMENT_INFO = {
  dates: '13 January - 11 February 2025',
  venues: [
    'Casablanca',
    'Rabat',
    'Marrakech',
    'Agadir',
    'Fez',
    'Tangier',
  ],
  teams: 24,
  matches: 52,
  groups: 6,
};

const HIGHLIGHTS = [
  {
    title: 'Opening Match',
    date: '13 January 2025',
    venue: 'Grand Stade de Casablanca',
    icon: 'futbol-o',
  },
  {
    title: 'Final Match',
    date: '11 February 2025',
    venue: 'Grand Stade de Casablanca',
    icon: 'trophy',
  },
];

const BLOG_POSTS = [
  {
    id: 1,
    title: "AFCON 2025: Morocco's Preparations in Full Swing",
    excerpt: "Discover how Morocco is getting ready to host Africa's biggest football event.",
    date: "10 Mar 2024",
    image: { uri: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Top Players to Watch in AFCON 2025",
    excerpt: "A look at the stars who will light up the tournament in Morocco.",
    date: "8 Mar 2024",
    image: { uri: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
    readTime: "4 min read"
  }
];

const LIVE_CONTENT = [
  {
    id: 1,
    type: 'podcast',
    title: 'AFCON Preview Show',
    host: 'African Football Weekly',
    duration: '45 mins',
    date: 'Every Thursday',
    icon: 'microphone',
  },
  {
    id: 2,
    type: 'stream',
    title: 'Stadium Tour Live',
    description: 'Virtual tour of Grand Stade de Casablanca',
    time: 'March 15, 2024 - 15:00 GMT',
    icon: 'play-circle',
  },
  {
    id: 3,
    type: 'podcast',  
    title: 'Road to AFCON',
    host: 'CAF Official Podcast',
    duration: '30 mins',
    date: 'Every Monday',
    icon: 'microphone',
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/maroc.jpg')}
        style={styles.hero}
        resizeMode="cover"
      >
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>AFCON 2025</Text>
          <Text style={styles.heroSubtitle}>Morocco</Text>
          <Text style={styles.heroDate}>{TOURNAMENT_INFO.dates}</Text>
        </View>
      </ImageBackground>

      <View style={styles.welcomeSection}>
        <Image 
          source={require('../../assets/images/afcon-logo.png')}
          style={styles.afconLogo}
        />
        <View style={styles.welcomeContent}>
          <Text style={styles.welcomeTitle}>Welcome to AFCON 2025</Text>
          <Text style={styles.welcomeText}>
            Join us for Africa's biggest football celebration in Morocco. Experience the passion, drama, and excitement of the continent's premier football tournament.
          </Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Link href="../matches" asChild>
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome name="ticket" size={24} color="#fff" />
            <Text style={styles.actionText}>Buy Tickets</Text>
          </TouchableOpacity>
        </Link>
        <Link href="../hotel-reservation" asChild>
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome name="hotel" size={24} color="#fff" />
            <Text style={styles.actionText}>Book Hotel</Text>
          </TouchableOpacity>
        </Link>
        <Link href="../e-visa" asChild>
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome name="file-text-o" size={24} color="#fff" />
            <Text style={styles.actionText}>E-Visa</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.content}>
        <View style={styles.tournamentOverview}>
          <Text style={styles.sectionTitle}>Tournament Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <FontAwesome name="flag" size={24} color="#660101" />
              <Text style={styles.statNumber}>{TOURNAMENT_INFO.teams}</Text>
              <Text style={styles.statLabel}>Teams</Text>
            </View>
            <View style={styles.statItem}>
              <FontAwesome name="futbol-o" size={24} color="#660101" />
              <Text style={styles.statNumber}>{TOURNAMENT_INFO.matches}</Text>
              <Text style={styles.statLabel}>Matches</Text>
            </View>
            <View style={styles.statItem}>
              <FontAwesome name="map-marker" size={24} color="#660101" />
              <Text style={styles.statNumber}>{TOURNAMENT_INFO.venues.length}</Text>
              <Text style={styles.statLabel}>Cities</Text>
            </View>
            <View style={styles.statItem}>
              <FontAwesome name="users" size={24} color="#660101" />
              <Text style={styles.statNumber}>{TOURNAMENT_INFO.groups}</Text>
              <Text style={styles.statLabel}>Groups</Text>
            </View>
          </View>
        </View>

        <View style={styles.highlightsSection}>
          <Text style={styles.sectionTitle}>Key Matches</Text>
          {HIGHLIGHTS.map((highlight, index) => (
            <View key={index} style={styles.highlightCard}>
              <FontAwesome name={highlight.icon} size={24} color="#660101" style={styles.highlightIcon} />
              <View style={styles.highlightInfo}>
                <Text style={styles.highlightTitle}>{highlight.title}</Text>
                <Text style={styles.highlightDate}>{highlight.date}</Text>
                <Text style={styles.highlightVenue}>{highlight.venue}</Text>
                <Text style={styles.highlightPrice}>
                  From {index === 0 ? '10,000' : '25,000'} FCFA
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.blogSection}>
          <Text style={styles.sectionTitle}>Latest Updates</Text>
          {BLOG_POSTS.map((post) => (
            <TouchableOpacity key={post.id} style={styles.blogCard}>
              <Image source={post.image} style={styles.blogImage} />
              <View style={styles.blogContent}>
                <Text style={styles.blogTitle}>{post.title}</Text>
                <Text style={styles.blogExcerpt} numberOfLines={2}>
                  {post.excerpt}
                </Text>
                <View style={styles.blogMeta}>
                  <Text style={styles.blogDate}>{post.date}</Text>
                  <Text style={styles.blogReadTime}>{post.readTime}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All Articles</Text>
            <FontAwesome name="chevron-right" size={14} color="#660101" />
          </TouchableOpacity>
        </View>

        <View style={styles.liveSection}>
          <Text style={styles.sectionTitle}>Live & Podcasts</Text>
          {LIVE_CONTENT.map((content) => (
            <TouchableOpacity key={content.id} style={styles.liveCard}>
              <View style={styles.liveIconContainer}>
                <FontAwesome name={content.icon} size={24} color="#fff" />
              </View>
              <View style={styles.liveContent}>
                <View style={styles.liveHeader}>
                  <Text style={styles.liveTitle}>{content.title}</Text>
                  <View style={styles.liveType}>
                    <FontAwesome 
                      name={content.type === 'podcast' ? 'circle' : 'dot-circle-o'} 
                      size={12} 
                      color="#660101" 
                    />
                    <Text style={styles.liveTypeText}>
                      {content.type === 'podcast' ? 'Podcast' : 'Live Stream'}
                    </Text>
                  </View>
                </View>
                {content.type === 'podcast' ? (
                  <View style={styles.podcastDetails}>
                    <Text style={styles.podcastHost}>{content.host}</Text>
                    <Text style={styles.podcastInfo}>
                      {content.duration} • {content.date}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.streamDetails}>
                    <Text style={styles.streamDescription}>{content.description}</Text>
                    <Text style={styles.streamTime}>{content.time}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All Content</Text>
            <FontAwesome name="chevron-right" size={14} color="#660101" />
          </TouchableOpacity>
        </View>

        <View style={styles.venuesSection}>
          <Text style={styles.sectionTitle}>Host Cities</Text>
          <View style={styles.venuesList}>
            {TOURNAMENT_INFO.venues.map((venue, index) => (
              <View key={index} style={styles.venueItem}>
                <FontAwesome name="map-marker" size={16} color="#660101" />
                <Text style={styles.venueText}>{venue}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>Important Information</Text>
          <View style={styles.infoItem}>
            <FontAwesome name="info-circle" size={20} color="#660101" style={styles.infoIcon} />
            <Text style={styles.infoText}>Ticket prices range from 5,000 FCFA to 50,000 FCFA</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome name="calendar-check-o" size={20} color="#660101" style={styles.infoIcon} />
            <Text style={styles.infoText}>Hotel rates starting from 25,000 FCFA per night</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome name="plane" size={20} color="#660101" style={styles.infoIcon} />
            <Text style={styles.infoText}>E-Visa processing fee: 15,000 FCFA</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome name="money" size={20} color="#660101" style={styles.infoIcon} />
            <Text style={styles.infoText}>All payments are processed in FCFA</Text>
          </View>
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
  hero: {
    height: 300,
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(102, 1, 1, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 28,
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
  },
  heroDate: {
    fontSize: 18,
    color: '#fff',
    marginTop: 12,
    textAlign: 'center',
    opacity: 0.9,
  },
  welcomeSection: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  afconLogo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  welcomeContent: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#660101',
    padding: 15,
    borderRadius: 8,
    width: width * 0.28,
  },
  actionText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 15,
  },
  tournamentOverview: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  highlightsSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  highlightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  highlightIcon: {
    marginRight: 15,
  },
  highlightInfo: {
    flex: 1,
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  highlightDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  highlightVenue: {
    fontSize: 14,
    color: '#660101',
    marginTop: 2,
  },
  highlightPrice: {
    fontSize: 14,
    color: '#660101',
    marginTop: 4,
    fontWeight: '500',
  },
  venuesSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  venuesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  venueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 6,
    marginRight: 10,
    marginBottom: 10,
  },
  venueText: {
    marginLeft: 6,
    color: '#333',
    fontSize: 14,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIcon: {
    width: 30,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  blogSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  blogCard: {
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
  },
  blogImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  blogContent: {
    padding: 15,
  },
  blogTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  blogExcerpt: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  blogMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blogDate: {
    fontSize: 12,
    color: '#660101',
  },
  blogReadTime: {
    fontSize: 12,
    color: '#666',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 10,
  },
  viewAllText: {
    color: '#660101',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  liveSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  liveCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    alignItems: 'center',
  },
  liveIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#660101',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  liveContent: {
    flex: 1,
  },
  liveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  liveTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  liveType: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveTypeText: {
    fontSize: 12,
    color: '#660101',
    marginLeft: 4,
    fontWeight: '500',
  },
  podcastDetails: {
    marginTop: 4,
  },
  podcastHost: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  podcastInfo: {
    fontSize: 12,
    color: '#999',
  },
  streamDetails: {
    marginTop: 4,
  },
  streamDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  streamTime: {
    fontSize: 12,
    color: '#660101',
    fontWeight: '500',
  },
}); 