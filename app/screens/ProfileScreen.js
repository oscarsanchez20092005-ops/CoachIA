import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../services/authContext';
import { listenUserProfile } from '../services/userService';

export default function ProfileScreen() {
  const { userId } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = listenUserProfile(userId, setProfile);
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [userId]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <View style={{ marginTop: 12 }}>
        <Text>Nombre: {profile?.name || '--'}</Text>
        <Text>Edad: {profile?.age || '--'}</Text>
        <Text>Peso actual: {profile?.weight || '--'}</Text>
        <Text>Objetivo: {profile?.goal || '--'}</Text>
        <Text>Plazo: {profile?.timeframe || '--'}</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text>Resumen semanal (placeholder): aquí mostrarás un "flash" con los cambios semanales.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontSize: 20, fontWeight: '700' } });