import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { supabase } from '../../utils/SupabaseConfig';
import Colors from '../../utils/Colors';

export default function History() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('CategoryItems')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setItems(data);
        } catch (error) {
            console.error('Erro ao buscar itens:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemName}>R$ {item.cost} </Text>
            <Text style={styles.itemDate}>
                Adicionado em: {new Date(item.created_at).toLocaleDateString()}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Histórico de Itens Adicionados</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#8B42FC" />
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Nenhum item adicionado.</Text>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        marginTop: 25,
        fontSize: 25,
        fontFamily: 'outfit-bold',
        color: '#8B42FC',
        marginBottom: 20,
    },
    itemContainer: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderColor: '#D4D4D4',
        borderWidth: 1,
    },
    itemName: {
        fontFamily: 'outfit-bold',
        fontSize: 18,
        color: '#333',
    },
    itemDate: {
        fontFamily: 'outfit',
        fontSize: 14,
        color: '#A9A9A9',
    },
    emptyText: {
        textAlign: 'center',
        color: '#A9A9A9',
        fontSize: 16,
        marginTop: 20,
    },
});
