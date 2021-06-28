import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {TextInput,Button} from "react-native-paper"
import {formStyles} from '../../styles'
import colors from '../../styles/colors'
import {useFormik} from 'formik'
import {fromPairs, size} from 'lodash'
import  * as Yup from 'yup'
import { ScrollView } from 'react-native-gesture-handler'
import {STRIPE_PUBLISHABLE_KEY} from '../../utils/constants'
import Toast from 'react-native-root-toast'
import {KeyboardAwareScrollView}from 'react-native-keyboard-aware-scroll-view'
import { RootSiblingParent}from 'react-native-root-siblings'
import {paymentCartApi,deleteCartApi} from '../../api/cart'
import useAuth from '../../hooks/useAuth'
import {useNavigation} from '@react-navigation/native'
const stripe = require("stripe-client")(STRIPE_PUBLISHABLE_KEY)

export default function Payment({route}) {
    const {params} = route
    const {selectedAddress,products,totalPayment} =params
    const [loading, setLoading] = useState(false)
    const {auth} = useAuth()
    const navigation = useNavigation()

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async  (formData)=>{
            setLoading(true)
          const result = await stripe.createToken({card:formData});
          
         
          if (result?.error){
            setLoading(false);
            Toast.show(result.error.message, {
                position: Toast.positions.CENTER,
              });
             
            }else{
                const response =  await paymentCartApi(
                     auth,
                     result.id,
                     products,
                     selectedAddress
                     );
                console.log(response);
               
                if(size(response)> 0){
                        
                    console.log("eliminar carrito ");
                    await deleteCartApi()
                    navigation.navigate("account",{screen:"orders"})
                    // navigate
                }else{
                    Toast.show("Error al realizar el pedido",{
                        position:Toast.positions.CENTER })
                 setLoading(false)
                }
           }

        }
        

    })
    return (

        <RootSiblingParent>

        <KeyboardAwareScrollView >

                <ScrollView>
                    <View style={styles.container}>

                        <Text style={styles.total}>Total a pagar : {parseInt(totalPayment).toLocaleString("en-US")} $</Text>
                        <Text style={styles.containerTitle}>Forma de pago</Text>
                        <TextInput  
                            value ={formik.values.name} 
                            error={formik.errors.name} 
                            onChangeText={(text =>formik.setFieldValue("name",text))} 
                            label ="Nombre de la tarjeta"style={formStyles.input}/> 
                        <TextInput  
                            value ={formik.values.number} 
                            error={formik.errors.number} 
                            onChangeText={(text =>formik.setFieldValue("number",text))} 
                            label="Numero de la tarjeta"style={formStyles.input}/>
                        <View style={styles.containerInputs}>
                            <View style={styles.containerMonthYearInputs}>
                                <TextInput 
                                    value ={formik.values.exp_month} 
                                    error={formik.errors.exp_month} 
                                    onChangeText={(text =>formik.setFieldValue("exp_month",text))}
                                    style={styles.inputDate}label="Mes"/>
                                <TextInput  
                                    value ={formik.values.exp_year} 
                                    error={formik.errors.exp_year} 
                                    onChangeText={(text =>formik.setFieldValue("exp_year",text))}  
                                    style={styles.inputDate}label="Año"/>

                            </View>
                        <TextInput  
                            value ={formik.values.cvc} 
                            error={formik.errors.cvc} 
                            onChangeText={(text =>formik.setFieldValue("cvc",text))} 
                            label ="CVV/CVC" style={styles.inputCvc}/>
                            
                            

                        </View>
                        <Button  loading={loading}mode="contained" contentStyle={styles.btnContent} labelStyle={styles.btnText} onPress={!loading  && formik.handleSubmit}>Pagar</Button>

                    </View>
                </ScrollView>
        </KeyboardAwareScrollView>
        </RootSiblingParent>
    )
}

function validationSchema() {
    return {
        number: Yup.string().min(16).max(16).required(true),
    exp_month: Yup.string().min(2).max(2).required(true),
    exp_year: Yup.string().min(2).max(2).required(true),
    cvc: Yup.string().min(3).max(3).required(true),
    name: Yup.string().min(6).required(true),
    }
}

function initialValues(){
    return {
            number: "",
        exp_month: "",
        exp_year: "",
        cvc: "",
        name: "",
        }
}

const styles = StyleSheet.create({
    total:{
        fontSize:30,
        fontWeight:"bold"

    },
    container: {
        padding:20,
      marginTop:10,
      marginBottom: 30,
    },
    containerTitle: {
      paddingBottom: 10,
      fontSize: 18,
      fontWeight: "bold",
    },
    containerInputs: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    inputCvc: {
      width: 120,
      paddingRight:20
    },
    containerMonthYearInputs: {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "flex-end",
    },
    inputDate: {
      width: 90,
      marginRight: 10,
    },
    btnContent: {
      paddingVertical: 4,
      backgroundColor: colors.primary,
    },
    btnText: {
      fontSize: 16,
    },
  });