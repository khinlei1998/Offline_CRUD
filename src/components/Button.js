import { SafeAreaView, StyleSheet, TextInput, Image, View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'

export default function Button({ onPress, title, color }) {
    console.log(color);
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
                style={{
                    alignItems: "center",
                    backgroundColor: color,
                    padding: 10,
                    width: '90%',
                    marginTop: 20,
                    height: 50,
                    justifyContent: 'center',
                    borderRadius: 5,
                    marginBottom: 20

                }}
                onPress={onPress}

            >
                <Text style={{ color: 'black' }}>{title}</Text>

            </TouchableOpacity>
        </View>

    )
}