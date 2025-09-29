import React, { useState, useCallback, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { useAuth } from '../services/authContext';
import { saveUserProfile } from '../services/userService';

// CHATBOT: flujo inicial para recoger datos del usuario
export default function CoachScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState({});
  const { userId } = useAuth();

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hola, soy Juan, tu nuevo entrenador personal. ¿Cómo quieres que sea tu objetivo? (ej: perder grasa, ganar músculo)',
        createdAt: new Date(),
        user: { _id: 2, name: 'Juan' }
      }
    ]);
  }, []);

  const persistProfile = async (nextProfile) => {
    try {
      if (userId) {
        await saveUserProfile(userId, nextProfile);
      }
    } catch (e) {
      // opcional: manejar error o mostrar toast
    }
  };

  const onSend = useCallback((messages = []) => {
    setMessages(previous => GiftedChat.append(previous, messages));
    const text = messages[0].text.toLowerCase();

    // Lógica simple de flujo - puedes reemplazar por llamadas a OpenAI
    if (!profile.name) {
      const next = { ...profile, goal: text };
      setProfile(next);
      persistProfile(next);
      setTimeout(() => {
        setMessages(prev => GiftedChat.append(prev, [{ _id: Math.random(), text: 'Perfecto. ¿Cuál es tu nombre?', createdAt: new Date(), user: { _id: 2, name: 'Juan' }}]));
      }, 700);
    } else if (!profile.age) {
      const next = { ...profile, name: text };
      setProfile(next);
      persistProfile(next);
      setTimeout(() => {
        setMessages(prev => GiftedChat.append(prev, [{ _id: Math.random(), text: '¿Cuántos años tienes?', createdAt: new Date(), user: { _id: 2, name: 'Juan' }}]));
      }, 700);
    } else if (!profile.weight) {
      const next = { ...profile, age: text };
      setProfile(next);
      persistProfile(next);
      setTimeout(() => {
        setMessages(prev => GiftedChat.append(prev, [{ _id: Math.random(), text: '¿Cuál es tu peso actual (kg)?', createdAt: new Date(), user: { _id: 2, name: 'Juan' }}]));
      }, 700);
    } else if (!profile.timeframe) {
      const next = { ...profile, weight: text };
      setProfile(next);
      persistProfile(next);
      setTimeout(() => {
        setMessages(prev => GiftedChat.append(prev, [{ _id: Math.random(), text: 'En cuánto tiempo te gustaría lograr ese objetivo?', createdAt: new Date(), user: { _id: 2, name: 'Juan' }}]));
      }, 700);
    } else {
      const finalProfile = { ...profile, timeframe: text };
      setProfile(finalProfile);
      persistProfile(finalProfile);
      setTimeout(() => {
        setMessages(prev => GiftedChat.append(prev, [{ _id: Math.random(), text: `¡Perfecto ${finalProfile.name || 'amigo'}! He creado un plan inicial para ${finalProfile.goal || 'tu objetivo'}. Lo podrás ver en Perfil.`, createdAt: new Date(), user: { _id: 2, name: 'Juan' }}]));
      }, 800);
    }
  }, [profile, userId]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{ _id: 1 }}
        renderBubble={(props) => <Bubble {...props} wrapperStyle={{ right: { backgroundColor: '#1e90ff' } }} />}
      />
    </SafeAreaView>
  );
}