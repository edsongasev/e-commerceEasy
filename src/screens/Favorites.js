import React ,{useState,useCallback}from 'react'
import { StyleSheet, Text, View } from 'react-native'
import  StatusBarCustom from '../components/StatusBarCustom'
import colors from  '../styles//colors'
import Search from '../components/Search/Search'
import {useFocusEffect} from '@react-navigation/native'
import {getFavoriteApi} from '../api/favorite'
import useAuth from '../hooks/useAuth'
import ScreenLoading from '../components/ScreenLoading'
import {size} from 'lodash'

import FavoriteList from '../components/Favorites/FavoriteList'
import Auth from './Auth'


export default function Favorites() {
    const [products, setProducts] = useState(null)
    const [reloadFavorites, setReloadFavorites] = useState(false)
    const {auth} = useAuth()

    useFocusEffect(

        useCallback(() =>{
            setProducts(null);
       
            (async () =>{
                if(auth){
                
                const response = await getFavoriteApi(auth)
                setProducts(response);}
                

            })()
            setReloadFavorites(false)
        },[reloadFavorites,auth])
    )




    if (!auth){return <Auth/>}
    return (
        <>
            <StatusBarCustom backgroundColor={colors.bgDark}   barStyle="light-content"/>
            <Search/>
            {!products ? (
             <ScreenLoading text="Cargando Favoritos" />
            ):size(products) === 0  ?
             (<View style={styles.container}>
                 <Text style={styles.title}>Lista de Favoritos</Text>
                  <Text>No tienes Favoritos</Text>
            </View>): (
               <FavoriteList products={products} setReloadFavorites={setReloadFavorites}/>

            )}
            
        </>
    )
}

const styles = StyleSheet.create({
    container : {
        paddingVertical:'50%',
        paddingHorizontal:10,
        
        justifyContent:"center",
        alignItems:'center',

        
        
    },
    title:{
        fontWeight:'bold',
        fontSize:19,
        marginBottom:5
    }
})
