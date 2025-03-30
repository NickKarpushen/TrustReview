import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './SignUpBusinessPage.module.scss';
import InputID_2 from '../../components/inputs/input_id_2/InputID_2';
import ButtonID_3 from '../../components/buttons/button_id_3/ButtonID_3';
import ButtonID_1 from '../../components/buttons/button_id_1/ButtonID_1';
import ButtonID_2 from '../../components/buttons/button_id_2/ButtonID_2';
import CrossImage from '../../assets/icon/cross.png';

const SignUpBusinessPage = () => {

    const navigate = useNavigate();

    const handleToLogInClick = () =>{
        navigate("/log_in");
    }

    return (
        <div className={styles.conteiner}>
            <div className={styles.left}>
                <div className={styles.form}>
                    <h1>Welcome</h1>
                    <h2>have an account? <a onClick={handleToLogInClick}>Log in</a></h2>
                    <div className={styles.form__flex}>
                        <div className={styles.form__column}>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Name"/>
                            </div>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Email"/>
                            </div>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Confirm Password"/>
                            </div>
                        </div>
                        <div className={styles.form__column}>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Surname"/>
                            </div>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Password"/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.form__flex}>
                        <div className={styles.form__column}>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Company Name"/>
                            </div>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Phone Number"/>
                            </div>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Category"/>
                            </div>
                        </div>
                        <div className={styles.form__column}>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Work Email"/>
                            </div>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Website (not necessarily)"/>
                            </div>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Number of Employees (not necessarily)"/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.form__buttonBar}>
                        <ButtonID_3 text="Sign up"/>
                    </div>
                </div>
            </div>
            <div className={styles.rigth}>
                <div className={styles.shape1}></div>
                <div className={styles.shape2}></div>
                <div className={styles.shape3}></div>
                <div className={styles.shape4}></div>
            </div>
        </div>
    );
}

export default SignUpBusinessPage;