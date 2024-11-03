import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../utils/Colors';
import PieChart from 'react-native-pie-chart';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function CircularChart({ categoryList }) {
    const widthAndHeight = 150;
    const [values, setValues] = useState([1]);
    const [sliceColor, setSliceColor] = useState([Colors.GRAY]);
    const [totalCalculatedEstimate, setTotalCalculatedEstimate] = useState(0);

    useEffect(() => {
        if (categoryList) {
            updateCircularChart();
        }
    }, [categoryList]);

    const updateCircularChart = () => {
        let totalEstimate = 0;
        let otherCost = 0;
        const newValues = [];
        const newSliceColor = [];

        categoryList.forEach((item, index) => {
            if (index < 4) {
                let itemTotalCost = 0;

                item.CategoryItems?.forEach((item_) => {
                    itemTotalCost += item_.cost;
                    totalEstimate += item_.cost;
                });

                newValues.push(itemTotalCost);
                newSliceColor.push(Colors.COLOR_LIST[index]);
            } else {
                item.CategoryItems?.forEach((item_) => {
                    otherCost += item_.cost;
                    totalEstimate += item_.cost;
                });
            }
        });

        newValues.push(otherCost);
        newSliceColor.push(Colors.COLOR_LIST[4]);

        setValues(newValues);
        setSliceColor(newSliceColor);
        setTotalCalculatedEstimate(totalEstimate);
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, fontFamily: 'outfit' }}>
                Total Estimado:{' '}
                <Text style={{ fontFamily: 'outfit-bold' }}>R$ {totalCalculatedEstimate}</Text>
            </Text>

            <View style={styles.subContainer}>
                <PieChart
                    widthAndHeight={widthAndHeight}
                    series={values}
                    sliceColor={sliceColor}
                    coverRadius={0.65}
                    coverFill={'#FFF'}
                />
                {categoryList?.length === 0 ? (
                    <View style={styles.chartNameContainer}>
                        <MaterialCommunityIcons
                            name="checkbox-blank-circle"
                            size={24}
                            color={Colors.GRAY}
                        />
                        <Text>Nenhuma categoria encontrada.</Text>
                    </View>
                ) : (
                    <View style={styles.chartNameContainer}>
                        {categoryList?.map(
                            (category, index) =>
                                index <= 4 && (
                                    <View key={index} style={styles.iconTextContainer}>
                                        <MaterialCommunityIcons
                                            name="checkbox-blank-circle"
                                            size={24}
                                            color={Colors.COLOR_LIST[index] || Colors.GRAY}
                                        />
                                        <Text style={styles.iconText}>
                                            {index < 4 ? category.name : 'Outros'}
                                        </Text>
                                    </View>
                                )
                        )}
                    </View>
                )}
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
    chartNameContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
    },
    iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginVertical: 2,
    },
    iconText: {
        fontSize: 16,
        fontFamily: 'outfit',
    },
});
