import React from 'react'
import { Image,View, Text,StyleSheet} from 'react-native'
import {API_URL} from '../../utils/constants'
import {upperCase,size} from "lodash"
export default function Order({order}) {


    const updateDate =(date) =>{
            const showDate= new Date(date)
          
          return  `${ showDate.toLocaleDateString() }  Hora : ${showDate.toLocaleTimeString("es-Mx")}`
    }
    return (
        <View style={styles.container}>
        <View style={styles.containerImage}>
          <Image
            style={styles.image}
            source={{
              uri: `${API_URL}${order.product.image_principal.url}`,
            }}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
            {order.product.title}
          </Text>
          <Text>Fecha: {updateDate(order.created_at)}</Text>
          <Text>Cantidad: {order.quantity}</Text>
          <Text>Total pagado: {parseInt(order.productPayment).toLocaleString("en-US")} $</Text>
          <View style={order.status_pedidos === "enviado" ? styles.statusHecho : order.status_pedidos ==="cancelado" ? styles.statusCancelado :styles.status}>
           <Text 
           style={order.status_pedidos === "enviado" ? styles.statusOrderHecho : order.status_pedidos ==="cancelado" ? styles.statusOrdercancelado: styles.otherStatus}>{upperCase(order.status_pedidos)}</Text>
          </View>
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
      borderBottomWidth: 1,
      borderColor: "#ddd",
      marginHorizontal: -20,
      paddingVertical: 5,
      flexDirection: "row",
    },
    containerImage: {
      width: "30%",
      height: 120,
      padding: 10,
    },
    image: {
      height: "100%",
      resizeMode: "contain",
    },
    info: {
      width: "70%",
      justifyContent: "center",
    },
    name: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
    },
    statusHecho:{
      backgroundColor:"#BDECB6",
      width:"60%",
      height:40,
      borderWidth:1,
      borderColor:"#008f39"
      
    },
    statusOrderHecho:{
     justifyContent: 'center',
     margin:10,
     fontSize:15,
     color:"#008f39",
      textAlign:"center",
      
    },status:{
      backgroundColor:"#f0f0f0f0",
      width:"60%",
      height:40,
      borderWidth:1,
      borderColor:"#595d64"

    },
    otherStatus:{
      justifyContent: 'center',
      margin:10,
      fontSize:15,
      color:"#595d64",
       textAlign:"center",

    },statusCancelado:{
      backgroundColor:"#d36e70",
      width:"60%",
      height:40,
      borderWidth:1,
      borderColor:"#b32428"


    },statusOrdercancelado:{
      justifyContent: 'center',
      margin:10,
      fontSize:15,
      color:"#b32428",
       textAlign:"center",

    }
  
  });