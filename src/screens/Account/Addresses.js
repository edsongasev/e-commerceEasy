import React,{useCallback,useState} from 'react'
import { StyleSheet, Text, View,ScrollView ,TouchableWithoutFeedback,TouchableHighlight,ActivityIndicator} from 'react-native'
import {IconButton} from 'react-native-paper'
import {useFocusEffect,useNavigation }from '@react-navigation/native'
import {getAddressesApi}from '../../api/address'
import useAuth from '../../hooks/useAuth'
import {size}from 'lodash'
import AddressList from '../../components/Address/AddressList'




export default function Addresses() {
   
    const [reloadAddresses, setReloadAddresses] = useState(false)
    const [addresses, setAddresses] = useState(null)
    const {auth}  = useAuth()
    const navigation = useNavigation()

    useFocusEffect(
        useCallback(()=>{
            setAddresses(null);
            

            (async() =>{

                const response = await getAddressesApi(auth)
                setAddresses(response)
                setReloadAddresses(false)
                


            })()

        },[reloadAddresses])
    )



    return (
      <ScrollView style={styles.container}>
          <Text  style={styles.title}>Mis Direcciones</Text>
          <TouchableWithoutFeedback
          onPress={()=>navigation.navigate("add-address")}
          
          >
          <View style ={styles.addresses}>
              <Text style={styles.addAddressText}>Añadir una direccion</Text>

              <IconButton  icon="arrow-right"  color ="#000" size={19}/>
              

          </View>


          </TouchableWithoutFeedback>


         {!addresses ? (<ActivityIndicator size = "large" style={styles.loading}/>)
         : size(addresses) === 0 ? (<Text style={styles.noAddressText}>Crea tu primera direccion</Text>)
         :(
            <AddressList setReloadAddresses={setReloadAddresses} addresses={addresses}></AddressList>

         )
        
        }

      </ScrollView>
    )
}

const styles = StyleSheet.create({
    
    
    container:{
    padding:20,
      },
    title:{
        fontSize:20,
    },
    addresses:{

        borderWidth:0.9,
        borderRadius:5,
        borderColor:"#ddd",
        paddingHorizontal:15,
        paddingVertical:5,
        marginTop:10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    addAddressText:{
        fontSize: 16,

    },
    loading:{
        marginTop:20

    },
    noAddressText:{
        fontSize:16,
        marginTop:10,
        textAlign:"center"


    }
    
    
})
