import React,{useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {map} from 'lodash'
import {API_URL} from '../../utils/constants'
import {getOneProductApi} from '../../api/product'
import {} from '@react-navigation/native'

import ScreenLoading from '../../components/ScreenLoading'
import ProductCart from './ProductCart'
export default function ProductListCart(props) {
        const {setReloadCart,cart,products,setProducts,settotalPayment} =props;
    useEffect(() => {
        (async()=>{
            setProducts(null);
               
            const productTemp = []
            let totalPaymentTem = 0;
                 for await (const product of cart ){
                    const response = await getOneProductApi(product.idProduct)
                    response.quantity=product.quantity
                    productTemp.push(response)

                    const price = calcPrice(response.price,response.discount)
                    totalPaymentTem += price  *product.quantity  }



                
               

             setProducts(productTemp)
             
             settotalPayment(totalPaymentTem)


        })()
    
      
    }, [])
    return (
        <View>
            <Text style={styles.title}>Productos:</Text>
            { map(products,(product)=>(
               
                    <ProductCart 
                  
                     key={product.id} 
                     product={product}
                     setReloadCart={setReloadCart}/>
                ))}
        </View>
    )
}

function  calcPrice (price,discount){
    if(!discount) return price
        const discountAmount= (price * discount) / 100
        const total= (price-discountAmount)
        return total
}

const styles = StyleSheet.create({
    title:{
        fontWeight:'bold',
        fontSize:18
    }


})
