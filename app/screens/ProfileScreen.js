import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  // Aquí mostramos la info recogida por el chatbot: nombre, edad, peso, objetivo, timeframe, nivel de actividad
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <View style={{ marginTop: 12 }}>
        <Text>Nombre: --</Text>
        <Text>Edad: --</Text>
        <Text>Peso actual: --</Text>
        <Text>Peso objetivo: --</Text>
        <Text>Nivel actividad: --</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text>Resumen semanal (placeholder): aquí mostrarás un "flash" con los cambios semanales.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontSize: 20, fontWeight: '700' } });