import React,{useState,useCallback} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {TextInput,Button,} from 'react-native-paper'
import {useFocusEffect,useNavigation} from '@react-navigation/native'
import {getMeApi,updateUserApi} from '../../api/user'
import useAuth from '../../hooks/useAuth'

import {formStyles,} from '../../styles'
import { useFormik} from 'formik'
import * as Yup from 'yup'
import Toast from 'react-native-root-toast'
import { RootSiblingParent}from 'react-native-root-siblings'

export default function ChangeEmail() {

    const [loading, setLoading] = useState(false)
    const {auth} = useAuth()
    const navigation  = useNavigation()
    useFocusEffect(
        useCallback( () =>{
            ( async ()=>{

                const response = await  getMeApi(auth.token)
               
                    await formik.setFieldValue ("email",response.email)
              


            })()

        },[])

    )

    const formik = useFormik ({

        initialValues : initialValues(),
        validationSchema : Yup.object(validationSchema()),
        onSubmit :  async (formData) =>{
            setLoading(true)
            try {
                
               const response =  await updateUserApi(auth,formData)
                if (response.statusCode) throw "El email ya existe"
                navigation.goBack()
            } catch (error) {
                Toast.show(error,{
                    position: Toast.positions.CENTER
                })
                formik.setFieldError("email",true)
                setLoading(false)
                
            }
            

        }
    })
    return (
        <RootSiblingParent>
            <View style ={styles.container}>
                <TextInput 
                    label ="Email"
                    style = {formStyles.input}
                    onChangeText = { (text) => formik.setFieldValue("email",text)}
                    error = {formik.errors.email}
                    value = {formik.values.email}
                    
                />
                <Button 
                    mode ="contained"
                    style ={formStyles.btnSucces}
                    loading = {loading}
                    onPress = {formik.handleSubmit}

                
                
                >
                    Cambiar Email
                </Button>
            </View>
        </RootSiblingParent>
    )
}

function initialValues () {
    return {
        email:""
    }
}

function validationSchema () {

    return {

        email: Yup.string().email(true).required(true),

    }

}

const styles = StyleSheet.create({

    container:{
        padding:20,
      
    }
})
