import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function CoachAvatar({ onPressMotivation }) {
  // Avatar + burbuja motivadora cada vez que el usuario entra (puedes ligar esto a AsyncStorage/lastOpened)
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressMotivation} style={styles.avatarWrap}>
        <Image source={{ uri: 'https://i.pravatar.cc/80?img=12' }} style={styles.avatar} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'absolute', right: 14, top: 10 },
  avatarWrap: { width: 52, height: 52, borderRadius: 26, overflow: 'hidden' },
  avatar: { width: '100%', height: '100%' }
});