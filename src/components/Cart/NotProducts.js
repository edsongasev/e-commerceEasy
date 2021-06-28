import React from 'react'
import { StyleSheet, Text, View ,Dimensions} from 'react-native'

const height= ( Dimensions.get("screen").height /100) *40  

export default function NotProducts() {
   
    return (
        <View style={styles.container}>
            <Text style={styles.text}>No tienes productos en el carrito</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingVertical:height,
      
       
        
        alignItems:'center'
    },
    text:{
        fontSize:16,
        fontWeight:'bold'
    }


})
