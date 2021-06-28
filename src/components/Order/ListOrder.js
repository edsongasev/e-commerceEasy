import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {map} from 'lodash'
import Order from './Order'
export default function ListOrder({orders}) {
    return (
        <View style={styles.container}>
            {map(orders ,(order)=> (
                  <Order order={order} key ={order.id}>Order...</Order>

            ))}
          
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        marginTop:20,marginBottom:40
    }
})
