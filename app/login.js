import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { router } from 'expo-router';

  export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const baseURL = "https://urban-space-chainsaw-v6ppr5x979xwhp6x-3000.app.github.dev/";
    async function handleLogin() {
      try {
        const response = await fetch(`${baseURL}/login`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            senha
          }),
        });
        const data = await response.json();
        if (!data) {
          throw new Error('Login falhou');
        }
      } catch (error) {
        throw new Error('Erro ao fazer login: ' + error.message);
      }
    }
        return (
      <View>
        <Text>Página de Login</Text>
        <Button title="Voltar" onPress={() => router.back()} />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        <Button title="Entrar" onPress={handleLogin} />
      </View>
    );
  }
