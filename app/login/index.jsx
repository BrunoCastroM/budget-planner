import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import loginBg from '../../assets/images/login-bg.png';
import Colors from '../../utils/Colors';
import { client } from '../../utils/KindeConfig';
import services from '../../utils/services';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
    const router = useRouter();

    const handleSignIn = async () => {
        const token = await client.login();
        if (token) {
            await services.storeData('login', 'true');
            router.replace('/');
        }
    };

    return (
        <View
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Image source={loginBg} style={styles.bgImage} />

            <View
                style={{
                    backgroundColor: Colors.PRIMARY,
                    width: '100%',
                    height: '100%',
                    padding: 22,
                    marginTop: -30,
                    borderTopRightRadius: 32,
                    borderTopLeftRadius: 32,
                }}
            >
                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: Colors.WHITE,
                    }}
                >
                    Planejador Orçamentário
                </Text>

                <Text
                    style={{
                        fontSize: 18,
                        textAlign: 'center',
                        color: Colors.WHITE,
                        marginTop: 18,
                    }}
                >
                    No controle, Evento a evento: seu app de planejamento de orçamento!
                </Text>

                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                    <Text style={{ textAlign: 'center', color: Colors.PRIMARY }}>Login/Singup</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bgImage: {
        width: 200,
        height: 400,
        marginTop: 70,
        borderWidth: 5,
        borderRadius: 20,
        borderColor: Colors.BLACK,
    },
    button: {
        backgroundColor: Colors.WHITE,
        padding: 14,
        paddingHorizontal: 6,
        borderRadius: 99,
        marginTop: 48,
    },
});
