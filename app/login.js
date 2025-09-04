import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, SafeAreaView, Text, TextInput } from 'react-native';

export default function Login() {
  const router = useRouter();
  const [ra, setRA] = useState('');
  const [senha, setSenha] = useState('');

  const baseURL = "https://backend-mobilize-transporte.onrender.com";
  const mockUsers = [
    { ra: "12345", senha: "123" },
    { ra: "54321", senha: "321" },
  ];

  async function handleLogin() {
    if (!ra || !senha) {
      return Alert.alert("Atenção", "Preencha RA e senha");
    }

    // 🔹 1) Primeiro checa no mock (para teste rápido)
    const mockUser = mockUsers.find(u => u.ra === ra && u.senha === senha);
    if (mockUser) {
      await AsyncStorage.setItem("userRA", ra);
      console.log("Login fake bem-sucedido:", ra);
      return router.replace("/(protected)/Home"); // ✅ Navega direto
    }

    // 🔹 2) Se não achou no mock, tenta o backend real
    try {
      const response = await fetch(`${baseURL}/api/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ra, senha }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        return Alert.alert("Erro", "Resposta inválida do servidor");
      }

      console.log("Resposta da API:", data);

      if (!response.ok || !data.user) {
        return Alert.alert('Erro', data.message || 'RA ou senha inválidos');
      }

      // Salvar RA e token (se existir)
      await AsyncStorage.setItem('userRA', data.user.ra.toString());
      if (data.token) {
        await AsyncStorage.setItem('token', data.token);
      }

      console.log("Login salvo com sucesso:", data.user.ra);

      // Redirecionar para Home
      router.replace('/(protected)/Home');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao fazer login: ' + error.message);
    }
  }

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Página de Login</Text>
      <Button title="Voltar" onPress={() => router.back()} />

      <TextInput
        placeholder="RA"
        value={ra}
        onChangeText={setRA}
        autoCapitalize="none"
        keyboardType="numeric"
        style={{ marginVertical: 10, padding: 10, borderWidth: 1, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        autoCapitalize="none"
        style={{ marginVertical: 10, padding: 10, borderWidth: 1, borderRadius: 5 }}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </SafeAreaView>
  );
}
