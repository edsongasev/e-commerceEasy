import { NavigationContainer } from '@react-navigation/native'
import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ForgotPassword from '../components/Auth/ForgotPassword'
import LoginForm from '../components/Auth/LoginForm'

export default function NavigationLogin({changueForm}){
        const [forgot, setForgot] = useState(false)
        const [passworToken, setPassworToken] = useState(false)


    const changeForgot = () => setForgot(!forgot);
   
    if (forgot){
        return (<ForgotPassword changeForgot={changeForgot}  />)
    }
    
    return (
       <LoginForm changueForm={changueForm}   changeForgot={changeForgot}/>
    )
}

const styles = StyleSheet.create({})
