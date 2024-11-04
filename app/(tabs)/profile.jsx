import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { client } from '../../utils/KindeConfig';
import services from '../../utils/services';
import Colors from '../../utils/Colors';

export default function Profile() {
    const [user, setUser] = useState();
    const router = useRouter();

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const user = await client.getUserDetails();
        setUser(user);
    };

    const handleLogout = async () => {
        const loggedOut = await client.logout();

        if (loggedOut) {
            await services.storeData('login', 'false');
            router.replace('/login');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>
            <Image source={{ uri: user?.picture }} style={styles.profileImage} />
            <View style={styles.userInfo}>
                <Text style={styles.label}>Nome:</Text>
                <Text style={styles.userDetail}>{user?.given_name || 'Nome não disponível'}</Text>

                <Text style={styles.label}>E-mail:</Text>
                <Text style={styles.userDetail}>{user?.email || 'Email não disponível'}</Text>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
        marginVertical: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
        borderColor: Colors.GRAY,
        borderWidth: 2,
    },
    userInfo: {
        width: '100%',
        padding: 20,
        backgroundColor: '#E6E6E6',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.GRAY_DARKER,
        marginTop: 10,
    },
    userDetail: {
        fontSize: 18,
        color: Colors.BLACK,
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: Colors.RED,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    logoutText: {
        color: Colors.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
