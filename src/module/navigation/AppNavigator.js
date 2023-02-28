import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screen/Login/Login';
import Home from '../../screen/Home/Home';
import CreateData from '../../screen/Home/CreateData';
import ViewData from '../../screen/Home/ViewData';
import Downloaded_Data from '../../screen/Home/Downloaded_Data';
import { Context } from '../../components/Context';
import Delete_Data from '../../screen/Home/Delete_Data';
import Upload_Data from '../../screen/Home/Upload_Data';
import View_Downloaded_Data from '../../screen/Home/View_Downloaded_Data';
export default function AppNavigator() {
    const Stack = createNativeStackNavigator();
    const [authicated, setAuth] = useState(false)
    if (authicated) {
        return (
            <Context.Provider value={{ setAuth }} >
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: '#01B0F1',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                fontSize: 15,
                            },
                        }}>

                        <Stack.Screen
                            name="Home"
                            component={Home}
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="DeleteData"
                            component={Delete_Data}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="CreateData"
                            component={CreateData}
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="ViewData"
                            component={ViewData}
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="DownloadedData"
                            component={Downloaded_Data}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="UploadData"
                            component={Upload_Data}
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="view_dowload"
                            component={View_Downloaded_Data}
                            options={{ headerShown: false }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </Context.Provider>
        )
    } else {
        return (
            <Context.Provider value={{ setAuth }} >
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: '#01B0F1',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                fontSize: 15,
                            },
                        }}>
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{ headerShown: false }}
                        />

                    </Stack.Navigator>
                </NavigationContainer>
            </Context.Provider>
        )
    }
}