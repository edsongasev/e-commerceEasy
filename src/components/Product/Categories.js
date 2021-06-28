import React,{useState,useEffect,useCallback} from 'react'
import { StyleSheet, Text, View,FlatList, TouchableWithoutFeedback } from 'react-native'
import {useFocusEffect}from "@react-navigation/native" 
import {size,map} from 'lodash'
import colors from '../../styles/colors'
import {useNavigation} from '@react-navigation/native'

export default function Categories({categories,allProduct}) {

   
    const navigation  = useNavigation()


   
 const goToProductView = (products,title)=>{

    navigation.navigate("products-categorie",{products:products,title:title})

 }


 const renderItem = (item)=>{
     
    

    return(

        <TouchableWithoutFeedback  onPress={()=>goToProductView(item.products,item.name)}>
            <View style={styles.containerElement}>
                <Text numberOfLines={2} ellipsizeMode="tail" style={{fontSize:10}}>{item.name}</Text>
            </View>
        </TouchableWithoutFeedback>
    
    
    )

 }
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Categorias:</Text>
        
        <FlatList showsHorizontalScrollIndicator={false}  keyExtractor={(item)=>(item.id).toLocaleString()} horizontal data={categories} renderItem={({item}) =>(renderItem(item))} />
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        fontWeight:"bold",
        fontSize:20,
        marginBottom:10  ,
        marginLeft:10

    },

    container:{
        marginTop:15,
       
    },
    containerElement:{
         padding:10,
         borderColor:"#f0f0f0f0",
         backgroundColor:"#f0f0f0f0",
        borderWidth:0.8,
        margin:10,
        borderRadius:30,
        height:130,
        
        width:120,
        textAlign:'center',
        alignItems:"center",
        justifyContent:"center",
        shadowRadius:10,
        shadowColor:"#747474",
        
     

    }
})
