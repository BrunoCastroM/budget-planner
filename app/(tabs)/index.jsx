// import { Redirect } from 'expo-router';
// import { Text, View } from 'react-native';

// export default function Index() {
//     return (
//         <View>
//             <Redirect href={'/login'}/>
//         </View>
//     );
// }

import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import services from '../../utils/services';
import { client } from '../../utils/KindeConfig';
import { supabase } from '../../utils/SupabaseConfig';
import Header from '../../components/Header';
import Colors from '../../utils/Colors';

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        checkUserAuth();
        getCategoryList();
    }, []);

    // Used to check if user is already auth or not
    const checkUserAuth = async () => {
        const result = await services.getData('login');

        if (result !== 'true') {
            router.replace('/login');
        }
    };

    const handleLogout = async () => {
        const loggedOut = await client.logout();

        if (loggedOut) {
            await services.storeData('login', 'false');
            router.replace('/login');
        }
    };

    const getCategoryList = async () => {
        const user = await client.getUserDetails();

        const { data, error } = await supabase
            .from('Category')
            .select('*')
            .eq('created_by', user.email);

        // console.log('Data:', data);
    };

    return (
        <View
            style={{
                marginTop: 30,
                padding: 20,
                backgroundColor: Colors.PRIMARY,
                height: 150,
            }}
        >
            <Header />


            {/* <Button title="Sair" onPress={handleLogout} /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
    },
});
