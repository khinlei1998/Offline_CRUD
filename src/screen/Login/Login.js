import { SafeAreaView, StyleSheet, TextInput, Image, View, Text, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import Button from '../../components/Button';
import { sync_userdata, selectUserQuery } from '../../API/UserAPI';
import { Context } from '../../components/Context';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNetInfo } from "@react-native-community/netinfo";


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default function Login(props) {
    const netInfo = useNetInfo();

    const [user_name, onChangeUserName] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [loading, setLoading] = useState(false)
    const { setAuth } = useContext(Context)

    const btnsync = async () => {
        if (!netInfo.isConnected) {
            alert('Internet Connection is need')
        }
        else {

            setLoading(true)
            sync_userdata().then((val) => {
                setLoading(false)

            })
                .catch((err) => {
                    console.log(err);
                    alert('Something went wrong while fetching  user, please try sync again.');
                    setLoading(false);
                })


        }
    };

    const btnsubmit = () => {
        const data = {
            uname: user_name,
            password: password
        }
        selectUserQuery(data, (type) => {
            if (type == 'login_success') {
                setAuth(true)
                ToastAndroid.show(`Login Success`, ToastAndroid.SHORT);
                props.navigation.navigate('Home')

            } else {
                ToastAndroid.show(`Login Invalid`, ToastAndroid.SHORT);
            }
        })
    }
    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', }}>

                <TouchableOpacity style={{ position: 'absolute', top: 0, marginTop: height / 20, right: width / 20 }} onPress={() => btnsync()}>
                    <Image style={{ width: 40, height: 40, }} source={require('../../../assets/images/1.png')} />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeUserName}
                    value={user_name}
                    placeholder="Username"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePassword}
                    secureTextEntry={true}
                    value={password}
                    placeholder="password"
                />
                <Button title={'Login'} onPress={() => btnsubmit()} color={'#2D9BF1'} />



            </View>

            <View style={{ position: 'absolute', top: '50%', right: 0, left: 0 }}>
                {loading ? (
                    <Spinner visible={loading} textContent={'Fetching Data'} />
                ) : (
                    <Text></Text>
                )}
            </View>
        </>
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