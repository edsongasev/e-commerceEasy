import React from 'react'
import { StyleSheet, Text, View,Alert } from 'react-native'
import {List} from 'react-native-paper'
import {useNavigation} from '@react-navigation/native'
import useAuth from '../../hooks/useAuth'




export default function Menu(props) {
    const navigation = useNavigation();
    const {logout} = useAuth();
    
    const logoutAccount = () =>{
        Alert.alert(
            "Cerrar sesión",
            "¿Estas seguro de que quieres salir de cuenta",
            [
                {
                    text:"No",
                },
                {
                    text:"Si",
                    onPress: logout,

                }
            ],
            {cancelable:false}
        )

    }

   
    return (
        <View  >
            <List.Section>
                <List.Subheader>
                    Mi Cuenta
                </List.Subheader>
                <List.Item
                    title ="Cambiar nombre"
                    onPress={()=> navigation.navigate("change-name")}
                    left ={(props)=> <List.Icon {...props}icon="face"/>}
                    description="Cambia el nombre de tu cuenta"
                />
                <List.Item
                    title ="Cambiar email"
                    onPress={()=>navigation.navigate("change-email")}
                    left ={(props)=> <List.Icon {...props}icon="at"/>}
                    description="Cambia el email de tu cuenta"
                />
                <List.Item
                    title ="Cambiar username"
                    onPress={()=> navigation.navigate("change-username")}
                    left ={(props)=> <List.Icon {...props}icon="sim"/>}
                    description="Ir a cambiar el username"
                />
                <List.Item
                    title ="Cambiar contraseña"
                    onPress={()=> navigation.navigate("change-password")}
                    left ={(props)=> <List.Icon {...props}icon="key"/>}
                    description="Cambia la contraseña de tu cuenta"
                />
                <List.Item
                title="Mis direcciones"
                left={(props)=><List.Icon {...props} icon = "map"/>}
                onPress={()=> navigation.navigate("addresses")}
                description="Administra tus direcciones de envio"
                    />
                
            


            </List.Section>

            <List.Section>
                <List.Subheader>
                    App

                </List.Subheader>
                <List.Item 
                style={{zIndex:2}}
                onPress={()=> navigation.navigate("orders")}
                title="Pedidos"
                description="Listado de todos los pedidos"
                left={(props)=> <List.Icon {...props} icon="clipboard-list"/>}
                />
              
                
               
                <List.Item 
                onPress={()=> navigation.navigate("favorites")}
                title="Lista de deseos"
                description="Listados de todos los productos que te quieres comprar"
                left={(props)=> <List.Icon {...props} icon="heart"/>}
                />
                <List.Item
                onPress={()=> navigation.navigate("contact")}
                title="Contactanos"
                description="Contactanos para cualquier duda o sugerencia..."
                left={(props)=> <List.Icon {...props} icon="phone"/>}
                />
                <List.Item
                
                title="Cerrar Sesion"
                description="Cerrar sesion e iniciar sesion con otra cuenta.."
                left={(props)=> <List.Icon {...props} icon="logout"/>}
                onPress={logoutAccount}/>
                


            </List.Section>
       </View>
    )
}

const styles = StyleSheet.create({})
