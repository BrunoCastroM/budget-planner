import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ToastAndroid,
    Linking,
} from 'react-native';
import React, { useState } from 'react';
import { supabase } from '../../utils/SupabaseConfig';
import Colors from '../../utils/Colors';
import EvilIcons from '@expo/vector-icons/EvilIcons';

export default function CourseItemList({ categoryData, setUpdateRecord }) {
    const [expandItem, setExpandItem] = useState();

    const onDeleteItem = async (id) => {
        const { error } = await supabase.from('CategoryItems').delete().eq('id', id);

        ToastAndroid.show('Item exluído!', ToastAndroid.SHORT);
        setUpdateRecord(true);
    };

    const openUrl = async (url) => {
        if (url) {
            Linking.openURL(url);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Lista de Item</Text>

            <View style={{ marginTop: 15 }}>
                {categoryData?.CategoryItems?.length > 0 ? (
                    categoryData?.CategoryItems?.map((item, index) => (
                        <View key={item.id || index}>
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={() => {
                                    setExpandItem(index);
                                }}
                            >
                                <Image source={{ uri: item.image }} style={styles.image} />

                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <Text style={styles.name}>{item.name || 'Sem nome'}</Text>
                                    <Text style={styles.url} numberOfLines={2}>
                                        {item.url || 'URL não disponível'}
                                    </Text>
                                </View>

                                <Text style={styles.cost}>R$ {item.cost || '0,00'}</Text>
                            </TouchableOpacity>
                            {expandItem == index && (
                                <View style={styles.actionItemContainer}>
                                    <TouchableOpacity onPress={() => onDeleteItem(item.id)}>
                                        <EvilIcons name="trash" size={34} color="red" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => openUrl(item.url)}>
                                        <EvilIcons name="external-link" size={34} color="blue" />
                                    </TouchableOpacity>
                                </View>
                            )}
                            {categoryData?.CategoryItems.length - 1 !== index && (
                                <View
                                    style={{
                                        borderWidth: 0.5,
                                        marginTop: 7,
                                        borderColor: Colors.GRAY,
                                    }}
                                />
                            )}
                        </View>
                    ))
                ) : (
                    <Text style={styles.noItemText}>Nenhum item adicionado!</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    heading: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 15,
    },
    itemContainer: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 20,
        fontFamily: 'outfit-bold',
    },
    url: {
        fontFamily: 'outfit',
        color: Colors.GRAY_DARKER,
    },
    cost: {
        fontSize: 17,
        marginLeft: 10,
        fontFamily: 'outfit-bold',
    },
    noItemText: {
        fontFamily: 'outfit-bold',
        fontSize: 25,
        color: Colors.GRAY_DARKER,
    },
    actionItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'flex-end',
    },
});
