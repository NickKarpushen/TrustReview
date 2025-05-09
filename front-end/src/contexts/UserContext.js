import React, {createContext, useContext, useState, useEffect} from "react";
import { GetDataUser } from "../api/users";

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async() => {
            try{
                const res = await GetDataUser();
                setUser(res.user);
                console.log(res.message);
            }catch (error){
                console.log("Error:", error.response?.data?.message || error.message || "Невідома помилка")
            }finally {
                setIsLoading(false);
            }
        }
        
        fetchUser();
    }, []);
    
    const updateUser = () => {
        const fetchUser = async() => {
            try{
                const res = await GetDataUser();
                if (res === null){
                    setUser(null)
                }
                setUser(res.user);
                console.log(res.message);
            }catch (error){
                console.log("Error:", error.response?.data?.message || error.message || "Невідома помилка")
            }finally {
                setIsLoading(false);
            }
        }
        
        fetchUser();
    };

    return (
        <UserContext.Provider value={{user, isLoading, updateUser}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);