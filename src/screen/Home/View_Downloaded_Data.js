import { View, Text, ScrollView, TextInput, StyleSheet, ToastAndroid } from 'react-native'
import React from 'react'
import Button from '../../components/Button'

export default function View_Downloaded_Data(props) {
    const downloaded_list = props.route.params.item

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white', }}>
            <TextInput
                style={styles.input}
                value={downloaded_list.cus_name}
                placeholder="Customer Name"
            />

            <View style={{

                flexDirection: 'row',
                borderWidth: 0.7,
                marginLeft: 12,
                width: '93%',
                borderRadius: 7,
                padding: 4,
                marginTop: 15
            }}>
                <TextInput
                    style={{
                        flex: 1,
                        padding: 10

                    }}
                    value={downloaded_list.dob}
                    placeholder="DOB"
                    underlineColorAndroid="transparent"
                />


            </View>


            <TextInput
                style={styles.input}
                placeholder="Amount"
                value={downloaded_list.amount}
            />
            <TextInput
                style={styles.input}
                placeholder="Note"
                value={downloaded_list.note}
            />

            <View style={{

                flexDirection: 'row',
                borderWidth: 0.7,
                marginLeft: 12,
                width: '93%',
                borderRadius: 7,
                padding: 4,
                marginTop: 15
            }}>
                <TextInput
                    style={{
                        flex: 1,
                        padding: 10

                    }}
                    value={downloaded_list.txn_date
                    }
                />

            </View>


            <Button title={'Back'} color={'#2D9BF1'} onPress={() => props.navigation.goBack()} />
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    input: {
        height: 55,
        margin: 12,
        borderWidth: 0.7,
        padding: 20,
        borderRadius: 10,
        marginTop: 30
    },
});