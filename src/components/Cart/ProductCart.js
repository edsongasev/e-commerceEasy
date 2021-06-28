import React ,{useState}from 'react'
import { StyleSheet, Text, View ,Image,TextInput} from 'react-native'
import{API_URL} from '../../utils/constants'
import colors from '../../styles/colors'
import {deleteProductCartApi,increaseProductCartApi,decrementProductCartApi} from '../../api/cart'


import { Button,IconButton} from 'react-native-paper'

export default function ProductCart(props) {
    const {product,setReloadCart} =props

    const calcPrice = (price,discount)=>{
        if(!discount) return parseInt(price).toLocaleString("en-US")
            const discountAmount= (price * discount) / 100
            const total= (price-discountAmount).toFixed(2)
            return parseInt(total).toLocaleString("en-US")
    }
    const deleteProductCart= async () =>{

        const response = await  deleteProductCartApi(product.id)
        if(response){
            setReloadCart(true)
        }

    }
    const increaseProductCart= async() =>{
        
        const response = await increaseProductCartApi(product.id)
        if (response){
            setReloadCart(true)
         
        
        }
      
    }

    const decrementProductCart= async() =>{
        
        const response = await decrementProductCartApi(product.id)
        if (response){
            setReloadCart(true)
         
          
        
        }
      
    }

    const calcDiscount=(price,discount) => {
        const result =( price * discount) /100
      return   parseInt(result).toLocaleString("en-US")

    }

    
    return (
        <View style={styles.container}>
            <View style={styles.containerImage}>
                <Image style={styles.image} source={{uri:`${API_URL}${product.image_principal.url}`}}/>
            </View>
            <View style={styles.info}>
                <View>
                    <Text numberOfLines={3} style={styles.name}>{product.title}</Text>
                    <View style={styles.prices}>
                        <Text style={styles.currentPrice}>   {calcPrice(product.price,product.discount)} $</Text>
             
                    </View>
                    {product.discount && 
                        <View style={styles.containerDiscount}>
                            <Text style={styles.discountTitle}>Ahorras:</Text>
                            <Text style={styles.discountValue}>{calcDiscount(product.price, product.discount)} $ ({product.discount}%)</Text>
                        </View>}
                </View>
                <View style={styles.btnsContainer}>

                    <View style={styles.selectQuantity}>
                        <IconButton onPress={increaseProductCart} icon="plus" color = "#fff" size={15} style={styles.btnQuantity} />
                        <TextInput style={styles.inputQuantity}  value={parseInt(product.quantity).toLocaleString("en-US")}/>
                        <IconButton onPress={decrementProductCart}  icon="minus" color = "#fff" size={15} style={styles.btnQuantity} />

                    </View>
                    <Button labelStyle={styles.btnDanger} color="#b12704" mode="contained" onPress={deleteProductCart}>Eliminar</Button>

                </View>
              

            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:15,
        borderRadius:5,
        borderWidth:0.5,
        borderColor:"#dadde1"


    },
    containerImage:{
        width:"40%",
        height:160,
        backgroundColor:"#ebebeb",
        padding:5


    },
    image:{
        height: "100%",
        resizeMode:'contain'

    },
    info:{
        padding:10,
        width:"60%",
        justifyContent:'space-between'
    },
    name:{
        fontSize:16

    },
    prices:{
        flexDirection:'row',
        marginTop:5,
        alignItems:"flex-end"


    },
    currentPrice:{
        fontSize:18,
        color:"#b12704"

    },
    btnsContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        position:"relative",
        width:"100%",

    },
    selectQuantity: {
        flexDirection: "row",
        alignItems: "center",
      },
      btnQuantity: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        margin: 0,
      },
      inputQuantity: {
        paddingHorizontal: 5,
        fontSize: 16,
        textAlign:'center'
      },
      btnDanger:{
        
          fontSize:10
      },
      containerDiscount:{
          flexDirection:"row",
          alignItems:'center',
          paddingVertical:5
      },
      discountTitle:{
          fontSize:14,
          color:"#747474"
      },
      discountValue:{
        fontSize:14,
        color:"#747474",
        paddingLeft:5
    },

      
    
})
