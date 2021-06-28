import React,{useState,useCallback} from 'react'
import { StyleSheet, Text, View,Image,KeyboardAvoidingView, Platform } from 'react-native'
import {layoutStyle} from "../styles"
import logo from "../../assets/logo.png"
import RegisterForm from '../components/Auth/RegisterForm'
import {formStyles} from '../styles'

import NavigationLogin from '../navigation/NavigationLogin'
import { Button } from 'react-native-paper'
import {useFocusEffect} from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'




export default function Auth() {
    const [showLogin, setShowLogin] = useState(null)

    const changueForm = () => setShowLogin(!showLogin);

    useFocusEffect(
        useCallback(
            () => {
                if (!showLogin  === true ||!showLogin === false  ){
                     setShowLogin(null)
                }
               
            },
            [],
        )
    )

    const showForm = (value)=>{
        if (value === true){
            setShowLogin(true)
            
            
        }else{
            setShowLogin(false)
            

        }

    }
    return (
            <> 
                 {showLogin != null ?
                <ScrollView contentContainerStyle ={[layoutStyle.container,{marginBottom:70}]}>
                    <View style={styles.containerImage}>
                     <Image source = {logo} style = {styles.logo}  />
                     </View>
                   
                   
                        <KeyboardAvoidingView behavior={Platform.OS =="ios"  ? "padding": ""}>
                        {showLogin  ?  <NavigationLogin  changueForm={changueForm}/> : <RegisterForm changueForm = {changueForm}/>}
                        </KeyboardAvoidingView> 
                </ScrollView> : null}

                {showLogin === null ?
                <View style={layoutStyle.container}>
                     <View style={styles.containerImage}>
                        <Image source = {logo} style = {styles.logo}  />
                     </View>
                   
                        <Text style={styles.title}>{showLogin === null  ? "Inicia sesion para una mejor experiencia!!":null}</Text>
            
                        <Button mode="contained"  style={styles.btnStyle} contentStyle={[formStyles.btnSucces,]} onPress={ () =>showForm(true)}>Iniciar Sesion</Button>
                        <Button  mode="contained" style={styles.btnStyle} contentStyle={[formStyles.btnSucces,]} onPress={()=>showForm(false)}>Crear una Cuenta</Button>
                    
                </View>:  null  }

            </>
               
           
       )
}

const styles = StyleSheet.create({
    containerImage:{
        height:"40%"},
    logo:{
        width: "100%",
        height:300,
        resizeMode:"contain",
       
        
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        textAlign:"center",
        color:"#747474",
        paddingBottom:70
    },btnStyle:{
        marginTop:20
        


    }

})
