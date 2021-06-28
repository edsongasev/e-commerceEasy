import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button} from 'react-native-paper'
import {isFavoriteAPi,addFavoriteApi,deleteFavoriteApi} from '../../api/favorite'
import useAuth from '../../hooks/useAuth'
import {size} from 'lodash'
import colors from '../../styles/colors'
import {useNavigation} from '@react-navigation/native'


export default function Favorite({product}) {
    const [isFavorite, setIsFavorite] = useState(undefined)
    const {auth} = useAuth()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        (async () =>{
            if(auth){
            const response = await isFavoriteAPi(auth,product.id)
            if(size(response) === 0 ) {setIsFavorite(false)}
            else {setIsFavorite(true)}}
            
        }) () 
     
    }, [product])

    const addFavorites =  async () =>{
        if (auth === null){
            
            navigation.navigate("favorites")
            return 
            
        }

        if(!loading){
            setLoading(true)
           
            try {
                await addFavoriteApi(auth,product.id)
                setIsFavorite(true)
            } catch (error) {
                console.log(error);
                
            }

            setLoading(false)

        }

       
       

    }

    const deleteFavorite=  async () =>{
       
        if(!loading){
            setLoading(true)
           
            try {
                await deleteFavoriteApi(auth,product.id)
                setIsFavorite(false)
            } catch (error) {
                console.log(error);
                
            }

            setLoading(false)

        }
    }

    

    


    if (isFavorite  === undefined){return null }
    return (
        <View style={{zIndex:1}}>
        <Button 
        mode="contained" 
        loading={loading}
        style={styles.btn} 
        contentStyle={ isFavorite ?  styles.btnEraseFavoriteContent : styles.btnAddFavoriteContent} 
        labelStyle={styles.btnLabel}
        onPress={ isFavorite ? deleteFavorite :  addFavorites}  >
           {isFavorite ? "Eliminar de Favorito" : "Añadir a Favoritos"} </Button>
    </View>
    )
}

const styles = StyleSheet.create({
    btnEraseFavoriteContent:{
        backgroundColor:colors.danger,
        paddingVertical:5
        

    },

    btnAddFavoriteContent:{
        backgroundColor:"#f4d179",
        paddingVertical:5
        

    },
    btnLabel:{
        fontSize:18,

    },
    btn:{
        
        marginTop:10
    }



})
