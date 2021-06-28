import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'


import {TextInput,Button} from 'react-native-paper'
import {formStyles} from '../../styles'
import {useFormik} from 'formik'
import * as Yup from 'yup'


import ChangePasswordForgot from './ChangePasswordForgot'



export default function TokenConfirmation({changeForgot}) {
    
    const [loading, setLoading] = useState(false)
    const [token , setToken] = useState ("")
    const [showChagepassword, setshowChagepassword] = useState(false)
   
   

    const formik = useFormik({
        initialValues : initialValues (),
        validationSchema : Yup.object(validationSchema()),
        onSubmit: async (formData)=>{
            setLoading(true)
            setToken(formData.token)
           changePass()


            setLoading(false)
           

        }
    })

    const changePass = () => setshowChagepassword(!setshowChagepassword);

    if (showChagepassword){
        return <ChangePasswordForgot token = {token} changePass={changePass} />
    }

   

    
    return (

        

       
            
        
            <View style = {styles.container}>
                <TextInput
                    label ="ingresa Token "
                    style={formStyles.input}
                    error={formik.errors.token}
                    value={formik.values.token}
                    onChangeText = {(text)=>formik.setFieldValue("token",text)} />
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
                    onPress={changeForgot}>
                        Volver
                </Button>
                

            </View> 
            
        
        
      
    )
}

function initialValues (){
    return {
        token :""
    }
}

function validationSchema() {
    return {
        token: Yup.string().required(true)
    }
}

const styles = StyleSheet.create({
    container:{
        padding:10
    }
})
