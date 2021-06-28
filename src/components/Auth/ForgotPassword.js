import React ,{useState}from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {TextInput,Button} from 'react-native-paper'
import {formStyles} from '../../styles'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import Toast from 'react-native-root-toast'

import {userforgotPassword}from '../../api/user'
import { RootSiblingParent}from 'react-native-root-siblings'


import ChangePasswordForgot from './ChangePasswordForgot'

export default function ForgotPassword({changeForgot}) {

    const [loading, setLoading] = useState(false)
    const [passworToken, setPassworToken] = useState(false)
    const changeToPasswordToken = () => setPassworToken(!passworToken);


   


    const formik = useFormik({
        initialValues : initialValues (),
        validationSchema : Yup.object(validationSchema()),
        onSubmit: async (formData)=>{
            setLoading(true)
            try {

                const response = await userforgotPassword(formData)
                console.log(response)
                if (response.statusCode) throw "Error al enviar el email"
                
                changeToPasswordToken()
                setLoading(false)
                
            } catch (error) {
                Toast.show(error,{
                    position: Toast.positions.CENTER
                })
                

                setLoading(false)
                
            }

        }
    })

   if (passworToken){
       return <ChangePasswordForgot changeToPasswordToken={changeToPasswordToken}/>
   }else{
       

        
        return (

            <RootSiblingParent>

            
                
            
            
            <View style = {styles.container}>
                    <TextInput
                        label ="Email de su cuenta"
                        style={formStyles.input}
                        error={formik.errors.email}
                        value={formik.values.email}
                        onChangeText = {(text)=>formik.setFieldValue("email",text)} />
                        <Button
                            mode="contained"
                            loading={loading}
                            onPress={formik.handleSubmit}
                            style = {formStyles.btnSucces}>
                            Enviar Correo Recuperacion
                        </Button>
                        <Button
                    
                        style={formStyles.btnText}
                        labelStyle={formStyles.btnTextLabel}
                        mode = "text"
                        onPress={changeForgot}>
                            Volver
                    </Button>
                    

                </View> 
            
            </RootSiblingParent>
        )
    }
}

function initialValues (){
    return {
        email :""
    }
}

function validationSchema() {
    return {
        email: Yup.string().email(true).required(true)
    }
}

const styles = StyleSheet.create({
    container:{
        padding:10
    }
})
