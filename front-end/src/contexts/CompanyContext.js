import React, {createContext, useContext, useState, useEffect} from "react";
import { GetUserCompany } from "../api/companies";
import { useUser } from "./UserContext";

const CompanyContext = createContext(null);

export const CompanyProvider = ({children}) => {
    const [company, setCompany] = useState(null)
    const {user} = useUser();

    useEffect(() => {
        updateCompany();
    }, [])

    const updateCompany = async() => {
        try{
            const res = await GetUserCompany(user._id);
            setCompany(res.company);
        }catch (error){
            console.log(error.response ? error.response : { message: error.message });
        }
    }

    return (
        <CompanyContext.Provider value={{company, updateCompany}}>
            {children}
        </CompanyContext.Provider>
    );
}

export const useCompany = () => useContext(CompanyContext);