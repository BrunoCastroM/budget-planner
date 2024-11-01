import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../utils/Colors';

export default function CourseInfo({ categoryData }) {
    const [totalCost, setTotalCost] = useState();
    const [totalPerc, setTotalPerc] = useState(0);

    useEffect(() => {
        categoryData && calculateTotalPerc();
    }, [categoryData]);

    const calculateTotalPerc = () => {
        let total = 0;
        categoryData?.CategoryItems?.forEach((item) => {
            total = total + item.cost;
        });

        setTotalCost(total);

        const perc = (total / categoryData.assigned_budget) * 100;
        setTotalPerc(perc);
    };
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <Text style={[styles.textIcon, { backgroundColor: categoryData.color }]}>
                        {categoryData.icon}
                    </Text>
                </View>

                <View style={{ flex: 1, marginLeft: 20 }}>
                    <Text style={styles.categoryName}>{categoryData?.name}</Text>
                    <Text style={styles.categoryText}>
                        {categoryData?.CategoryItems?.length} Item
                    </Text>
                </View>

                <Ionicons name="trash" size={24} color="red" />
            </View>

            {/* progress bar */}
            <View style={styles.amountContainer}>
                <Text style={{ fontFamily: 'outfit-bold' }}>R$ {totalCost}</Text>
                <Text style={{ fontFamily: 'outfit' }}>
                    Orçmento Total: {categoryData.assigned_budget}
                </Text>
            </View>

            <View style={styles.progressBarMainContainer}>
                <View style={[styles.progressBarSubContainer, { width: totalPerc + '%' }]}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textIcon: {
        fontSize: 25,
        padding: 20,
        borderRadius: 15,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'baseline',
    },
    categoryName: {
        fontFamily: 'outfit-bold',
        fontSize: 24,
    },
    categoryText: {
        fontFamily: 'outfit',
        fontSize: 16,
    },
    amountContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 15,
    },
    progressBarMainContainer: {
        width: '100%',
        height: 14,
        marginTop: 7,
        backgroundColor: Colors.GRAY,
        borderRadius: 99,
    },
    progressBarSubContainer: {
        width: '40%',
        height: 14,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 99,
    },
});
