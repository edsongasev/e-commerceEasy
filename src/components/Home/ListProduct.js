import React from 'react'
import { StyleSheet, Text, View ,Image,TouchableWithoutFeedback, ScrollView, FlatList} from 'react-native'
import {map}from 'lodash'
import {API_URL} from '../../utils/constants'
import {useNavigation}from '@react-navigation/native'

export default function ListProduct({products}) {
    const navigation = useNavigation();
    const goToProduct = (id) =>{
        navigation.push("product",{idProduct:id});
    }

  
        const renderItem=(item)=>{


            return (
              <TouchableWithoutFeedback onPress={() =>goToProduct(item.id)}>

                   <View style={styles.containerProduct}>
                       <View style={styles.product}>
                           <Image  style = {styles.image}source={{uri:`${API_URL}${item.image_principal.url}`} }/>
                           <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
                       </View>

                   </View>

               </TouchableWithoutFeedback>


            )

        }

    return (
        
            <FlatList showsHorizontalScrollIndicator={false}  keyExtractor={(item)=>(item.id).toLocaleString()} horizontal data={products} renderItem={({item}) =>(renderItem(item))} />
      
    )
      
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        flexDirection: "row",
        flexWrap:"wrap",
        alignItems:"flex-start",
        margin:-3,
       
    },
    containerProduct:{
        width:200,
        
     
    
        padding:3,
        
    },
    product:{
        height:220,
     
        
        backgroundColor:"#f0f0f0",
        padding:10,
        borderRadius:20
        
    },
    image:{
        height:150,
        resizeMode:"contain",
      
    },
    name:{
        marginTop:15,
        fontSize:15,
        textAlign:"center"
    }


})
