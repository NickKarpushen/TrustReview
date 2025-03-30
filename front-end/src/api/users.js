import axios from "axios";

const API_URL = 'http://localhost:4000/api';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_URL;

export const SignUpUser = async(name, surname, email, password, passwordConfirm) => {
    try{
        const res = await axios.post ('/users', 
            {
                name: name, 
                surname: surname, 
                email: email, 
                password: password, 
                passwordConfirm: passwordConfirm, 
                role: 'user'
            });
        return res;
    }catch (error){
        throw error.response ? error.response : { message: error.message };
    }
}

export const Authentication = async(email, password, passwordConfirm) => {
    try{
        const res = await axios.post ('/authentication', {
            email: email, 
            password: password, 
            passwordConfirm: passwordConfirm
        })
        sessionStorage.setItem("token", res.data.token);
        return res.data;
    } catch (error){
        throw error.response ? error.response : { message: error.message };
    }
}

export const GetDataUser = async() => {
    try{
        const res = await axios.get('/users', {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `${sessionStorage.getItem("token")}`
            } 
        });

        return res.data
    }catch (error){
        throw error.response ? error.response : { message: error.message };
    }
}