import React, {createContext, useContext, useState, useEffect} from "react";
import { GetDataUser } from "../api/users";

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async() => {
            try{
                const res = await GetDataUser();
                setUser(res.user);
                console.log(res.message);
            }catch (error){
                console.log("Error:", error.response?.data?.message || error.message || "Невідома помилка")
            }
        }
        
        fetchUser();
    }, []);
    
    const updateUser = () => {
        const fetchUser = async() => {
            try{
                const res = await GetDataUser();
                setUser(res.user);
                console.log(res.message);
            }catch (error){
                console.log("Error:", error.response?.data?.message || error.message || "Невідома помилка")
            }
        }
        
        fetchUser();
    };

    return (
        <UserContext.Provider value={{user, updateUser}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);