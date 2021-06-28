import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {getLastProductsApi} from '../../api/product'
import ListProduct from './ListProduct'
export default function NewProducts() {
    const [products, setProducts] = useState(null)

    useEffect(() => {
       (async ()=>{

        try {

            const response = await getLastProductsApi(10)
            setProducts(response)
            
        } catch (error) {
            
        }

       })()
    }, [])
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nuevos Productos</Text>
            {products && <ListProduct products ={products}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding:10,
        marginTop:20
    },
    title:{
        fontWeight:"bold",
        fontSize:20,
        marginBottom:10    },

})
