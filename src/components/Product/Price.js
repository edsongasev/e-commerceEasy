import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Price({price,discount}) {
    const calcPrice = (price,discount) =>{
        if (!discount) return parseInt(price).toLocaleString("en-US")

        const discountAmount = (price * discount) /100;
       const finalPrice = (price - discountAmount).toFixed(2)
       return parseInt(finalPrice).toLocaleString("en-US")

    }
    return (
        <View >
           {discount && (
               <View style={styles.containerData}>
                   <Text style={styles.dataText}>
                       Precio recomendado:
                   </Text>
                   <Text style={[styles.dataValue,styles.oldPrice]}>{parseInt(price).toLocaleString("en-US")}$</Text>
               </View>
           )}

           <View style={styles.containerData} >
           <Text style={styles.dataText}>
              Precio:
               
           </Text>
           <Text style={[styles.dataValue,styles.currentPrice]}>
               {`${calcPrice(price,discount)} $`}
               
           </Text>

           </View>
           {discount && (
               <View style={styles.containerData}>
                    <Text style={styles.dataText}>
                        Descuento

                    </Text>
                    <Text
                      style={[styles.dataValue,styles.saving]}>
                            {parseInt(((price * discount)/100).toFixed(2)).toLocaleString("en-US")}$({ discount}%)
                    </Text>

               </View>
           )}
 
        </View>
    )
}

const styles = StyleSheet.create({

    containerData:{
        flexDirection:"row",
        paddingVertical:5,
        alignItems:"center"
    },
    dataText:{
        fontSize:15,
        width:"45%",
        color:"#747474",
        textAlign:"right"
    },
    dataValue:{
        width:"55%",
        fontSize:18,
        padding:5
    },
    oldPrice:{
        textDecorationLine:"line-through"
    },
    currentPrice:{
        fontSize:23,
        color:"#bc0e0d"

    },
    saving:{
        color:"#bc0e0d"

    }
})
