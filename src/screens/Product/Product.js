import React ,{useState,useEffect}from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {getOneProductApi} from'../../api/product'
import Buy from '../../components/Product/Buy'
import CarouseImages from '../../components/Product/CarouseImages'
import DetallesProduct from '../../components/Product/DetallesProduct'
import Favorite from '../../components/Product/Favorite'
import Price from '../../components/Product/Price'
import Quantity from '../../components/Product/Quantity'
import ScreenLoading from '../../components/ScreenLoading'
import Search from '../../components/Search'
import StatusBarCustom from '../../components/StatusBarCustom'
import colors from '../../styles/colors'
import { RootSiblingParent}from 'react-native-root-siblings'



export default function Product({route}) {
    const [product, setProduct] = useState(null)
    const {params}= route
    const [images, setImages] = useState([])
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        setProduct(null);

        (async () =>{
                
          const response =  await getOneProductApi(params.idProduct)
            setProduct(response)
            const arrayImages = [response.image_principal]
                arrayImages.push(...response.images)
                setImages(arrayImages)
        })()
        
    }, [params])
    return (
        <RootSiblingParent>
            <StatusBarCustom backgroundColor={colors.bgDark} barstyle="light-content"/>
            <Search/>
            {!product ? <ScreenLoading text="Cargando Producto" size="large"/> 
            :<ScrollView style={styles.container}>
                <Text style={styles.title}>{product.title}</Text>
                 
                <CarouseImages images={images}/> 
                <View style={styles.containerView}>
                    <Price price ={product.price} discount={product.discount}/>
                    <Quantity quantity= {quantity} setQuantity={setQuantity}/>
                    <Buy product={product} quantity= {quantity} />
                    <Favorite product={product} />
                    <DetallesProduct product={product} />
                </View>

            </ScrollView> }
            
           
        </RootSiblingParent>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingBottom:50,
        
    },
    title:{
        fontWeight:"bold",
        fontSize:20,
        marginBottom:10,
        padding:10


    },
    containerView:{
        padding:10,
      // quitar esto 
       

    }


})
