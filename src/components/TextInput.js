import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

export default function TextInputField(props) {
    const { title } = props
    return (
        <TextInput

            style={styles.input}
            placeholder={title}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 55,
        margin: 12,
        borderWidth: 0.7,
        padding: 20,
        borderRadius: 10,
        marginTop: 20
    },
});