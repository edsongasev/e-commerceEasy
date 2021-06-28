import {API_URL} from '../utils/constants'


export async function getContactApi() {
    try {

        const url = `${API_URL}/contact`
       
        const response =  await fetch(url)
        const result = await response.json()
        return result 
        
        
    } catch (error) {
        console.log(error);

        return null
        
    }
}