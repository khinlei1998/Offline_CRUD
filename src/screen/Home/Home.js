import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import Button from '../../components/Button'
import { Context } from '../../components/Context'
import { useNetInfo } from "@react-native-community/netinfo";
import Spinner from 'react-native-loading-spinner-overlay';
import { sync_downloadtxn } from '../../API/DownloadTxn';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Home(props) {
    const { setAuth } = useContext(Context)
    const netInfo = useNetInfo();
    const [loading, setLoading] = useState(false)


    const btnlogout = async () => {
        await setAuth(false)
        await AsyncStorage.removeItem('login_id');
        // props.navigation.navigate('Login ')
    }

    const btndownload = async () => {
        if (!netInfo.isConnected) {
            alert('Internet Connection is need')
        }
        else {

            setLoading(true)
            sync_downloadtxn().then((val) => {
                setLoading(false)

            })
                .catch((err) => {
                    alert('Something went wrong while fetching  user, please try sync again.');
                    setLoading(false);
                })


        }
    };
    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center' }}>

                <Button title={'Create Data'} onPress={() => props.navigation.navigate('CreateData')} color={'#2D9BF1'} />
                <Button title={'View Created Data'} onPress={() => props.navigation.navigate('ViewData')} color={'#2D9BF1'} />
                <Button title={'Upload Data'} color={'#0CA789'} onPress={() => props.navigation.navigate('UploadData')} />
                <Button title={'Download Data'} color={'#0CA789'} onPress={() => btndownload()} />
                <Button title={'View Downloaded Data'} color={'#2D9BF1'} onPress={() => props.navigation.navigate('DownloadedData')} />
                <Button title={'Logout'} color={'#2D9BF1'} onPress={() => btnlogout()} />

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