// import { Redirect } from 'expo-router';
// import { Text, View } from 'react-native';

// export default function Index() {
//     return (
//         <View>
//             <Redirect href={'/login'}/>
//         </View>
//     );
// }

import { View, Text, Button } from 'react-native';
import React, { useEffect } from 'react';
import services from '../utils/services';
import { useRouter } from 'expo-router';
import { client } from '../utils/KindeConfig';

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        checkUserAuth();
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
            await services.storeData('login', 'false')
          router.replace('/login')
        }
      };

    return (
        <View>
            <Text>Home</Text>

            <Button title="Sair" onPress={handleLogout}/>
        </View>
    );
}
