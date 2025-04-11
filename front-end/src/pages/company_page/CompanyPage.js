import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import HeaderSmall from '../../components/header_small/HeaderSmall';
import styles from './CompanyPage.module.scss';
import ButtonID_5 from '../../components/buttons/button_id_5/ButtonID_5';
import RatingCount from '../../components/rating_count/RatingCount';
import Avatar from '../../assets/image/avatar.png';
import Phone from '../../assets/icon/phone.png';
import Employees from '../../assets/icon/employees.png';
import Post from '../../assets/icon/post.png';
import { useCompany } from '../../contexts/CompanyContext';

const CompanyPage = (props) => {

    const {company} = useCompany();
    const navigate = useNavigate();

    const handleToEditClick = () => {
        navigate('company_edit');
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
                                <img src={Avatar} width='180px' height='180px'/>
                            )}
                        </div>
                        <div className={styles.companyData__textBar}>
                            <h1>{company && company.company_name}</h1>
                            <div className={styles.companyData__rating}>
                                <RatingCount rating={company && company.rating}/>
                                <h2>{company && company.rating}</h2>
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
                        <ButtonID_5 text="Edit Company" onClick={handleToEditClick}/>
                    </section>
                </div>
                <div className={styles.main__leftCol}>
                    <section className={styles.linkBar}>
                        <a href={company && company.website_link} target="_blank" class={styles.link}>{company && company.website_link}</a>
                    </section>
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
                                <h3>{company && company.cat_name}</h3>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default CompanyPage;