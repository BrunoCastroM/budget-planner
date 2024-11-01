import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import Colors from '../utils/Colors';
import ColorPicker from '../components/ColorPicker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { supabase } from '../utils/SupabaseConfig';
import { client } from '../utils/KindeConfig';
import { useRouter } from 'expo-router';

export default function AddNewCategory() {
    const router = useRouter();

    const [selectedIcon, setSelectedIcon] = useState('IC');
    const [selectedColor, setSelectedColor] = useState(Colors.PURPLE);
    const [categoryName, setCategoryName] = useState();
    const [totalBudget, setTotalBudget] = useState();

    const onCreateCategory = async () => {
        const user = await client.getUserDetails();

        const { data, error } = await supabase
            .from('Category')
            .insert([
                {
                    name: categoryName,
                    assigned_budget: totalBudget,
                    icon: selectedIcon,
                    color: selectedColor,
                    created_by: user.email,
                },
            ])
            .select();

        if (data) {
            router.replace({
                pathname: '/category-detail',
                params: {
                    categoryId: data[0].id,
                },
            });
            ToastAndroid.show('Categoria Criada', ToastAndroid.SHORT);
        }
    };

    return (
        <View style={{ marginTop: 20, padding: 20 }}>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TextInput
                    style={[styles.iconInput, { backgroundColor: selectedColor }]}
                    maxLength={2}
                    onChangeText={(value) => setSelectedIcon(value)}
                >
                    {selectedIcon}
                </TextInput>

                <ColorPicker
                    selectedColor={selectedColor}
                    setSelectedColor={(color) => setSelectedColor(color)}
                />
            </View>

            <View style={styles.inputView}>
                <MaterialIcons name="local-offer" size={24} color={Colors.GRAY} />
                <TextInput
                    onChangeText={(value) => setCategoryName(value)}
                    placeholder="Nome da Categoria"
                    style={{ width: '100%', fontSize: 18 }}
                />
            </View>

            <View style={styles.inputView}>
                <FontAwesome6 name="brazilian-real-sign" size={22} color={Colors.GRAY} />
                <TextInput
                    onChangeText={(value) => setTotalBudget(value)}
                    placeholder="Orçamento Total"
                    keyboardType="numeric"
                    style={{ width: '100%', fontSize: 18 }}
                />
            </View>

            <TouchableOpacity
                style={styles.button}
                disabled={!categoryName || !totalBudget}
                onPress={() => onCreateCategory()}
            >
                <Text style={{ textAlign: 'center', fontSize: 18, color: Colors.WHITE }}>
                    Salvar
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    iconInput: {
        textAlign: 'center',
        fontSize: 30,
        padding: 20,
        borderRadius: 99,
        paddingHorizontal: 28,
        color: Colors.WHITE,
    },
    inputView: {
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        padding: 14,
        marginTop: 20,
        borderRadius: 10,
        borderColor: Colors.GRAY,
        backgroundColor: Colors.WHITE,
    },
    button: {
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        borderRadius: 10,
        marginTop: 30,
    },
});
