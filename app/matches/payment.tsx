import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function PaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const handleNavigationStateChange = (navState: any) => {
    // Check if the URL contains a success parameter or specific success page
    // This is an example - adjust according to the actual payment gateway response
    if (navState.url.includes('success') || navState.url.includes('payment_completed')) {
      router.push({
        pathname: '../hotel-reservation/index',
        params: {
          matchId: params.matchId,
          selectedSeats: params.selectedSeats,
        },
      });
    }
    // Handle payment failure if needed
    else if (navState.url.includes('failure') || navState.url.includes('payment_failed')) {
      router.back(); // Return to seat selection
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://billetterie.rtn.sn' }}
        style={styles.webview}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onNavigationStateChange={handleNavigationStateChange}
      />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#008C45" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
}); 