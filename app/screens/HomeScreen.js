import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import CoachAvatar from '../components/CoachAvatar';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <CoachAvatar onPressMotivation={() => alert('¡Eres una máquina! Sigue así 💪')} />
      <View style={styles.content}>
        <Text style={styles.title}>Bienvenido a FitCoach</Text>
        <Text style={styles.subtitle}>Tu app de rutinas y dietas personalizadas</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  content: { padding: 20 },
  title: { fontSize: 22, fontWeight: '700' },
  subtitle: { marginTop: 8, color: '#666' }
});