import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BottomTabs({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();

  const tabs = [
    { key: 'Home', label: 'Inicio' },
    { key: 'Coach', label: 'Entrenador IA' },
    { key: 'Diet', label: 'Dieta' },
    { key: 'Routine', label: 'Rutina' },
    { key: 'Profile', label: 'Perfil' }
  ];

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 12 }]}>      
      {tabs.map((t, idx) => {
        const focused = state.index === idx;
        return (
          <TouchableOpacity
            key={t.key}
            onPress={() => navigation.navigate(t.key)}
            style={styles.tab}
          >
            {/* Aquí puedes poner iconos (react-native-vector-icons) */}
            <Text style={[styles.label, focused && styles.focused]}>{t.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  tab: { alignItems: 'center' },
  label: { fontSize: 12, color: '#333' },
  focused: { fontWeight: '700', color: '#1e90ff' }
});