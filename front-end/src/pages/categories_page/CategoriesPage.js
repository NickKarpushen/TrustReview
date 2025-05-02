import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import HeaderSmall from '../../components/header_small/HeaderSmall';
import Footer from '../../components/footer/Footer';
import styles from './CategoriesPage.module.scss';
import { GetCategories } from '../../api/categories';

import axios from 'axios';

const CategoriesPage = (props) => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

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

    const handleToCategoryClick = (category) => {
        navigate('/category', {state: {category}});
    }

    return (
        <div className={styles.conteiner}>
            <header className={styles.header}>
                <HeaderSmall function={props.function} isState={props.isState}/>
            </header>
            <main className={styles.main}>
                <section className={styles.main__header}>
                    <h1>Categories</h1>
                </section>
                <section className={styles.main__body}>
                    {categories.map((category)=>(
                        <div className={styles.item}>
                            <div className={styles.item__header} onClick={() => handleToCategoryClick(category)}>
                                <h3>{category.name}</h3>
                            </div>
                            <div className={styles.item__body}>
                                <h4>Companies ({category.company_count})</h4>
                                <h4>Reviews ({category.review_count})</h4>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
            <Footer/>
        </div>
    );
}

export default CategoriesPage;