import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button';
import moment from 'moment';
import { upload_txn } from '../../API/UploadTxn';

export default function CreateData(props) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDOBDatePickerVisible, setDOBDatePickerVisibility] = useState(false);
    const [user_name, onChangeUserName] = useState('')
    const [date, setDate] = useState('');
    const [amount, setOnChangeAmount] = useState('')
    const [dob_date, setDOB_Date] = useState('');
    const [note, setonChangeNote] = useState('')
    const [name_error, setNameError] = useState('')
    const [amount_error, setAmountErrror] = useState('')
    const [note_error, setNoteError] = useState('')
    const [date_error, setDateError] = useState('')
    const [dob_error, setDOBError] = useState('')


    const showDobDatePicker = () => {
        setDOBDatePickerVisibility(true);
    };

    const hideDOBDatePicker = () => {
        setDOBDatePickerVisibility(false);
    };

    const handleDOBConfirm = (date) => {
        setDOB_Date(date)
        hideDatePicker();
    };
    //txn Date

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date)
        hideDatePicker();
    };

    const btnsubmit = () => {
        if (user_name === "") {
            setNameError("Name Filed required");
            return;
        } else {
            setNameError("");
        }
        if (amount === "") {
            setAmountErrror("Amount Filed required");
            return;
        } else {
            setAmountErrror("");
        }

        if (note === "") {
            setNoteError("Note Filed required");
            return;
        } else {
            setNoteError("");
        }

        if (date === "") {
            setDateError("Txn Date  Filed required");
            return;
        } else {
            setDateError("");
        }

        if (dob_date === "") {
            setDOBError("DOB Date  Filed required");
            return;
        } else {
            setDOBError("");
        }


        const data = {
            cus_name: user_name,
            dob: moment(dob_date).format('YYYY/MM/DD'),
            amount,
            note,
            txn_date: moment(date).format('YYYY/MM/DD'),


        }
        upload_txn(data).then((res) => {
            if (res.status == 'success') {
                ToastAndroid.show(`Create Successfully`, ToastAndroid.SHORT);
                props.navigation.navigate('Home')

            }

        })
    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white', }}>
            <TextInput
                style={styles.input}
                value={user_name}
                onChangeText={onChangeUserName}
                placeholder="Customer Name"
            />
            {name_error &&
                <Text
                    style={{
                        color: "red",
                        marginLeft: 20,
                    }}
                >
                    {name_error}

                </Text>}

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
                    value={dob_date ? moment(dob_date).format("YYYY-MM-DD") : ''}

                    onFocus={() => showDobDatePicker()}
                    placeholder="DOB"
                    underlineColorAndroid="transparent"
                />
                <TouchableOpacity onPress={() => showDobDatePicker()} >
                    <Icon style={{ padding: 10, }} name="calendar" size={20} color="#000" />
                </TouchableOpacity>
                <DateTimePickerModal

                    onCancel={hideDOBDatePicker}
                    isVisible={isDOBDatePickerVisible}
                    mode="date"
                    onConfirm={handleDOBConfirm}
                    maximumDate={new Date()}
                />

            </View>

            {dob_error &&
                <Text
                    style={{
                        color: "red",
                        marginLeft: 20,
                    }}
                >
                    {dob_error}
                </Text>
            }


            <TextInput
                style={styles.input}
                keyboardType='numeric'
                onChangeText={setOnChangeAmount}
                placeholder="Amount"
                value={amount}
            />


            {amount_error &&
                <Text
                    style={{
                        color: "red",
                        marginLeft: 20,
                    }}
                >
                    {amount_error}
                </Text>
            }

            <TextInput
                style={styles.input}
                placeholder="Note"
                onChangeText={setonChangeNote}
                value={note}
            />

            {note_error &&
                <Text
                    style={{
                        color: "red",
                        marginLeft: 20,
                    }}
                >
                    {note_error}
                </Text>
            }
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
                    value={date ? moment(date).format("YYYY-MM-DD") : ''}

                    onFocus={() => showDatePicker()}
                    placeholder="Txn Date(today)"
                    underlineColorAndroid="transparent"
                />
                <TouchableOpacity onPress={() => showDatePicker()} >

                    <Icon style={{ padding: 10, }} name="calendar" size={20} color="#000" />
                </TouchableOpacity>
                <DateTimePickerModal

                    onCancel={hideDatePicker}
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    maximumDate={new Date()}
                />

            </View>

            {date_error &&
                <Text
                    style={{
                        color: "red",
                        marginLeft: 20,
                    }}
                >
                    {date_error}
                </Text>
            }

            <Button title={'Submit'} color={'#2D9BF1'} onPress={() => btnsubmit()} />
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
        marginTop: 20
    },
});