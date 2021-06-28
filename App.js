import React,{useState,useMemo,useEffect} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import AppNavigation from './src/navigation/AppNavigation';
import {Provider as PaperProvider } from 'react-native-paper';
import Auth from './src/screens/Auth';
import AuthContext from './src/context/AuthContext';
import {setTokenApi,getTokenApi,removeTokenApi} from './src/api/token'
import jwtDecode from 'jwt-decode'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';




export default function App() {
  const [auth, setAuth] = useState(undefined);
  
  
  
  useEffect(() => {
    (async () => {
      const token = await getTokenApi ();
      if (token){
        setAuth({
          token,
          idUser:jwtDecode(token).id
        })
      }else{
        setAuth(null)
      }

    })()
   
     
    
    
  }, [])

  const login =(user)=>{
   
    setTokenApi(user.jwt)
    setAuth({
      token:user.jwt,
      idUser:user.user.id

    })

  }

  const logout = () =>{
    if (auth){
      removeTokenApi();
      setAuth(null)


    }

  }


  // si son datos diferentes que nos llegan los va actualizar si no los va a obviar 
  const authData = useMemo(
    () =>({
      auth,
      login,
      logout,
      

    }),[auth]
  )


  return (
  
      <AuthContext.Provider
      value = {authData}
    
      >
        <PaperProvider >
          <AppNavigation/>  


        </PaperProvider>
      </AuthContext.Provider>

  );
}

const styles = StyleSheet.create({
  
});
