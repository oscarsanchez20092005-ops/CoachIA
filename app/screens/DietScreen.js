import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Button, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function DietScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Código leído: ${data}\nAquí buscarías el producto por su EAN en tu base de datos/API.`);
    setShowScanner(false);
  };

  if (hasPermission === null) return <Text>Solicitando permiso de cámara...</Text>;
  if (hasPermission === false) return <Text>No se dio permiso para usar la cámara.</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Contador de calorías (placeholder)</Text>
      <Button title="Abrir lector de código de barras" onPress={() => setShowScanner(true)} />

      {showScanner && (
        <View style={{ flex: 1 }}>
          <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={{ flex: 1 }} />
          <Button title="Cerrar" onPress={() => setShowScanner(false)} />
        </View>
      )}

      <View style={{ marginTop: 20 }}>
        <Text>Crear y guardar recetas - aquí implementarás formulario para crear recetas y guardarlas en tu BD.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontSize: 18, fontWeight: '700' } });