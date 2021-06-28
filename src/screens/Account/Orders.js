import React,{useState,useEffect,useCallback} from 'react'
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import StatusBarCustom from '../../components/StatusBarCustom'
import useAuth from '../../hooks/useAuth'
import {getOrderApi} from '../../api/order'
import { useFocusEffect } from '@react-navigation/core'
import {size} from 'lodash'
import colors from '../../styles/colors'
import ListOrder from '../../components/Order/ListOrder'

export default function Orders() {
    const [orders, setOrders] = useState(null)
    const {auth} = useAuth();
    useFocusEffect(
        useCallback(() => {
            (async ()=>{
                const response = await  getOrderApi(auth);
                setOrders(response);

            })()
        
        }, [])
    )
    
    return (
        <>
            <StatusBarCustom/>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Mis pedidos</Text>
                {!orders ? <ActivityIndicator size="large" style={styles.loading}/> 
                : size(orders)=== 0 ? <Text style={styles.noOrdersText}>No tiens pedidos</Text> 
                :<ListOrder orders={orders}/>}
            </ScrollView>
        </>
    )
}

var styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    title: {
      fontSize: 20,
    },
    addAddress: {
      borderWidth: 0.9,
      borderRadius: 5,
      borderColor: "#ddd",
      paddingHorizontal: 15,
      paddingVertical: 5,
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    noOrdersText: {
      textAlign: "center",
      paddingTop: 20,
      fontSize: 18,
    },
    loading: {
      marginTop: 20,
    },
  });