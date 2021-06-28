import React from 'react'
import { StyleSheet, Text, View,FlatList,TouchableWithoutFeedback ,Image} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {API_URL} from '../../utils/constants'
import StatusBarCustom from '../../components/StatusBarCustom'
import Search from '../../components/Search'
import colors from '../../styles/colors'

export default function ProductCategorie({route}) {
    const {params} = route
    const {products,title}  = params
    const navigation = useNavigation();
    const goToProduct = (id) =>{
        navigation.push("product",{idProduct:id});
    }

    const renderItem = (item) =>{

        return(
            <View>
                <TouchableWithoutFeedback onPress={() =>goToProduct(item.id)}>
                
                    <View style={styles.container}>
                        <View style={styles.containerImage}>
                            <Image style={styles.image} source={{uri:`${API_URL}${item.image_principal.url}`}} />  
                        </View>
                        <View style={styles.containerInfo}>
                            <Text  style={styles.titleProduct}numberOfLines={3} ellipsizeMode="tail">{item.title}</Text>
                            <Text style={styles.price}> $ {parseInt(item.price).toLocaleString("en-US")}</Text>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </View>

        )

    }
    return (
        <>
            <StatusBarCustom backgroundColor={colors.bgDark} barstyle="light-content"/>
            <Search/>
            <View style={styles.mainContainer}>
                <Text style={styles.title}>{title}</Text>
                <FlatList  ListHeaderComponentStyle={
                    <Text style={styles.title}>Productos:</Text>}  keyExtractor={(item)=>(item.id).toLocaleString()} data={products} renderItem={({item})=>(renderItem(item))}/>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    mainContainer:{
        width:"100%",
        height:"100%"
    },
    title:{
        padding:8,
        fontSize:20,
        fontWeight:"bold",
        textAlign:'center',
        margin:20
    },

    container:{
        padding:5,
        flexDirection:"row",
        marginHorizontal:10,
        marginBottom:10,
        borderColor:"#f0f0f0f0",
        borderWidth:1.2,
        borderRadius:10,
        
        justifyContent:"space-between"
    },
    containerInfo:{
        flexDirection:"column",
        justifyContent:'flex-start',
        alignItems: 'center',
        padding:5,
        
       
        width:"50%",
        
      

    },
    containerImage:{
        backgroundColor:"#f0f0f0"


    },image:{
        width:150,
        height:150,
        resizeMode:'contain'

    },
    price:{

        marginTop:60,
        fontWeight:'bold',
        fontSize:22
        
        
    },
    titleProduct:{
        fontSize:18
    }
})
