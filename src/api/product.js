import { API_URL } from "../utils/constants";


export async function getLastProductsApi(limit = 15 ){

    try {
        const url = `${API_URL}/products?_limit=${limit}&_sort=created_at:desc`
        const response = await fetch(url)
        const result = await response.json();
        return result 
    } catch (error) {
        console.log(error);
        return null 
    }



}

export async function getOneProductApi (id){
    try {

        const url = `${API_URL}/products/${id}`
        const response = await fetch(url)
        const result = await response.json();
        return result;
        
    } catch (error) {
        console.log(error);
        return null 
        
    }
}

export async function getAllProducts(){
     try {
         const url = `${API_URL}/products`
        const response = await  fetch(url)
        const result  =  await response.json()
        return result;
         
     } catch (error) {

        console.log(error)
        return null ;
         
     }
}