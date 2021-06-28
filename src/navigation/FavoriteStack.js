import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import {createStackNavigator} from '@react-navigation/stack'

import colors from '../styles/colors'
import Favorites from '../screens/Favorites'

export default function FavoriteStack() {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator
        screenOptions={{
            headerTintColor:colors.fontLigth,
            headerStyle:{backgroundColor:colors.bgDark},
            cardStyle:{
                backgroundColor:colors.bgLigth
            }

        }}
        
        >
            <Stack.Screen
                name = "favorites"
                component = {Favorites}
                options={{headerShown:false}}
            
            />
           

        </Stack.Navigator>
        
    )
}

const styles = StyleSheet.create({})
