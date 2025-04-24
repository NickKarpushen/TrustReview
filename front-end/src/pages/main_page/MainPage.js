import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import styles from './MainPage.module.scss';
import { useUser } from '../../contexts/UserContext';
import {GetCategories} from '../../api/categories';
import { useNavigate } from 'react-router-dom';

const MainPage = (props) => {

    const {user} = useUser();
    const [categories, setCategories] = useState([]);
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

    const handleToCategoryClick = (category) => {
        navigate ('/category', {state: {category}});
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
                <section>
                </section>
                <section>

                </section>    
            </main>
            <footer>

            </footer>
        </div>
    );
}

export default MainPage;