import axios from "axios";

const API_URL = 'http://localhost:4000/api';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_URL;

export const GetCategories = async() => {
    try{
        const res = await axios.get('/categories');
        return (res.data)
    }catch(error){
        throw error;
    }
}

export const GetTopCategories = async() => {
    try{
        const res = await axios.get('/top-categories');
        return (res)
    }catch(error){
        throw error;
    }
}