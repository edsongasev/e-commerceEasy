import React ,{useEffect}from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import {map, size} from 'lodash'
import colors from '../../styles/colors'
import ScreenLoading from '../ScreenLoading'
import { Button } from 'react-native-paper'
import {useNavigation}from '@react-navigation/native'


export default function AddressList({addresses,selectedAddress,setSelectedAddress}) {
    const navigation = useNavigation();
  
    useEffect(() => {
        
        addresses  && setSelectedAddress(addresses[0]);
        
    }, [addresses])

     const goToCreateAddress=()=>{
            navigation.navigate("create-address")
          

    }
    if(size(addresses) === 0){
        return(
        <View style={styles.btnContainer}>
                
                <Text style={styles.containerTitle}>Direccion de envio:</Text>
            <Button mode="outlined"  labelStyle={{fontSize:15 ,color:"#008F39"}} style={styles.btn} onPress={goToCreateAddress}>agregar direccion de envio</Button>
        </View>)
    }
  
    return (
        <View style={styles.container}>
          
          {!addresses  && <ScreenLoading text="Cargando Direcciones"/>}
          
            {map(addresses,(item)=>(
              <TouchableWithoutFeedback key={item.id} onPress={()=>setSelectedAddress(item)} >
                  <View   style={[
                                styles.address,
                                item.id === selectedAddress?.id && styles.checked,
                                ]}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text >{item.name_lastname}</Text>
                      <Text >{item.addres}</Text>
                      <View style={item.blockLine}>
                         <Text >{item.city}, </Text>
                         <Text >{item.state}, </Text>
                         <Text >{item.postal_code}</Text>

                      </View>
                      <Text>{item.country}</Text>
                      <Text >Numero de Telefono:{item.phone}</Text>

                  </View>

              </TouchableWithoutFeedback>

            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop: 50,
    },
    containerTitle: {
      paddingBottom: 10,
      fontSize: 18,
      fontWeight: "bold",
    },
    address: {
      borderWidth: 0.9,
      borderRadius: 5,
      borderColor: "#ddd",
      paddingHorizontal: 15,
      paddingVertical: 15,
      marginBottom: 15,
    },
    title: {
      fontWeight: "bold",
      
    },
    blockLine: {
      flexDirection: "row",
    },
    actions: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 30,
    },
    checked: {
      borderColor: colors.primary,
      backgroundColor: "#0098d330",
    },
    btn:{
       margin:10,
       
    },
    btnContainer:{
        margin:10
    }
  });