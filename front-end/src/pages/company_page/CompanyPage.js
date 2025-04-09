import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import HeaderSmall from '../../components/header_small/HeaderSmall';
import styles from './CompanyPage.module.scss';
import ButtonID_5 from '../../components/buttons/button_id_5/ButtonID_5';
import { useUser } from '../../contexts/UserContext';
import axios from 'axios';

const CompanyPage = (props) => {

    const {user} = useUser();
    const navigate = useNavigate();
    const [company, setCompany] = useState();

    useEffect(() => {
        fetchCompany();
    }, [])

    const fetchCompany = async() => {
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
        <div className={styles.conteiner}>
            <Outlet/>
            <header className={styles.header}>
                <HeaderSmall function={props.function} isState={props.isState}/>
            </header>
            <main className={styles.main}>
                <div className={styles.main__rightCol}>
                    <section className={styles.companyData}>
                        <div className={styles.companyData__imgBar}>
                            <div className={styles.companyData__img}></div>
                        </div>
                        <div className={styles.companyData__textBar}>
                            <h1>{company && company.company_name}</h1>
                            <h2>{company && company.rating}</h2>
                            <h3>Reviews {company && company.review_count}</h3>
                        </div>
                    </section>
                    <section className={styles.companyAbout}>

                    </section>
                    <section className={styles.review}>

                    </section>
                </div>
                <div className={styles.main__leftCol}>

                </div>
            </main>
        </div>
    );
}

export default CompanyPage;