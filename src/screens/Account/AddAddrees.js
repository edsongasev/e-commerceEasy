import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {TextInput,Button} from 'react-native-paper'
import {KeyboardAwareScrollView}from 'react-native-keyboard-aware-scroll-view'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {addAddressApi,getOneAddressesApi,updateAddressApi} from '../../api/address'
import {useNavigation} from '@react-navigation/native'

import {formStyles} from '../../styles'

import useAuth from '../../hooks/useAuth'
import ScreenLoading from '../../components/ScreenLoading'



export default function AddAddrees(props) {
    const {route:{params}} =props;
    const [loading, setLoading] = useState(false)
    const [newAddres, setNewAddres] = useState(false)
    const {auth} = useAuth()
    const [datosEdit, setDatosEdit] = useState(null)
    const navigation = useNavigation()
    useEffect(() => {
        (async ()=>{
            
            if(params?.idAddress){
                setNewAddres(true)
                setDatosEdit(false)
                navigation.setOptions({title:"Actualizar Direccion"})

                const response = await getOneAddressesApi(auth,params.idAddress)
                
                await formik.setFieldValue("id",response.id)
                await formik.setFieldValue("title",response.title)
                await formik.setFieldValue("name_lastname",response.name_lastname)
                await formik.setFieldValue("address",response.address)
                await formik.setFieldValue("postal_code",response.postal_code)
                await formik.setFieldValue("city",response.city)
                await formik.setFieldValue("state",response.state)
                await formik.setFieldValue("country",response.country)
                await formik.setFieldValue("phone",response.phone)
                setDatosEdit(true)
             
               

            }

        })()
    }, [params])


    const formik  = useFormik({
        initialValues: initialValues(),
        validationSchema:Yup.object(validationSchema()),
        onSubmit:  async (formData)=>{
            setLoading(true)
            try {

                
                if(newAddres){
                    await updateAddressApi(auth,formData)

                }else{
                    await addAddressApi(auth,formData)
                }
               
                navigation.goBack();
            } catch (error) {
                console.log(error)
                setLoading(false)
            }

            
        }
    })

    if(datosEdit === false){
        return <ScreenLoading text ={"Cargando Datos"} size={"large"}/>

    }
    return (
        <KeyboardAwareScrollView extraScrollHeight={25}>
            <View style={styles.container}>
                <Text style={styles.title}> Nueva Direccion</Text>

                <TextInput label ="titulo" 
                style={formStyles.input} 
                onChangeText={(text)=> formik.setFieldValue("title",text)}
                error={formik.errors.title}
                value={formik.values.title}
                />
                <TextInput 
                label ="Nombre y apellidos"
                style={formStyles.input}
                onChangeText={(text)=> formik.setFieldValue("name_lastname",text)}
                error={formik.errors.name_lastname}
                value={formik.values.name_lastname}
                />
                <TextInput label ="Direccion" 
                style={formStyles.input}
                onChangeText={(text)=> formik.setFieldValue("address",text)}
                error={formik.errors.address}
                value={formik.values.address}
                />
                <TextInput label ="Codigo Postal"
                style={formStyles.input} 
                onChangeText={(text)=> formik.setFieldValue("postal_code",text)}
                error={formik.errors.postal_code}
                value={formik.values.postal_code}
                />
                <TextInput label ="Estado"
                style={formStyles.input} 
                onChangeText={(text)=> formik.setFieldValue("state",text)}
                error={formik.errors.state}
                value={formik.values.state}
                />
                <TextInput label ="Pais"
                style={formStyles.input} 
                onChangeText={(text)=> formik.setFieldValue("country",text)}
                error={formik.errors.country}
                value={formik.values.country}
                />
                
                <TextInput label ="Ciudad"
                style={formStyles.input} 
                onChangeText={(text)=> formik.setFieldValue("city",text)}
                error={formik.errors.city}
                value={formik.values.city}
                
                />
                <TextInput label ="Telefono"
                style={formStyles.input}
                onChangeText={(text)=> formik.setFieldValue("phone",text)}
                error={formik.errors.phone}
                value={formik.values.phone}
                
                />
                
                <Button loading={loading} mode="contained" style={[formStyles.btnSucces,styles.btnSucces]} 
                 onPress={formik.handleSubmit}>{newAddres ?"Actualizar Direccion" : "Crear direcion"}
                 </Button>
            </View>
        </KeyboardAwareScrollView>
    )
}
function validationSchema(){
    return {
        title:Yup.string().required(true),
        name_lastname:Yup.string().required(true),
        address:Yup.string().required(true),
        postal_code:Yup.string().required(true),
        city:Yup.string().required(true),
        state:Yup.string().required(true),
        country:Yup.string().required(true),
        phone:Yup.string().min(10,true).max(10,true).required(true)


    }

}

function initialValues(){
    return {
        title:"",
        name_lastname:"",
        address:"",
        postal_code:"",
        city:"",
        state:"",
        country:"",
        phone:""


    }
}

const styles = StyleSheet.create({

    container:{
        padding: 20,
        zIndex:1
    },
    title:{
    fontSize:20,
    paddingVertical:20
    },
    btnSucces:{
        marginBottom:20
    }
})
