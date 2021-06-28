import React ,{useState,useCallback}from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import {getMeApi} from '../../api/user'
import Menu from '../../components/Account/Menu'
import Search from '../../components/Search'
import colors from '../../styles/colors'
import useAuth from '../../hooks/useAuth'
import UserInfo from '../../components/Account/UserInfo'
import StatusBarCustom from '../../components/StatusBarCustom'
import {useFocusEffect} from '@react-navigation/native'
import ScreenLoading from '../../components/ScreenLoading'
import Auth from '../Auth'
export default function Account() {
    const [user, setUser] = useState(null);
    const {auth} = useAuth();


 useFocusEffect(
     useCallback(() =>{
         (async ()=>{
             if(auth){
             
            const response = await getMeApi(auth.token)
            
           setUser(response)}
          

         })()

     },[])
         

 )
 useFocusEffect(
    useCallback( () => {
        
        },
        [auth],
    )
);
 
 

 if (!auth){return <Auth/>}
    
    return (
        <>
             <StatusBarCustom backgroundColor ={colors.bgDark}/>
             
            {!user ? (<ScreenLoading size ="large"  />) :
            (<>
                <Search/>
                <ScrollView>
               
                    
                     <UserInfo user = {user}/>
                     
                        <Menu/>
                     
                </ScrollView>

            </>)
            
            }


           


            
           
        </>
    )
}

