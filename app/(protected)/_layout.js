import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

function CustomDrawerContent(props) {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <DrawerContentScrollView {...props} scrollEnabled={false}>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
            </View>
            <TouchableOpacity
                activeOpacity={0.8}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#115f8c',
                    borderRadius: 50,
                    height: 55,
                    marginBottom: 30,
                    marginHorizontal: 15,

                    // 💛 sombra amarela suave, só embaixo/direita
                    shadowColor: '#f7b500',
                    shadowOffset: { width: 3, height: 4 }, // deslocamento horizontal e vertical
                    shadowOpacity: 0.9,
                    shadowRadius: 0,
                    elevation: 8, // para Android
                }}
            >
                <Ionicons name="exit-outline" size={22} color="#fff" style={{}} />
                <Text style={{ margin: 16, fontSize: 16, color: '#fff', fontFamily: 'LeagueSpartan-Bold', fontWeight: 'bold' }}>Sair</Text>
            </TouchableOpacity>
        </View >
    )
}

export default function Layout() {

    const [fontsLoaded] = useFonts({
        'LeagueSpartan-Regular': require('../../assets/fonts/LeagueSpartan-Regular.ttf'),
        'LeagueSpartan-Bold': require('../../assets/fonts/LeagueSpartan-Bold.ttf'),
        'LeagueSpartan-Black': require('../../assets/fonts/LeagueSpartan-Black.ttf'),
        'LeagueSpartan-ExtraBold': require('../../assets/fonts/LeagueSpartan-ExtraBold.ttf'),
        'LeagueSpartan-ExtraLight': require('../../assets/fonts/LeagueSpartan-ExtraLight.ttf'),
        'LeagueSpartan-Light': require('../../assets/fonts/LeagueSpartan-Light.ttf'),
        'LeagueSpartan-Medium': require('../../assets/fonts/LeagueSpartan-Medium.ttf'),
        'LeagueSpartan-SemiBold': require('../../assets/fonts/LeagueSpartan-SemiBold.ttf'),
        'LeagueSpartan-Thin': require('../../assets/fonts/LeagueSpartan-Thin.ttf'),
    });

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerStyle: {
                    width: 220,
                    borderRightColor: '#093f5d',
                    borderRightWidth: 4,
                },
                drawerItemStyle: { backgroundColor: '#115f8c', marginBottom: 20 },
                drawerLabelStyle: {
                    fontFamily: 'LeagueSpartan-Bold',
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#fff',
                },
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontFamily: 'LeagueSpartan-Bold',
                    fontSize: 25,
                    color: '#0f5176',
                    fontWeight: 'bold',
                    textAlign: 'center',
                },
            }}
        >
            <Drawer.Screen name="home" options={{ title: 'Mapa', headerTitle: 'Transporte+' }} />
            <Drawer.Screen name="about" options={{ title: 'Perfil' }} />
            <Drawer.Screen name="config" options={{ title: 'Configurações' }} />
        </Drawer>

    );
}