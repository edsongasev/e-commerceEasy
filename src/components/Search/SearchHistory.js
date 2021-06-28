import React ,{useState,useEffect}from 'react'
import { StyleSheet, 
    Text,
     View ,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableNativeFeedback,
  } from 'react-native'
import colors from '../../styles/colors'
import {getSearchHistoryApi} from '../../api/search'
import {map} from 'lodash'

import AwesomeIcon from 'react-native-vector-icons/FontAwesome'

export default function SearchHistory({showHistory,containerHeight,onSearch}) {
    const [history, setHistory] = useState(null)

    useEffect(() => {
       if(showHistory){
           (async () =>{

            const response = await getSearchHistoryApi();
            setHistory(response)
           })()

       }
    }, [showHistory])
    return (
        
        
            <View  style={[showHistory ? styles.history :styles.hidden,{top:containerHeight,}]}> 
                { history && (

                    map(history, (item,index) =>(
                        <TouchableWithoutFeedback key={index} onPress={() => onSearch(item.search)}>

                            <View style={styles.historyItem}>
                                <Text style={styles.textHistory}>{item.search}</Text>
                                <AwesomeIcon name="arrow-right"  size={15}/>
                            </View>




                        </TouchableWithoutFeedback>

                    ))


                )}
            </View>
        
    )
}

const styles = StyleSheet.create({

   

    hidden:{
        display:"none"
    },
    history:{
       
    
        position:'absolute',
        backgroundColor:colors.bgLigth,
        width:Dimensions.get("window").width,
        height:Dimensions.get("window").height,
        zIndex:1,
     
       
    },
    historyItem:{
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderWidth: 0.3,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
 
    

    },
    textHistory:{
        
        color: "#53005f",
        fontSize: 16,
        fontWeight: "bold",


    }
})
