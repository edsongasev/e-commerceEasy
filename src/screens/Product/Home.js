import React,{useState,useCallback} from 'react'
import { StyleSheet, Text, View,ScrollView, ScrollViewComponent, FlatList } from 'react-native'
import AllProduct from '../../components/Home/AllProduct'
import Banner from '../../components/Home/Banner'
import NewProducts from '../../components/Home/NewProducts'
import Search from '../../components/Search'
import StatusBarCustom, {} from '../../components/StatusBarCustom'
import colors from '../../styles/colors'
import {useFocusEffect} from "@react-navigation/native"
import {getAllProducts} from '../../api/product'
import {getCategoriesApi} from '../../api/categories'
import Categories from '../../components/Product/Categories'

export default function Home() {
    const [allProduct, setAllProduct] = useState(null)
    const [categories, setCategories] = useState(null)

useFocusEffect(
    useCallback(
        () => {
          (async () =>{
              const response = await getAllProducts()
              setAllProduct(response);
              const responseCategories = await getCategoriesApi()
              setCategories(responseCategories)
          })()
        },
        [],
    )
)

  
    return (
        <>

        <StatusBarCustom backgroundColor={colors.bgDark}  barStyle ="light-content"/>
        <Search/>
        <FlatList ListHeaderComponent ={
            <> 
                <Banner/>
                <Categories  categories={categories} allProduct={allProduct}/>
                <NewProducts/>
                <AllProduct allProduct={allProduct}/>
            </>}/>
           
           

        
        </>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
      
    }
})
