import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import styles from './MainPage.module.scss';
import Logo from '../../assets/image/logo.png';
import RatingCount from '../../components/rating_count/RatingCount';
import ButtonID_1 from '../../components/buttons/button_id_1/ButtonID_1';
import Footer from '../../components/footer/Footer';
import { useUser } from '../../contexts/UserContext';
import {GetCategories} from '../../api/categories';
import { GetTopCategories } from '../../api/categories';
import { useNavigate } from 'react-router-dom';

const MainPage = (props) => {

    const {user} = useUser();
    const [categories, setCategories] = useState([]);
    const [topCategories, setTopCategories] = useState([]);
    const navigate = useNavigate();

    useEffect (() => {
        const fetchCategory = async() =>{
                try{
                    const res = await GetCategories();
                    setCategories(res)
                }catch(error){
                    console.log(error)
                }
            }
        fetchCategory();
    }, []);

    useEffect (() => {
        const fetchTopCategory = async() =>{
                try{
                    const res = await GetTopCategories();
                    console.log(res);
                    setTopCategories(res.data)
                }catch(error){
                    console.log(error)
                }
            }
        fetchTopCategory();
    }, []);

    const handleToCompanyClick = (company) =>{
        company.user_id === (user && user._id) ? 
        navigate('/my_company') 
        : 
        navigate('/company', {state: {company}});
    }

    const handleToCategoryClick = (category) => {
        navigate ('/category', {state: {category}});
    }

    const handleToBusinessReg = () => {
        navigate('/sign_up_business')
    }

    return (
        <div className={styles.conteiner}>
            <header className={styles.header}>
                <Header function={props.function} isState={props.isState}/>
            </header>
            <main className={styles.main}>
                <section className={styles.main__listCatBar}>
                    <div>
                        <h1>Categories</h1>
                    </div>
                    <div className={styles.main__listCategories}>
                        {categories.map((category) => (
                            <button className={styles.button} onClick={() => handleToCategoryClick(category)}>
                                {category.name}
                            </button>
                        ))}
                    </div>
                </section>
                <section className={styles.main__listTopCategory}>
                    {topCategories && topCategories.map((topCategory) => (
                        <div className={styles.main__row}>
                            <h1>Best in {topCategory.category.name}</h1>
                            <div className={styles.main__rowItem}>
                                {topCategory.companies.map((company) => (
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
                                                <h2>({company.review_count})</h2>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
                <section className={styles.main__getStarted}>
                    <div className={styles.main__formGetStarted}>
                        <h1>Create your own business account</h1>
                        <h2>Develop your business with us</h2>
                        <div className={styles.main__formInputBar}>
                            <ButtonID_1 text = "Get started" className = "white" function={handleToBusinessReg}/>
                        </div>
                    </div>
                </section>    
            </main>
            <Footer/>
        </div>
    );
}

export default MainPage;