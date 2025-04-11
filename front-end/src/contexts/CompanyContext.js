import React, {createContext, useContext, useState, useEffect} from "react";
import axios from "axios";

const CompanyContext = createContext(null);

export const CompanyProvider = ({children}) => {
    const [company, setCompany] = useState(null)

    useEffect(() => {
        updateCompany();
    }, [])

    const updateCompany = async() => {
        if (!sessionStorage.getItem("token")){
            return null;
        }
        
        try{
            const res = await axios.get('http://localhost:4000/api/company', {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `${sessionStorage.getItem("token")}`
                } 
            });
            setCompany(res.data.company)
            console.log(res.data.message)
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