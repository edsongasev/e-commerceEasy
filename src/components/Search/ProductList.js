import React from 'react'
import { StyleSheet, Text, View ,ScrollView,Image,TouchableWithoutFeedback} from 'react-native'
import {map} from 'lodash'
import {Button} from 'react-native-paper'
import colors from '../../styles/colors'
import {API_URL} from '../../utils/constants'
import {useNavigation} from '@react-navigation/native'



export default function ProductList({products}) {
         const navigation = useNavigation();
    const calcPrice = (price,disscount)=>{

        if(!disscount) return parseInt(price).toLocaleString("en-US")

        const disscountAmmount = (price * disscount) /100
        const result = (price-disscountAmmount).toFixed(2)
        return parseInt(result).toLocaleString("en-US")
    }

    const goToProduct = (id)=>{
       navigation.push("product",{idProduct:id})
    }
    
    
    return (
                <ScrollView contentContainerStyle={styles.container}>
                        <Text style={styles.title}>RESULTADOS</Text>
                      
                        {map(products, (product) => (
                            
                             
                          
                        
                        <TouchableWithoutFeedback
                            key={product.id}
                            onPress={() => goToProduct(product.id)}
                        > 
                            <View style={styles.product}>
                            <View style={styles.containerImage}>
                                <Image
                                style={styles.image}
                                source={{
                                    uri: `${API_URL}${product.image_principal.url}`,
                                }}
                                />
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
                                {product.title}
                                </Text>
                                <View style={styles.prices}>
                                <Text style={styles.currentPrice}>
                                    {calcPrice(product.price, product.discount)} $
                                </Text>
                                {product.discount && (
                                    <Text style={styles.oldPrice}>{parseInt(product.price).toLocaleString("en-US")} $</Text>
                                )}
                                </View>
                                <Button style={styles.btn} color={colors.primary}>
                                Ver producto
                                </Button>
                            </View>
                            </View>
                        </TouchableWithoutFeedback>
                        ))}
            </ScrollView>
)}

const styles = StyleSheet.create({
    container: {
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    title: {
      fontWeight: "bold",
      fontSize: 19,
      marginBottom: 5,
    },
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
      width: "60%",
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
    btn: {
      position: "absolute",
      bottom: 10,
      left: 0,
      right: 0,
    },
  });