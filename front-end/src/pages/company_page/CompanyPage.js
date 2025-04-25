import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import HeaderSmall from '../../components/header_small/HeaderSmall';
import styles from './CompanyPage.module.scss';
import ButtonID_5 from '../../components/buttons/button_id_5/ButtonID_5';
import RatingCount from '../../components/rating_count/RatingCount';
import Logo from '../../assets/image/logo.png';
import Phone from '../../assets/icon/phone.png';
import Employees from '../../assets/icon/employees.png';
import Post from '../../assets/icon/post.png';
import axios from 'axios';
import ReviewList from '../../components/review_list/ReviewList';

const CompanyPage = (props) => {

    const location = useLocation();
    const navigate = useNavigate();

    const {company} = location.state;
    const [category, setCategory] = useState()

    useEffect (() => {
        const fetchCategory = async() =>{
            try{
                const res = await axios ('http://localhost:4000/api/category', {
                    params: {
                        cat_id: company.cat_id
                    }
                })
                setCategory(res.data)
            }catch (error){
                console.log(error);
            }
        }
        fetchCategory();
    }, []);

    const handleReviewClick = () => {
        navigate('/company/review', {state: {company}})
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
                            {company && company.logo.data ? (
                                <img
                                    src={`data:${company.logo.contentType};base64,${company.logo.data}`}
                                    alt="User Avatar"
                                    style={{ width: '180px', height: '180px', borderRadius: '18px', objectFit: 'cover'}}
                                />
                            ) : (
                                <img src={Logo} style={{width: '180px', height: '180px', borderRadius:'18px'}}/>
                            )}
                        </div>
                        <div className={styles.companyData__textBar}>
                            <h1>{company && company.company_name}</h1>
                            <div className={styles.companyData__rating}>
                                <RatingCount rating={company && company.rating} size={40}/>
                                <h2>{Math.round(company && company.rating * 100) / 100}</h2>
                            </div>
                            <h3>Reviews {company && company.review_count}</h3>
                        </div>
                    </section>
                    {(company && company.about_company) && 
                        <>
                            <section className={styles.companyAbout}>
                                <h1>About {company && company.company_name}</h1>
                                <p>{company && company.about_company}</p>
                            </section>
                        </>
                    }
                    <section className={styles.review}>
                        <ButtonID_5 text="Write review" onClick={handleReviewClick}/>
                    </section>
                    <ReviewList item={company._id}/>
                </div>
                <div className={styles.main__leftCol}>
                    {company && company.website_link &&
                        <>
                            <section className={styles.linkBar}>
                                <a href={company && company.website_link} target="_blank" class={styles.link}>{company && company.website_link}</a>
                            </section>
                        </>
                    }
                    <section className={styles.contactBar}>
                        <div className={styles.contact}>
                            <h1>Contact</h1>
                            <div className={styles.contact__dataBar}>
                                <img src={Post} width='24px' height='24px'/><h3>{company && company.work_email}</h3>
                            </div>
                            <div className={styles.contact__dataBar}>
                                <img src={Phone} width='24px' height='24px'/><h3>{company && company.phone_number}</h3>
                            </div>
                            {company && company.number_employment &&
                                <>
                                    <h1>Employees</h1>
                                    <div className={styles.contact__dataBar}>
                                        <img src={Employees} width='24px' height='24px'/><h3>{company && company.number_employment}</h3>
                                    </div>
                                </>
                            }
                            <h1>Category</h1>
                            <div className={styles.contact__dataBar}> 
                                <h3>{category && category.name}</h3>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default CompanyPage;