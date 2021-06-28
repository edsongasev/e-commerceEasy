import React from 'react'
import { View, Text } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import AddAddrees from '../screens/Account/AddAddrees'
import AddressList from '../components/Cart/AddressList'
import CartScreen from '../screens/CartScreen'
import colors from '../styles/colors'
import Payment from '../components/Cart/Payment'

const Stack  = createStackNavigator()
export default function CartNavigation() {
    return (
        <Stack.Navigator 
        screenOptions={{
            headerTintColor:colors.fontLigth,
            headerStyle:{backgroundColor:colors.bgDark},
            cardStyle:{
                backgroundColor:colors.bgLigth
            }

        }}>
            <Stack.Screen
            name="cart-screen"
            component={CartScreen}
            options={{title:"Carrito ",headerShown:false}}
            
            />
            <Stack.Screen
            name="create-address"
            component={AddAddrees}
            options={{title:"Crea nueva Direccion"}}
            
            />
             <Stack.Screen
            name="buy-cart"
            component={Payment}
            options={{title:"Comprar"}}
            
            />
            
        </Stack.Navigator>
    )
}
