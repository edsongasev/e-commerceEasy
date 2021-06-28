import React ,{useState}from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {TextInput,Button} from 'react-native-paper'
import {formStyles} from '../../styles'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import Toast from 'react-native-root-toast'

import {userResetPassword}from '../../api/user'
import { RootSiblingParent}from 'react-native-root-siblings'
import useAuth from '../../hooks/useAuth'



export default function ChangePasswordForgot({changeToPasswordToken}) {
    const [loading, setLoading] = useState(false)
    const [token , setToken] = useState ("") 
    const {login} = useAuth()
   
   

    const formik = useFormik({
        initialValues : initialValues (),
        validationSchema : Yup.object(validationSchema()),
        onSubmit: async (formData)=>{
            setLoading(true)
            try {
                
                
                const response = await userResetPassword(formData)
                console.log(response)
                if (response.statusCode) throw "Error al Cambiar las contraseñas"
                login(response)
               
             
               
                
            } catch (error) {
                Toast.show(error,{
                    position: Toast.positions.CENTER
                })
                

                setLoading(false)
                
            }

        }
    })

   

    
    return (



        <RootSiblingParent>

          
            
        
            <View style = {styles.container}>
                <TextInput
                    label ="ingresa Token "
                    style={formStyles.input}
                    error={formik.errors.code}
                    value={formik.errors.code}
                    onChangeText = {(text)=>formik.setFieldValue("code",text)} />
                <TextInput
                    label ="Nueva Contraseña"
                    style={formStyles.input}
                    error={formik.errors.password}
                    value={formik.values.password}
                    onChangeText = {(text)=>formik.setFieldValue("password",text)}
                    secureTextEntry />
                 <TextInput
                    label ="Cofirma Contrasella "
                    style={formStyles.input}
                    error={formik.errors.passwordConfirmation}
                    value={formik.values.passwordConfirmation}
                    onChangeText = {(text)=>formik.setFieldValue("passwordConfirmation",text)}
                    secureTextEntry />
                    <Button
                        mode="contained"
                        loading={loading}
                        onPress={formik.handleSubmit}
                        style = {formStyles.btnSucces}>
                        Enviar Token
                    </Button>
                    <Button
                
                    style={formStyles.btnText}
                    labelStyle={formStyles.btnTextLabel}
                    mode = "text"
                    onPress={changeToPasswordToken}>
                        Volver
                </Button>
                

            </View> 
            
        
        
        
        </RootSiblingParent>
    )
}

function initialValues (){
    return {
        code: '', 
        password: '',
        passwordConfirmation: '',
        
    }
}

function validationSchema() {
    return {

        code:Yup.string().min(4,true).required(true),
        password: Yup.string().min(4,true).required(true),
        passwordConfirmation:Yup.string()
        .required(true)
        .oneOf([Yup.ref("password")],true)
        
    }
}

const styles = StyleSheet.create({
    container:{
        padding:10
    }
})
