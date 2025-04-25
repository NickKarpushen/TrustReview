import axios from "axios";

const API_URL = 'http://localhost:4000/api';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_URL;

export const GetUserReviews = async(user_id) => {
    try{
        const res = await axios.get('/user_reviews',{
            params: {
                user_id: user_id
            },
            headers:{
                'Content-Type': 'application/json',
                Authorization: `${sessionStorage.getItem("token")}`
            }
        })
        return(res.data.newReviews);
    }catch (error){
        throw error.response ? error.response : { message: error.message };
    }
}

export const GetReviews = async(company_id, user_id) => {
    try{
        const res = await axios.get('/reviews',{
            params: {
                company_id: company_id,
                user_id: user_id
            },
        })
        return(res.data.newReviews);
    }catch (error){
        throw error.response ? error.response : { message: error.message };
    }
}

export const ReviewCreate = async(file, title, text, rating, user_id, company_id) => {
    try{
        const formData = new FormData();
        formData.append('image', file)
        formData.append('title', title)
        formData.append('text', text)
        formData.append('rating', rating)
        formData.append('user_id', user_id)
        formData.append('company_id', company_id)

        const res = await axios.post('/review', formData,
        {
            headers:{
                Authorization: `${sessionStorage.getItem("token")}`
            }
        }
        );
        return res
    }catch (error){
        throw error.response ? error.response : { message: error.message };
    }
}

export const UpdateReview = async(title, text, file, review_id) =>{
    try{
        const formData = new FormData();
        formData.append('image', file)
        formData.append('title', title)
        formData.append('text', text)
        formData.append('review_id', review_id)

        const res = await axios.patch('/review', formData, 
            {
                headers:{
                Authorization: `${sessionStorage.getItem("token")}`
                } 
            }
        );
    console.log(res)
    }catch (error){
        throw error.response ? error.response : { message: error.message };
    }
}

export const DeleteReview = async(review_id) => {
    try{

        console.log("hello")

        const res = await axios.delete('/review', {
                params: { review_id },
                headers:{
                    Authorization: `${sessionStorage.getItem("token")}`
                } 
            }
        )

        console.log(res)
    }catch (error){
        throw error.response ? error.response : { message: error.message };
    }
}