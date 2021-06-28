import{API_URL} from '../utils/constants'

export async function registerApi(formData) {
    try {
        const url = `${API_URL}/auth/local/register`   
        const params = {
            method:"POST",
            headers: {
                "Content-Type":"application/json"

            },
            body:JSON.stringify(formData),
        };

        const response = await fetch(url,params);
        const result = await response.json();
        console.log(result)
        return result;
        
    } catch (error) {
        console.log(error)
        return null;
    }

}


export async  function loginApi(data){
    try {
        const url= `${API_URL}/auth/local` ;
        const params = {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        };
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
        return null
        
    }
}

export async  function getMeApi(token){
    try {
        const url = `${API_URL}/users/me`
        const params = {
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
           
        }

        const response = await fetch(url,params)
        const  result = await response.json();
        return result;

        
    } catch (error) {
        
    }

}


export async function updateUserApi(auth,formData){
    try {
        const url = `${API_URL}/users/${auth.idUser}`
        const params  = {
            method : "PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${auth.token}`
            },
            body: JSON.stringify(formData)
            
        }
        const response = await fetch(url,params);
        const result = await response.json();
        console.log(result)
        return result;

        
    } catch (error) {
        console.log(error)

    }

}


export async function userforgotPassword (formData){
    try {
        const url = `${API_URL}/auth/forgot-password`
        const params  = {
            method : "POST",
            headers:{
                "Content-Type":"application/json",
                
            },
            body: JSON.stringify(formData)
            
        }
        const response = await fetch(url,params);
        const result = await response.json();
        return result;

        
    } catch (error) {
        console.log(error)

    }

}


export async function userResetPassword (formData){

    try {
        const url =  `${API_URL}/auth/reset-password`
        const params  = {
            method : "POST",
            headers:{
                "Content-Type":"application/json",
                
            },
            body: JSON.stringify(formData)
            
        }
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
        
    } catch (error) {
        
    }

}