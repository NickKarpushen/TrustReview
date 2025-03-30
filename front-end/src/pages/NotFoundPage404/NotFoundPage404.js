import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from './NotFoundPage404.module.scss';
import ButtonID_1 from '../../components/buttons/button_id_1/ButtonID_1'

const NotFoundPage404 = () => {

    const navigate = useNavigate();

    const handleHomeClick = () =>{
        navigate("/")
    }

    return (
        <div className={styles.conteiner}>
            <div className={styles.shape1}></div>
            <div className={styles.shape2}></div>
            <div className={styles.shape3}></div>
            <div className={styles.shape4}></div>
            <h1>404</h1>
            <p>Oops, page not found</p>
            <div className={styles.conteiner__button}>
                <ButtonID_1 text="Main page" className = "border" function={handleHomeClick}/>
            </div>
        </div>
    );
}

export default NotFoundPage404;