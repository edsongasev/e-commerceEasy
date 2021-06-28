import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button}from 'react-native-paper'
import Toast from 'react-native-root-toast'
import {addProductCartApi} from '../../api/cart'
import  useAuth from '../../hooks/useAuth'
import {useNavigation} from '@react-navigation/native'

export default function Buy({product,quantity}) {
    const {auth}  = useAuth()
    const navigation = useNavigation()

    const addProductCart= async  () =>{

        if (auth === null){
            
            navigation.navigate("cart",{screen:"cart-screen"})
            return 
            
        }
       const response = await  addProductCartApi(product.id,quantity)
       if(response){
           Toast.show("Producto añadido al carrito",{
               position:Toast.positions.CENTER
           })
       }else{
        Toast.show("Error al añadir el producto al carrito",{
            position:Toast.positions.CENTER
        })
           
       }
    }
    
    return (
        <View style={{zIndex: 1}}>
        <Button  
            mode="contained"
            onPress={addProductCart}
            contentStyle={styles.btnBuyContent}
            labelStyle={styles.btnLabel} 
            style={styles.btn}>
            Añadir a la cesta
        </Button>
    </View>
    )
}

const styles = StyleSheet.create({
    btnBuyContent:{
        backgroundColor:"#008FE9",
        paddingVertical:5

    },
    btnLabel:{
        fontSize:18,

    },
    btn:{
        marginTop:20
    }
})
