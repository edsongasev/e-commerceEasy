import React from 'react'
import { StyleSheet, Text, View,ScrollView} from 'react-native'
import {map} from 'lodash'
import {} from 'react-native-paper'
import ProductFavorites from './ProductFavorites'

export default function FavoriteList({products,setReloadFavorites}) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>LISTA DE FAVORITOS</Text>

            {map(products,(item)=>(
               
                <ProductFavorites key={item.id} item={item} setReloadFavorites={setReloadFavorites}/>

            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    container:{
        paddingVertical:20,
        paddingHorizontal:10,


    },
    title:{
      
        fontWeight:'bold',
        fontSize:19,
        marginBottom:5
    }
})
