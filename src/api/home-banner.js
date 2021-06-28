import {API_URL}from '../utils/constants'

export async function getBannerApi(){
    try {
        const url = `${API_URL}/home-banners?_sort=position:asc`
        const response = await fetch(url)
        const result = response.json()
        return result 
        
    } catch (error) {
        console.log(error)
        return null 
        
    }

}