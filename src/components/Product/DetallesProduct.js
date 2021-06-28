import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button}  from 'react-native-paper'

export default function DetallesProduct({product}) {
const [verMas, setVerMas] = useState(false)

const changeVerMas = ()=>(setVerMas(!verMas))

    return (
        <View style={styles.container}>
            <Text style={styles.Title}>{product.title}</Text>
            {!verMas ? 
            <>
            <Text style={styles.detalles} numberOfLines={3} ellipsizeMode='tail'>{product.description}</Text>
            
             <Button labelStyle={styles.btn} onPress={changeVerMas} > Ver mas..</Button>
             </>
             
            :
            <>
             <Text style={styles.detalles}>{product.description}</Text>  
             <Button labelStyle={styles.btn} onPress={changeVerMas} > Ver menos.. </Button>
            </>
            }
            
            
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        padding:20
    },
    Title:{
        fontSize:25,
        marginBottom:25
    },
    detalles:{
        fontSize:18
    },
    btn:{
        color:"#000FFF"

    }
})
