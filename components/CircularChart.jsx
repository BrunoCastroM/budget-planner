import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Colors from '../utils/Colors';
import PieChart from 'react-native-pie-chart';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function CircularChart() {
    const widthAndHeight = 150;
    const [values, setValues] = useState([1]);
    const [sliceColor, setsliceColor] = useState([Colors.GRAY]);

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20 }}>
                Total Estimado: <Text style={{ fontWeight: 'bold' }}>R$ 0</Text>
            </Text>

            <View style={styles.subContainer}>
                <PieChart
                    widthAndHeight={widthAndHeight}
                    series={values}
                    sliceColor={sliceColor}
                    coverRadius={0.65}
                    coverFill={'#FFF'}
                />
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 5,
                        alignItems: 'center',
                    }}
                >
                    <MaterialCommunityIcons
                        name="checkbox-blank-circle"
                        size={24}
                        color={Colors.GRAY}
                    />

                    <Text>NA</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: Colors.WHITE,
        padding: 20,
        borderRadius: 15,
        elevation: 1,
    },
    subContainer: {
        display: 'flex',
        marginTop: 10,
        flexDirection: 'row',
        gap: 40,
    },
});
