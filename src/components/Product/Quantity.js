import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DropDownPicker from "react-native-dropdown-picker";
import colors from '../../styles/colors'
export default function Quantity({quantity,setQuantity}) {
    const [ open , setOpen ] = useState ( false ) ;   
    const [ value , setValue ] = useState ( null ) ;
    const [ items , setItems ] = useState ( [   
        { label : '1' , value : '1' } ,  
        { label : '2' , value : '2' }  ,  
        { label : '3' , value : '3' }  ,  
        { label : '4' , value : '4' }  ,
        { label : '5' , value : '5' }  ,
         
         
      ] ) ;

     


      
    return (
  
       
        < DropDownPicker
            labelStyle = { {
            color: "#000"
          } }
            placeholder={quantity}
            open = { open }
            value = { value}
            items = { items }
            setOpen = { setOpen }
            setValue = { setValue }
            setItems = { setItems }
            listMode="SCROLLVIEW"
            
            onChangeValue={(value) =>setQuantity(value)}
            containerStyle = { styles.containerStyle}
            style={styles.dropDownPicker}
           
            labelStyle={styles.labelStyle}
            textStyle={styles.textStyle}
        
           
        />
        
    )
}

const styles = StyleSheet.create({
    containerStyle: {
      height: 40,
      width: 100,
    },
    itemStyle: {
      justifyContent: "flex-start",
    },
    dropDownStyle: {
      backgroundColor: "#fafafa",
    },
    dropDownPicker: {
      zIndex:3,
      backgroundColor: "#fafafa",
    },
    labelStyle: {  fontWeight: "bold",
     
    },
    textStyle:{
        fontSize: 15
      }
})
