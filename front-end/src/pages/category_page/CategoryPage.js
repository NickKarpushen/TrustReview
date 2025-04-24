import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import HeaderSmall from '../../components/header_small/HeaderSmall';
import RatingCount from '../../components/rating_count/RatingCount';
import styles from './CategoryPage.module.scss';
import Logo from '../../assets/image/logo.png';
import { useUser } from '../../contexts/UserContext';

import axios from 'axios';

const CategoryPage = (props) => {

    const location = useLocation();
    const navigate = useNavigate();
    const {user} = useUser();
    const {category} = location.state;
    const [companies, setCompanies] = useState([]);

    useEffect (() => {
        const fetchGetCompanies = async() => {
            try{
                const res = await axios.get('http://localhost:4000/api/companies', {
                    params: {
                        cat_id: category._id
                    }
                })
                setCompanies(res.data.companies);
            }catch (error){
                console.log(error)
            }
        }
        fetchGetCompanies();
    }, []);

    const handleToCompanyClick = (company) =>{
        company.user_id === (user && user._id) ? 
        navigate('/my_company') 
        : 
        navigate('/company', {state: {company}});
    }

    return (
        <div className={styles.conteiner}>
            <header className={styles.header}>
                <HeaderSmall function={props.function} isState={props.isState}/>
            </header>
            <main className={styles.main}>
                <section className={styles.main__header}>
                    <h1>{category.name} Category</h1>
                </section>
                <section>

                </section>
                <section className={styles.main__list}>
                    {companies.map((company) => (
                        <div className={styles.main__item} onClick={() => handleToCompanyClick(company)}>
                            {company && company.logo.data ? (
                                <img
                                    src={`data:${company.logo.contentType};base64,${company.logo.data}`}
                                    alt="Company Logo"
                                    style={{ width: '120px', height: '120px', borderRadius: '12px', objectFit: 'cover'}}
                                />
                            ) : (
                                <img src={Logo} style={{width: '120px', height: '120px', borderRadius:'12px'}}/>
                            )}
                            <div className={styles.main__dataCompany}>
                                <h1>{company.company_name}</h1>
                                <h3>{company.website_link}</h3>
                                <div className={styles.main__rating}>
                                    <RatingCount rating={company.rating} size={30}/>
                                    <h2>{Math.round(company.rating * 100) / 100}</h2>
                                    <h2>Reviews ({company.review_count})</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
}

export default CategoryPage;