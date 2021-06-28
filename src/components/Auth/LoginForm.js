import React ,{useState}from 'react'
import {loginApi} from '../../api/user'
import { StyleSheet, Text, View } from 'react-native'
import {TextInput,Button} from 'react-native-paper'
import *   as Yup from 'yup'
import Toast from 'react-native-root-toast'
import {useFormik} from 'formik'
import {formStyles} from '../../styles'
import useAuth  from '../../hooks/useAuth'
import { RootSiblingParent}from 'react-native-root-siblings'
import {KeyboardAwareScrollView}from 'react-native-keyboard-aware-scroll-view'


export default function LoginForm({changueForm,changeForgot}) {

    const [loading, setLoading] = useState(false)
    const [value,setValue] = useState({email:""})
    const {login} = useAuth();
   
    
   
    const formik = useFormik({
        initialValues:initialValues(),
        validationSchema:Yup.object(validationSchema()),
       onSubmit:  async (data) =>{
           setLoading(true)
           try {
               const response = await loginApi(data);
               if (response.statusCode) throw "Error en el usuario o contraseña"
              
               login(response)
               
           } catch (error) {
               Toast.show(error,{
                   position: Toast.positions.CENTER,
               })
               setLoading(false)
               
           }
           

       }


    })

    const validateText = (text) =>{
        setValue({email :[...value.email,text]})

        console.log(value)

    }

   


    
    return (
    
    
        <RootSiblingParent>


             
           <View>
                    <TextInput
                    onChangeText={(text) =>formik.setFieldValue("identifier",text)}  
                    error={formik.errors.identifier}
                        label="Email o Username"
                        style = {formStyles.input}
                        value={formik.values.identifier}
                    
                    //   theme={{
                        //   colors: {
                                //      placeholder: 'white', text: 'white', primary: 'white',
                        //              underlineColor: 'transparent', background: '#003489'
                        //     }
                        //}}
                    
                    />
                    <TextInput
                        onChangeText={(text) =>formik.setFieldValue("password",text)}
                        error={formik.errors.password}
                        label="Password"
                        style = {formStyles.input}
                        secureTextEntry
                        value={formik.values.password}
                    
                    />
                    
                    <Button
                        loading={loading}
                        onPress={formik.handleSubmit}
                        mode="contained"
                        style={formStyles.btnSucces}
                    >
                        Iniciar Sesion
                    </Button>
                
                    <Button
                        mode="text"
                        labelStyle={formStyles.btnTextLabel}
                        style={formStyles.btnText}
                        onPress={changueForm}>
                        Registrarse
                    </Button>
                    <Button
                        mode="text"
                        labelStyle={styles.forgotPassword}
                        style={styles.forgotPassword}
                        onPress={changeForgot}>
                        ¿olvido su contraseña ?
                    </Button>
                
                </View> 
        
                
            
        
        </RootSiblingParent>
    )
}

const styles = StyleSheet.create({
    forgotPassword:{
        
            marginTop:20,
            justifyContent:"center",
            fontSize:8,
            color:"#3b83bd",
    },
})


function initialValues(){

    return {
        identifier:"",
        password : "",
       
    }
}

function validationSchema(){
    return {

        identifier: Yup.string().required(true),
        password : Yup.string().required(true),

    }
}