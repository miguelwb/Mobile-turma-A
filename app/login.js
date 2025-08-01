import React from 'react';
import { View, Text, Button } from 'react-native';
import {router} from 'expo-router';

export default function Login() {
  return (
    <View>
      <Text>Página de Login</Text>
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}
