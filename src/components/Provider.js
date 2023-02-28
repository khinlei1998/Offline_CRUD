import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Context } from './Context'

export default function Provider() {
    const [auth, setAuth] = useState(false)
    const context = {

        set_loginAuth: value => {
            setAuth(value)
        },

        auth
    }
    return (
        <Context.Provider value={context} >
            {children}
        </Context.Provider >
    )
}