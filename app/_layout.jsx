import { Stack } from 'expo-router/stack';
import { useFonts } from 'expo-font';
import { View, ActivityIndicator } from 'react-native';
import React from 'react';

export default function Layout() {
    const [fontsLoaded] = useFonts({
        outfit: require('../assets/fonts/Outfit-Regular.ttf'),
        'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
        'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

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
                    headerShown: true,
                    headerTitle: 'Adicionar Nova Categoria',
                }}
            />
            <Stack.Screen
                name="add-new-category-item"
                options={{
                    presentation: 'modal',
                    headerShown: true,
                    headerTitle: 'Adicionar Novo Item',
                }}
            />
        </Stack>
    );
}
