import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    ToastAndroid,
    ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../utils/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { supabase } from '../utils/SupabaseConfig';
import { decode } from 'base64-arraybuffer';
import { useLocalSearchParams, useRouter } from 'expo-router';

const placeHolder =
    'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png';

export default function AddNewCategoryItem() {
    const router = useRouter();
    const [image, setImage] = useState(placeHolder);
    const [previewImage, setPreviewImage] = useState(placeHolder);
    const { categoryId } = useLocalSearchParams();
    const [name, setName] = useState();
    const [url, setUrl] = useState();
    const [cost, setCost] = useState();
    const [note, setNote] = useState();
    const [loading, setLoading] = useState(false);

    const onImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 0.7,
            base64: true,
        });

        if (!result.canceled) {
            setPreviewImage(result.assets[0].uri);
            setImage(result.assets[0].base64);
        }
    };

    const onClickAdd = async () => {
        setLoading(true);

        const fileName = Date.now();

        const { data, error } = await supabase.storage
            .from('images')
            .upload(`${fileName}.png`, decode(image), {
                contentType: 'image/png',
            });

        if (data) {
            const fileUrl = `https://aphvtjwmqujgqsxnfarn.supabase.co/storage/v1/object/public/images/${fileName}.png`;
            // console.log(fileUrl);

            const { data, error } = await supabase
                .from('CategoryItems')
                .insert([
                    {
                        name: name,
                        cost: cost,
                        url: url,
                        image: fileUrl,
                        note: note,
                        category_id: categoryId,
                    },
                ])
                .select();

            ToastAndroid.show('Novo Item Adicionado!', ToastAndroid.SHORT);
            // console.log(data);

            setLoading(false);
            router.replace({
                pathname: '/category-detail',
                params: {
                    categoryId: categoryId,
                },
            });
        }
        // console.log(data, error);
    };

    return (
        <KeyboardAvoidingView>
            <ScrollView style={{ padding: 20, backgroundColor: Colors.WHITE }}>
                <TouchableOpacity onPress={() => onImagePick()}>
                    <Image source={{ uri: previewImage }} style={styles.image} />
                </TouchableOpacity>

                <View style={styles.textInputContainer}>
                    <Ionicons name="pricetag" size={24} color={Colors.GRAY} />
                    <TextInput
                        placeholder="Nome do item"
                        onChangeText={(value) => setName(value)}
                        style={styles.input}
                    />
                </View>

                <View style={styles.textInputContainer}>
                    <FontAwesome6 name="brazilian-real-sign" size={23} color={Colors.GRAY} />
                    <TextInput
                        placeholder="Preço do item"
                        onChangeText={(value) => setCost(value)}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                </View>

                <View style={styles.textInputContainer}>
                    <Ionicons name="link" size={24} color={Colors.GRAY} />
                    <TextInput
                        placeholder="URL"
                        onChangeText={(value) => setUrl(value)}
                        style={styles.input}
                    />
                </View>

                <View style={styles.textInputContainer}>
                    <Ionicons name="pencil" size={24} color={Colors.GRAY} />
                    <TextInput
                        placeholder="Descrição"
                        onChangeText={(value) => setNote(value)}
                        style={styles.input}
                        numberOfLines={3}
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    disabled={!name || !cost || loading}
                    onPress={() => onClickAdd()}
                >
                    {loading ? (
                        <ActivityIndicator color={Colors.WHITE}/>
                    ) : (
                        <Text style={styles.textButton}>Adicionar</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        backgroundColor: Colors.GRAY,
        borderRadius: 15,
        display: 'flex',
        margin: 'auto',
    },
    textInputContainer: {
        padding: 12,
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        borderRadius: 10,
        borderColor: Colors.GRAY_DARKER,
        marginTop: 14,
    },
    input: {
        fontSize: 17,
        width: '100%',
    },
    button: {
        padding: 17,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 99,
        marginTop: 25,
    },
    textButton: {
        textAlign: 'center',
        color: Colors.WHITE,
        fontFamily: 'outfit-bold',
        fontSize: 20,
    },
});
