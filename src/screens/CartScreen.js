import React,{useState,useCallback,useEffect} from 'react'
import { StyleSheet, Text, View ,ScrollView} from 'react-native'
import StatusBarCustom from '../components/StatusBarCustom'
import colors from '../styles/colors'
import {getProductCartApi} from '../api/cart'
import {useFocusEffect} from '@react-navigation/native'
import ScreenLoading from '../components/ScreenLoading'
import {size} from 'lodash'
import NotProducts from '../components/Cart/NotProducts'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import ProductListCart from '../components/Cart/ProductListCart'
import {getAddressesApi} from '../api/address'
import useAuth from '../hooks/useAuth'
import AddressList from '../components/Cart/AddressList'
import {formStyles} from '../styles'
import { Button, TextInput } from 'react-native-paper'
import {useNavigation} from '@react-navigation/native'
import Toast from 'react-native-root-toast'
import { RootSiblingParent}from 'react-native-root-siblings'
import Search from '../components/Search'
import Auth from './Auth'





export default function ScreenCart() {

    const [cart, setCart] = useState(null);
    const [products, setProducts] = useState(null)
    const [reloadCart, setReloadCart] = useState(false)
    const [addresses, setAddresses] = useState(null)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [totalPayment, settotalPayment] = useState(0)

    const navigation = useNavigation()
    const {auth} = useAuth()

    useFocusEffect(
        useCallback( () => {
            if (auth){
            setCart(null);
            setAddresses(null)
            setSelectedAddress(null)

              
              loadCart();
              loadAddresses();}
            },
            [],
        )
    );

    useFocusEffect(
        useCallback( () => {
            
            },
            [auth],
        )
    );

            useEffect(() => {
                if(auth){
             
                 if(reloadCart){  setCart(null);  loadCart()
               
                 setReloadCart(false);}}
               
            }, [reloadCart])
    
    const loadCart = async ()=>{
        
        const response =   await getProductCartApi();
      
       setCart(response)

    }

    const loadAddresses = async() =>{
        const response = await getAddressesApi(auth)
        setAddresses(response)
        console.log(response);

    }


    const goToPayment = () =>{

        if(totalPayment === null ){
            Toast.show("Agrege productos al carrito",{
                position:Toast.positions.CENTER

            })
            return null
        }

        navigation.navigate("buy-cart",{selectedAddress:selectedAddress,products:products,totalPayment:totalPayment})
        

    }

    if (!auth){return <Auth/>}
    
    return (
        <RootSiblingParent>

        

        <StatusBarCustom backgroundColor={colors.bgDark}/>
        {!cart  ?  <ScreenLoading />:   size(cart) === 0 ? (
             <>
               <Search/>
                <NotProducts/>
            </>
          ):
          <KeyboardAwareScrollView  extraScrollHeight={25}>

              <ScrollView style={styles.cartContainer}>
                  <ProductListCart  settotalPayment={settotalPayment} setReloadCart={setReloadCart} setProducts={setProducts}    products={products}   cart={cart}/>
                  <AddressList  selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress}addresses={addresses}/>
                  <Text style={styles.total}>TOTAL: $ {parseInt(totalPayment).toLocaleString("en-US")}</Text>
                  {!selectedAddress ?
                 ( <Button   mode="contained" contentStyle={formStyles.btnDisable} onPress={()=>Toast.show("Debes Tener al menos una direccion de envio",{position:Toast.positions.CENTER})}>Pagar</Button>) : 
                  (<Button   mode="contained" contentStyle={formStyles.btnSucces} onPress={goToPayment}>Pagar</Button>)
                  }
                  
              </ScrollView>
             
              
              
            </KeyboardAwareScrollView>}
        </RootSiblingParent>
    )
}

const styles = StyleSheet.create({
    
    cartContainer:{
        padding:10
    },
    total:{
        padding:15,
        fontSize:30,
        fontWeight:'bold'

    }
})
