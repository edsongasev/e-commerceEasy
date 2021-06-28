import React ,{useState,useCallback}from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {useFocusEffect,useNavigation} from '@react-navigation/native'
import {TextInput,Button}from 'react-native-paper'
import {updateUserApi,getMeApi} from '../../api/user'
import {formStyles}from '../../styles'
import {useFormik}  from 'formik'
import * as Yup from 'yup'
import Toast from 'react-native-root-toast'
import useAuth from '../../hooks/useAuth'
import { RootSiblingParent}from 'react-native-root-siblings'


export default function ChangeUserName() {
    const [loading, setLoading] = useState(false)
    const {auth} = useAuth();
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() =>{
            (async ()=>{

                const response = await getMeApi(auth.token)
                await formik.setFieldValue ("username",response.username)

            })()

        },[]),
    )



    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema :Yup.object(validationSchema()),
        onSubmit:  async (formData) =>{
            setLoading(true)
            try {
                const response = await updateUserApi(auth,formData)
                
                if (response.statusCode) throw  "el nombre de usuario ya existe"
                navigation.goBack();


                
                
            } catch (error) {
                Toast.show(error,{
                    position:Toast.positions.CENTER
                })

                formik.setFieldError("username",true)
                setLoading(false)
                
            }

        }
    })

    
    return (
        <RootSiblingParent >
            <View style = {styles.container}>
                <TextInput 
                style={formStyles.input}
                label = "username"
                onChangeText = {(text) => formik.setFieldValue("username",text)}
                error={formik.errors.username} 
                value={formik.values.username}
                />

                <Button
                mode="contained"
                loading={loading}
                onPress={formik.handleSubmit}
                style = {formStyles.btnSucces}>
                    Guardar Cambios
                </Button>
            </View>
        </RootSiblingParent>
    )
}

function initialValues (){
    return {
        username:""
    }
}

function validationSchema(){
    return {
        username : Yup.string().min(4,true).required(true)
    }
}

const styles = StyleSheet.create({

    container:{
        padding:20,
     
    }
})
