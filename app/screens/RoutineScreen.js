import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// Base de datos simple en memoria de ejercicios (reemplazar por BD real)
const EXERCISES = [
  { id: '1', name: 'Sentadilla', equipment: 'sin material', demo: 'https://example.com/squat.mp4' },
  { id: '2', name: 'Flexiones', equipment: 'sin material', demo: 'https://example.com/pushup.mp4' },
  { id: '3', name: 'Press banca', equipment: 'mancuernas', demo: 'https://example.com/bench.mp4' }
];

export default function RoutineScreen() {
  const [myRoutine, setMyRoutine] = useState([]);

  function addToRoutine(ex) {
    setMyRoutine(r => [...r, ex]);
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={styles.title}>Base de ejercicios</Text>
      <FlatList
        data={EXERCISES}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sub}>{item.equipment}</Text>
            </View>
            <TouchableOpacity onPress={() => addToRoutine(item)} style={styles.btn}>
              <Text style={{ color: '#fff' }}>Añadir</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={{ marginTop: 20 }}>
        <Text style={styles.title}>Tu rutina</Text>
        {myRoutine.map((r, idx) => (
          <Text key={idx}>• {r.name}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ title: { fontSize: 18, fontWeight: '700' }, row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eee' }, name: { fontSize: 16 }, sub: { color: '#666' }, btn: { backgroundColor: '#1e90ff', padding: 10, borderRadius: 8 } });