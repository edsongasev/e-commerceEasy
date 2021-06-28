import React ,{useState}from 'react'

import {API_URL} from '../../utils/constants'
import { Image, StyleSheet,Dimensions} from 'react-native'
import Carousel,{Pagination} from 'react-native-snap-carousel'
import {size} from 'lodash'

    const height = 500;
    const width = Dimensions.get("window").width;
export default function CarouseImages({images}) {


    const [imageActive, setImageActive] = useState(0)
   
    
   const renderItem = ({item}) =>{
       return (<Image style={styles.carousel} source={{uri:`${API_URL}${item.url}`}}/>)
       
   }
    return (
        <>
        <Carousel

            layout={"default"}
            data={images}
            sliderWidth={width}
            itemWidth={width}
            renderItem={renderItem}
            onSnapToItem={(index)=>setImageActive(index)}
    
         />
         <Pagination
            inactiveDotOpacity={0.4} 
            inactiveDotScale={0.6}
            dotsLength={size(images)} 
         activeDotIndex={imageActive} />
    </>
    )}

const styles = StyleSheet.create({

    carousel:{
        width,
        height,
        resizeMode:'contain'

    }

})
