import { Stack } from 'expo-router/stack';
import { useFonts } from 'expo-font';

export default function Layout() {
    const [loaded, error] = useFonts({
        'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
        'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
        'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
    });

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="login/index" options={{ headerShown: false }} />
            <Stack.Screen
                name="add-new-category"
                options={{ presentation: 'modal', headerTitle: 'Adicionar Nova Categoria' }}
            />
        </Stack>
    );
}
