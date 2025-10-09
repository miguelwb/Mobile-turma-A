import { Drawer } from 'expo-router/drawer';

export default function Layout() {
    return (
        <Drawer>
            <Drawer.Screen
                name="home" // This is the name of the page and must match the url from root
                options={{ headerShown: false }}
            />
        </Drawer>
    );
}