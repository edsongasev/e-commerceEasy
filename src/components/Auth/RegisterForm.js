import React,{useState} from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import {TextInput,Button} from "react-native-paper"
import * as Yup from 'yup'
import Toast from 'react-native-root-toast'
import{useFormik}  from 'formik'
import {registerApi} from '../../api/user'
import {formStyles} from '../../styles'
import { RootSiblingParent}from 'react-native-root-siblings'
import {KeyboardAwareScrollView}from 'react-native-keyboard-aware-scroll-view'

export default function RegisterForm({changueForm}) {
    const [loading, setLoading] = useState(false)

    const formik = useFormik({

        initialValues:initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit:  async (data) => {
            setLoading(true);
           try {
               
            await  registerApi(data)
            changueForm();
            console.log("Ok")
           } catch (error) {
                setLoading(false)
               console.log(error)
               
                Toast.show("Error al registrar el usuario",{ position : Toast.positions.CENTER});
               
           }
          

        }
    })
    return (

        <RootSiblingParent>
            <ScrollView>
                <TextInput 
                    onChangeText= {(text) =>formik.setFieldValue("email",text)}
                    style = {[formStyles.input]}
                    label="Email" 
                    value={formik.values.email}
                    error ={formik.errors.email}/>
                <TextInput 
                    onChangeText= {(text) =>formik.setFieldValue("username",text)}
                    style = {[formStyles.input]}
                    label="Nombre de Usuario"
                    value={formik.values.username}
                    error ={formik.errors.username} />
            
                <TextInput 
                    onChangeText= {(text) =>formik.setFieldValue("password",text)}
                    style = {[formStyles.input]}
                    label="Contraseña" 
                    secureTextEntry
                    value={formik.values.password}
                    error ={formik.errors.password}/>
            
                <TextInput 
                    onChangeText= {(text) =>formik.setFieldValue("repeatPassword",text)}
                    style = {[formStyles.input]}
                    secureTextEntry
                    label="Repetir Contraseña" 
                    value={formik.values.repeatPassword}
                    error ={formik.errors.repeatPassword}/>
            
            <Button 
                    loading ={loading}
                    onPress ={formik.handleSubmit}
                    style = {formStyles.btnSucces}
                    mode="contained">
                Registrarse
            </Button>
            <Button
            
                style={[formStyles.btnText,{marginBottom:20}]}
                labelStyle={formStyles.btnTextLabel}
                mode = "text"
                onPress={changueForm}>
                Iniciar sesion
            </Button>
            
            </ScrollView>
        </RootSiblingParent>
        
    )
}

const styles = StyleSheet.create({

    containerScroll:{
        
      width:"100%",
      height:"90%",
      marginTop:0
    }
})


function initialValues () {
    return {
        email:"",
        username:"",
        password : "",
        repeatPassword:"",


    }
}

function validationSchema () {

    

    return {
        email:Yup.string().email(true).required(true),
        username:Yup.string().required(true),
        password : Yup.string().required(true),
        repeatPassword:Yup.string()
            .required(true)
            .oneOf([Yup.ref("password")],true),

    }

}