import React from 'react'
import  {createStackNavigator} from '@react-navigation/stack'
import { View, Text } from 'react-native'
import Account from '../screens/Account/Account';
import ChangeName from '../screens/Account/ChangeName'
import colors from '../styles/colors'
import ChangeEmail from '../screens/Account/ChangeEmail'
import ChangeUserName from '../screens/Account/ChangeUserName';
import ChangePassword from '../screens/Account/ChangePassword';
import Addresses from '../screens/Account/Addresses';
import AddAddrees from '../screens/Account/AddAddrees';
import ScreenCart from '../screens/CartScreen';
import AddressList from '../components/Cart/AddressList';
import Orders from '../screens/Account/Orders';
import Contact from '../screens/Account/Contact';




 const Stack = createStackNavigator();

export default function AccountStack() {
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
             name = "account"
             component={Account}
             options={{title:"Cuenta",headerShown:false}}
            
            />

            <Stack.Screen
            name = "change-name"
            component={ChangeName}
            options={{title:"Cambiar nombre y apellidos"}}
            
            
            />
            <Stack.Screen 
            name ="change-email"
            component={ChangeEmail}
            options = {{title:"Cambiar Email"}}
            
            />
            <Stack.Screen
                name ="change-username"
                component= {ChangeUserName}
                options = {{title: "Cambiar nombre de usuario"}}
            />
            <Stack.Screen
            name= "change-password"
            component={ChangePassword}
           options={{title:"Cambiar contraseña"}} />
            <Stack.Screen
            name= "addresses"
            component={Addresses}
            options={{title:"Mis Direcciones "}}
            />
            <Stack.Screen
                name = "add-address"
                component={AddAddrees}
                options={{title: "Nueva Direccion"}}
                />
                <Stack.Screen
                name = "address-list"
                component={AddressList}
                options={{title: "Nueva Direccion",headerShown:false }}
                />
                 <Stack.Screen
                name = "orders"
                component={Orders}
                options={{title: "Mis pedidos"}}
                />

                <Stack.Screen
                    name = "contact"
                    component={Contact}
                    options={{title: "Contactanos"}}
                />
                
                


        </Stack.Navigator>
    )
}
