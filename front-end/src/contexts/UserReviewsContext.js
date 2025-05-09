import React, {createContext, useContext, useState, useEffect} from "react";
import { GetUserReviews } from "../api/review";
import { useUser } from "./UserContext";

const UserReviewsContext = createContext(null);

export const UserReviewsProvider = ({children}) => {
    const [reviews, setReviews] = useState([]);
    const {user} = useUser();

    useEffect (() => {
        updateReviews();
    }, [])
    
    const updateReviews = async() => {
        try{
            const res = await GetUserReviews(user._id)
            console.log("Відгуки надісланні")
            setReviews(res);
        }catch (error){
            console.log(error.response ? error.response : { message: error.message });
        }
    }

    return (
        <UserReviewsContext.Provider value={{reviews, updateReviews}}>
            {children}
        </UserReviewsContext.Provider>
    );
}

export const useUserReviews = () => useContext(UserReviewsContext);