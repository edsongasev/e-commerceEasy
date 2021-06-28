import React from 'react'
import { StyleSheet, Text, View ,Alert} from 'react-native'
import {Button}from 'react-native-paper'
import{map} from'lodash'
import colors from "../../styles/colors"
import {deleteAddressApi} from '../../api/address'
import useAuth from '../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'

export default function AddressList({addresses,setReloadAddresses}) {
    const {auth} =useAuth();
    const navigation = useNavigation()


    const deleteAddresAlert = (addresses) =>{
        Alert.alert(
            "Eliminando direccion",
            `¿Estas seguro de que quiere eliminar la direccion ${addresses.title}`,
            [
                {
                    text:"No"
                },
                {
                    text:"Si",
                    onPress: () => deleteAddress(addresses.id)
                }
            ],
            {cancelable: false}
        )
    }


    const deleteAddress  = async (idAddress) =>{

        try { 

            const response = await deleteAddressApi(auth,idAddress);
           
            setReloadAddresses(true)
           
            
            
        } catch (error) {
            console.log(error)
            
        }

    }

    const goToUpdateAddress = (idAddress) =>{

        navigation.navigate("add-address",{idAddress})

    }
    return (
        <View style={styles.container}>
            {map(addresses,(address)=>(
                <View key={address.id} style ={styles.address}>
                    <Text   style={styles.title}>{address.title}</Text>
                    <Text >{address.name_lastname}</Text>
                    <Text >{address.address}</Text>
                    <View style={styles.blockLine}>
                        <Text >{address.state}, </Text>
                        <Text >{address.city}, </Text>
                        <Text >{address.postal_code}</Text>

                    </View>
                    <Text>{address.country}</Text>
                    <Text>Numero de Telefono:{address.phone}</Text>
                    <View style = {styles.actions}>
                        <Button mode="contained"  color={colors.primary} onPress={() =>goToUpdateAddress(address.id)}>Editar</Button>
                        <Button mode="contained" color={colors.danger} onPress={() =>deleteAddresAlert(address)}>Eliminar</Button>

                    </View>
                  


                </View>

            ))}
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        marginTop:50,
        
    },
    address:{
        borderWidth:0.9,
        borderRadius:5,
        borderColor:"#ddd",
        paddingHorizontal:15,
        paddingVertical:15,
        marginBottom:15
    },title:{
        fontWeight:"bold",
        paddingBottom:5,

    },
    blockLine:{
        flexDirection:"row"

    },
    actions:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:30
    }

})
