import { Stack } from 'expo-router/stack';
import { useFonts } from 'expo-font';

export default function Layout() {
    const [loaded, error] = useFonts({
        outfit: require('../assets/fonts/Outfit-Regular.ttf'),
        'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
        'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
    });

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="login/index" />
            <Stack.Screen
                name="add-new-category"
                options={{
                    presentation: 'modal',
                    headerTitle: 'Adicionar Nova Categoria',
                }}
            />
        </Stack>
    );
}
