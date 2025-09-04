import { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Home() {
  const [ra, setRA] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const savedRA = await AsyncStorage.getItem('userRA');
      if (!savedRA) {
        router.replace('/Login'); // Volta para login se não estiver autenticado
      } else {
        setRA(savedRA);
      }
    };

    checkLogin();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userRA');
    router.replace('/Login');
  };

  if (!ra) {
    return <Text>Carregando...</Text>; // Evita piscar a tela enquanto verifica
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Bem-vindo(a), RA: {ra}</Text>
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}
