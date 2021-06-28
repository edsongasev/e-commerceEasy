import React,{useState} from 'react'
import { StyleSheet, Text, View ,Image,ActivityIndicator} from 'react-native'
import {Button,IconButton}  from 'react-native-paper'
import {API_URL} from '../../utils/constants'
import colors from '../../styles/colors'
import {useNavigation}  from '@react-navigation/native' 
import {deleteFavoriteApi} from '../../api/favorite'
import useAuth from '../../hooks/useAuth'


export default function ProductFavorites({item,setReloadFavorites}) {
    const navigation = useNavigation()
    const {auth} = useAuth()
    const [loading, setLoading] = useState(false)

    const calcPrice = (price,discount) =>{

        if (!discount) return parseInt(price).toLocaleString()

        const discountPrice = (price * discount)  /100

        const totalDiscount = (price-discountPrice).toFixed(2)
        return parseInt(totalDiscount).toLocaleString()

    }


    const goToProduct  = (id)=> {
        navigation.navigate("product",{idProduct:id})
    }
    const deleteFavoriteProduct  =  async (id)=> {
        setLoading(true)
        await deleteFavoriteApi(auth,id)
        setReloadFavorites(true);
        setLoading(false)
    }


    return (
        <View style={styles.product}>
            <View style={styles.containerImage}>
                <Image source={{uri:`${API_URL}${item.product.image_principal.url}`}}  style={styles.image}/>
            </View>
                <View style={styles.info}>
                        <View style={styles.containerDelete}>
                            <IconButton 
                            onPress={()=>deleteFavoriteProduct(item.product.id)}
                            icon="close"
                            color="#fff"
                            style={styles.btnDelete}
                            size={10}/>

                        </View>

                    <View style= {styles.containerTitle}>
                    
                    
                    <Text numberOfLines={3} ellipsizeMode="tail"  style={styles.name}>{item.product.title}</Text> 
                    

                    </View>
                    <View style={styles.price}>
                        <Text style={styles.currentPrice}>{calcPrice(item.product.price,item.product.discount)} $</Text>
                        {item.product.discount && (<Text style={styles.priceOld}>{item.product.price}</Text>)}
                        

                    </View>
                    <View style={styles.btnContainer}>
                    <Button  onPress={()=> goToProduct(item.product.id)}  style={styles.btnProduct} mode="contained" color ={colors.primary}>
                        Ver Producto
                    </Button>
                
                </View>


            </View>
            
            {loading  && <View style={styles.loading}><ActivityIndicator size="large" /></View>}
        
        </View>
    )
}


const styles = StyleSheet.create({
    product: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
      borderRadius: 5,
      borderWidth: 0.5,
      borderColor: "#dadde1",
      
       
    },
    containerImage: {
      width: "40%",
      height: 200,
      backgroundColor: "#ebebeb",
      padding: 5,
    },
    image: {
      height: "100%",
      resizeMode: "contain",
    },
    info: {
       
      padding: 10,
      paddingTop:5,
      paddingRight:1,
      width: "60%",
      justifyContent: "space-between",
    },
    name: {
      fontSize: 16,
    },
    prices: {
      flexDirection: "row",
      marginTop: 5,
      alignItems: "flex-end",
    },
    currentPrice: {
      fontSize: 22,
    },
    oldPrice: {
      marginLeft: 7,
      fontSize: 14,
      color: "#747474",
      textDecorationLine: "line-through",
    },
    btnsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      position: "relative",
      width: "100%",
    },
    containerDelete:{
       
        justifyContent:"flex-end",
        flexDirection:"row",
    },
    btnDelete: { 
        
      backgroundColor: colors.primary,
      borderRadius: 10,
      margin: 0,
      width: 18,
      height: 18,
      marginHorizontal:10,
     backgroundColor:colors.danger
    },
    loading: {
      backgroundColor: "#000",
      opacity: 0.4,
      position: "absolute",
      width: "100%",
      height: "100%",
      borderRadius: 5,
      justifyContent: "center",
    },
  });