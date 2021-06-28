import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import Home from '../screens/Product/Home'
import colors from '../styles/colors'
import Product from '../screens/Product/Product'
import Search from '../screens/Product/Search'
import SearchScreen from '../screens/Product/Search'
import ProductCategorie from '../screens/Product/ProductCategorie'


export default function ProductStack() {
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
                name = "home"
                component = {Home}
                options={{headerShown:false}}
            
            />
            <Stack.Screen
                name ="product"
                component={Product}
                options={{headerShown:false}}
                />
                <Stack.Screen
                    name = "search"
                    component={SearchScreen}
                    options={{headerShown:false}}/>
                <Stack.Screen 
                name="products-categorie"
                component={ProductCategorie}
                options={{headerShown:false}}
                
                />

        </Stack.Navigator>
        
    )
}

const styles = StyleSheet.create({})
