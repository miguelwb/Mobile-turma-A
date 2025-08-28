import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const menuItems = [
  {
    id: '1',
    title: 'Cadastrar Usuário',
    icon: 'user-plus',
    screen: '/register', // navegação para tela de registro (fora do protected)
  },
  {
    id: '2',
    title: 'Viagens',
    icon: 'bus',
    screen: '/protected/trips', // dentro de protected
  },
  {
    id: '3',
    title: 'Perfil',
    icon: 'user-circle',
    screen: '/protected/profile', // dentro de protected
  },
  {
    id: '4',
    title: 'Configurações',
    icon: 'settings',
    screen: '/protected/settings', // dentro de protected
  },
];

export default function Home() {
  const handleNavigate = (screen) => {
    router.push(screen);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate(item.screen)}>
      <FontAwesome5 name={item.icon} size={28} color="#005086" style={{ marginRight: 20 }} />
      <Text style={styles.menuText}>{item.title}</Text>
      <Feather name="chevron-right" size={20} color="#005086" />
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['rgba(17,95,140,1)', 'rgba(5,39,80,1)']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Feather name="menu" size={28} color="#fff" />
          <Text style={styles.title}>Mobilize Transporte</Text>
          <Feather name="bell" size={28} color="#fff" />
        </View>

        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'LeagueSpartan-Bold',
  },
  list: {
    paddingBottom: 20,
  },
  menuItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 15,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  menuText: {
    flex: 1,
    fontSize: 18,
    color: '#005086',
    fontFamily: 'LeagueSpartan-Bold',
  },
});
