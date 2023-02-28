import { View, Text, ScrollView, TextInput, StyleSheet, ToastAndroid } from 'react-native'
import React from 'react'
import Button from '../../components/Button'
import { delete_tax } from '../../API/UploadTxn';
import { delete_downloadtax } from '../../API/DownloadTxn';
export default function Delete_Data(props) {
    const tax_list = props.route.params.item

    const btndelete = val => {
        delete_tax(val);
        ToastAndroid.show(` deleted succesful.`, ToastAndroid.SHORT);
        props.navigation.navigate('Home')
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white', }}>
            <TextInput
                style={styles.input}
                value={tax_list.cus_name}
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
                    value={tax_list.dob}
                    placeholder="DOB"
                    underlineColorAndroid="transparent"
                />


            </View>


            <TextInput
                style={styles.input}
                placeholder="Amount"
                value={tax_list.amount}
            />
            <TextInput
                style={styles.input}
                placeholder="Note"
                value={tax_list.note}
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
                    value={tax_list.txn_date
                    }
                />

            </View>


            <Button title={'Delete'} color={'#2D9BF1'} onPress={() => btndelete(tax_list.id)} />
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