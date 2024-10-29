import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Colors from '../utils/Colors';
import ColorPicker from '../components/ColorPicker';

export default function AddNewCategory() {
    const [selectedIcon, setSelectedIcon] = useState('IC');
    const [selectedColor, setSelectedColor] = useState(Colors.PURPLE);

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
});
