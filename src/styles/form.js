import {StyleSheet} from 'react-native'
import colors from './colors'

const formStyles = StyleSheet.create({
    input :{
        marginBottom:20,
         borderTopColor:"#000000"
    },
    btnSucces:{
        padding:5,
        backgroundColor:colors.primary
    },
    btnDisable:{
        padding:5,
        backgroundColor:"#CDCDCD"
    },
    btnText:{
        marginTop:10
    },
    btnTextLabel:{
        color:colors.dark
    }



});

export default formStyles;