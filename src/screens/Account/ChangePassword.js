import React , {useState,useCallback}from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {useFocusEffect,useNavigation} from '@react-navigation/native'
import {TextInput,Button} from 'react-native-paper'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {updateUserApi} from '../../api/user'
import {formStyles} from '../../styles'
import useAuth from '../../hooks/useAuth'
import Toast from 'react-native-root-toast'
import { RootSiblingParent}from 'react-native-root-siblings'


export default function ChangePassword() {
    const [loading, setLoading] = useState(false)
    const {auth,logout} = useAuth();
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema : Yup.object (validationSchema()),
        onSubmit:async  (formData) =>{
            setLoading(true)
            try {
              const response =   await updateUserApi(auth,formData)
              if (response.statusCode) throw  "erro al cambiar la contraseña"
                navigation.goBack();
            } catch (error) {
                Toast.show(error,{
                    position: Toast.positions.CENTER,
                })

                setLoading(false)
                
            }

        }
    })
    return (

        <RootSiblingParent>
            <View style = {styles.container}>
                <TextInput 
                    onChangeText={(text)=>formik.setFieldValue("password",text)}
                    style = {formStyles.input}
                    label = "Nueva Contraseña"
                    value = {formik.values.password}
                    error = {formik.errors.password}
                    secureTextEntry

                />
                <TextInput
                onChangeText={(text)=>formik.setFieldValue("confirmPassword",text)}
                    style = {formStyles.input}
                    label= "Confirmar contraseña"
                    value = {formik.values.confirmPassword}
                    error = {formik.errors.confirmPassword}
                    secureTextEntry />
                <Button 
                    onPress={formik.handleSubmit}
                    loading ={loading}
                    style = {formStyles.btnSucces}
                    mode ="contained">
                        Guardar Cambios
                </Button>
                
            </View>
        </RootSiblingParent>
    )
}
function initialValues () {
    return {
        password : "",
        confirmPassword:""

    }
}

function validationSchema (){
    return {
        password : Yup.string().min(4,true).required(true),
        confirmPassword: Yup.string().min(4,true)
            .oneOf([Yup.ref("password")],true)
            .required(true)
            
    }
}

const styles = StyleSheet.create({
    container:{
        padding:20,
    
    }
})
