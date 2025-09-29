import React, { useState, useCallback, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

// CHATBOT: flujo inicial para recoger datos del usuario
export default function CoachScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState({});

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

  const onSend = useCallback((messages = []) => {
    setMessages(previous => GiftedChat.append(previous, messages));
    const text = messages[0].text.toLowerCase();

    // Lógica simple de flujo - puedes reemplazar por llamadas a OpenAI
    if (!profile.name) {
      setProfile(p => ({ ...p, goal: text }));
      // pedir nombre
      setTimeout(() => {
        setMessages(prev => GiftedChat.append(prev, [{ _id: Math.random(), text: 'Perfecto. ¿Cuál es tu nombre?', createdAt: new Date(), user: { _id: 2, name: 'Juan' }}]));
      }, 700);
    } else if (!profile.age) {
      setProfile(p => ({ ...p, name: text }));
      setTimeout(() => {
        setMessages(prev => GiftedChat.append(prev, [{ _id: Math.random(), text: '¿Cuántos años tienes?', createdAt: new Date(), user: { _id: 2, name: 'Juan' }}]));
      }, 700);
    } else if (!profile.weight) {
      setProfile(p => ({ ...p, age: text }));
      setTimeout(() => {
        setMessages(prev => GiftedChat.append(prev, [{ _id: Math.random(), text: '¿Cuál es tu peso actual (kg)?', createdAt: new Date(), user: { _id: 2, name: 'Juan' }}]));
      }, 700);
    } else if (!profile.timeframe) {
      setProfile(p => ({ ...p, weight: text }));
      setTimeout(() => {
        setMessages(prev => GiftedChat.append(prev, [{ _id: Math.random(), text: 'En cuánto tiempo te gustaría lograr ese objetivo?', createdAt: new Date(), user: { _id: 2, name: 'Juan' }}]));
      }, 700);
    } else {
      setProfile(p => ({ ...p, timeframe: text }));
      // ejemplo: crear plan inicial (puedes cambiar por llamada a OpenAI para plan personalizado)
      setTimeout(() => {
        setMessages(prev => GiftedChat.append(prev, [{ _id: Math.random(), text: `¡Perfecto ${profile.name || 'amigo'}! He creado un plan inicial para ${profile.goal || 'tu objetivo'}. Lo podrás ver en Perfil.`, createdAt: new Date(), user: { _id: 2, name: 'Juan' }}]));
      }, 800);
    }
  }, [profile]);

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