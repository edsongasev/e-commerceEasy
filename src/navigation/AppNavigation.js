import React from 'react'
import {StyleSheet} from 'react-native'
import {NavigationContainer}from '@react-navigation/native'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'

import Favorites from '../screens/Favorites';


import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import  colors from '../styles/colors'

import AccountStack from './AccountStack';
import ProductStack from './ProductStack';
import ScreenCart from '../screens/CartScreen';
import CartStack from './CartStack';
import FavoriteStack from './FavoriteStack';

const Tab = createMaterialBottomTabNavigator();

export default function AppNavigation() {
    return (
       <NavigationContainer

        
       
       >
           <Tab.Navigator barStyle={styles.navigation}  screenOptions={({route})=>({ tabBarIcon : (routerStatus) =>{ return setIcons(route,routerStatus);}})}>
               <Tab.Screen
               name ="home"
               component={ProductStack}
               options={{title: "Inicio"}}
               
               />
               <Tab.Screen
               name ="favorites"
               component={FavoriteStack}
               options={{title: "Favoritos"}}
               
               />
               
               <Tab.Screen
               name ="cart"
               component={CartStack}
               options={{title: "Carrito"}}
               
               />
              
               <Tab.Screen
               name ="account"
               component={AccountStack}
               options={{title: "Mi Cuenta"}}
               
               />


               

           </Tab.Navigator>
        
           
       </NavigationContainer>
    )
}


function setIcons (route,routeStatus) {
    let iconName = ""

    switch (route.name) {
        case "home":
            iconName = "home"
            break;
    
        case "favorites":
            iconName = "heart"
            break;
    
        case "cart":
            iconName = "shopping-cart"
            break;
    
        case "account":
            iconName = "bars"
            break;
    
       
        default:
            break;
    }

   return <AwesomeIcon name = {iconName}  style ={styles.icon}/>;
}


const styles = StyleSheet.create({
    navigation:{
        backgroundColor: colors.bgDark,
    },
    icon:{
        fontSize: 20,
        color: colors.fontLigth,
    }



})