import { useFocusEffect } from '@react-navigation/native'
import React ,{useCallback,useState}from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {getContactApi} from '../../api/contact'

export default function Contact() {
    const [contact, setContact] = useState(null )

    useFocusEffect(
        useCallback(
            () => {
                (async () =>{
                    const response = await getContactApi()
                    setContact(response)
                    

                })()
            },
            [],
        )

    )
    
    return (

        <View style={styles.container}>
            {contact ? <>
            <Text style={styles.titleLabel}>Email:</Text>
            <Text style={styles.label}>{contact.email}</Text>
            <Text style={styles.titleLabel}>Numero Telefono:</Text>
            <Text style={styles.label}>{contact.Phone}</Text>
            <Text style={styles.titleLabel}>Sobre Nosotros:</Text>
            <Text style={styles.label}>{contact.description}</Text>
            </> : <Text style={{fontSize:40,textAlign:"center",paddingVertical:100,color:"#747474"}} >Haciendo cambios intente de nuevo mas tarde....</Text>}
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        padding:20,

    },
    titleLabel:{
        fontSize:20,
        fontWeight:"bold",
        marginBottom:10
    },
    label:{
        fontSize:20,
        margin:15
    }
})
