import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import HeaderSmall from '../../components/header_small/HeaderSmall';
import RatingCount from '../../components/rating_count/RatingCount';
import Footer from '../../components/footer/Footer';
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
    const [minRating, setMinRating] = useState('');
    const [sortBy, setSortBy] = useState('');

    useEffect (() => {
        fetchGetCompanies();
    }, [minRating, sortBy]);

    const fetchGetCompanies = async() => {
        try{
            const res = await axios.get('http://localhost:4000/api/companies', {
                params: {
                    cat_id: category._id,
                    min_rating: minRating,
                    sort_by: sortBy
                }
            })
            setCompanies(res.data.companies);
        }catch (error){
            console.log(error)
        }
    }

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
                <section className={styles.main__filterBar}>
                    <div className={styles.filters}>
                        <label className={styles.label}>Rating</label>
                        {[0, 3, 4, 4.5].map((val) => (
                            <button
                                key={val}
                                onClick={() => setMinRating(val)}
                                className={minRating === val ? styles.button_active : styles.button}
                            >
                                {val === 0 ? 'Any' : `${val}+`}
                            </button>
                        ))}
                    </div>
                    <div>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.select}>
                            <option value="">Most Relevant</option>
                            <option value="date_desc">Newest</option>
                            <option value="date_asc">Oldest</option>
                            <option value="rating">Best Rating</option>
                        </select>
                    </div>
                </section>
                <section className={styles.main__list}>
                    {companies.length === 0 && 
                        <div>
                            <h1>Сould not find the company</h1>
                        </div>
                    }
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
                                    <h2>{Math.round(company.rating * 10) / 10}</h2>
                                    <h2>Reviews ({company.review_count})</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
            <Footer/>
        </div>
    );
}

export default CategoryPage;