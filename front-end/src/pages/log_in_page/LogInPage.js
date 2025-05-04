import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './LogInPage.module.scss';
import InputID_2 from '../../components/inputs/input_id_2/InputID_2';
import ButtonID_3 from '../../components/buttons/button_id_3/ButtonID_3';
import ButtonID_1 from '../../components/buttons/button_id_1/ButtonID_1';
import ButtonID_2 from '../../components/buttons/button_id_2/ButtonID_2';
import CrossImage from '../../assets/icon/cross.png';
import CloseEye from '../../assets/icon/closeEye.png';
import Eye from '../../assets/icon/eye.png';
import { useUser } from '../../contexts/UserContext';

import { Authentication } from '../../api/users';

const LogInPage = () => {

    const navigate = useNavigate();
    const {updateUser} = useUser();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();

    const [isVisible, setIsVisible] = useState(false);

    const handleLogInClick = async() => {
        try{
            const res = await Authentication(email, password, passwordConfirm);
            updateUser();
            navigate('/')
        }catch (error) {
            console.log("Error:", error.response?.data?.message || error.message || "Невідома помилка");
        }
    }

    const VisibleCLick = () =>{
        setIsVisible(!isVisible);
    }
    
    const handleBackClick = () =>{
        navigate('/')
    }

    const handleToSingUpClick = () =>{
        navigate("/sign_up")
    }

    const handleToSignUpBusinessClick = () =>{
        navigate("/sign_up_business");
    }

    return (
        <div className={styles.conteiner}>
            <div className={styles.shape1}></div>
            <div className={styles.shape2}></div>
            <div className={styles.shape3}></div>
            <div className={styles.shape4}></div>
            <div className={styles.form}>
                <div className={styles.form__left}>
                    <ButtonID_2 src={CrossImage} size={30} width={25} onClick={handleBackClick}/>
                </div>
                <div className={styles.form__center}>
                    <h1>Welcome</h1>
                    <h2>create an account? <a onClick={handleToSingUpClick}>Sign up</a></h2>
                    <div className={styles.form__inputBar}>
                        <InputID_2 placeholder="Email" value={email} setState={setEmail}/>
                    </div>
                    <div className={styles.form__inputBar}>
                        <InputID_2 placeholder="Password" type={isVisible ? "text" : "password"} value={password} setState={setPassword}/>
                        <div className={styles.form__VisibleBar}>
                            <ButtonID_2 src={isVisible ? Eye : CloseEye} size={30} width={18} onClick={VisibleCLick}/>
                        </div>
                    </div>
                    <div className={styles.form__inputBar}>
                        <InputID_2 placeholder="Confirm password" type={isVisible ? "text" : "password"} value={passwordConfirm} setState={setPasswordConfirm}/>
                    </div>
                    <div className={styles.form__buttonBar}>
                        <ButtonID_3 text="Log In" function={handleLogInClick}/>
                    </div>
                    <h2>have a business account?</h2>
                    <div className={styles.form__buttonFlexBar}>
                        <ButtonID_1 text="Sign up" className="border" function={handleToSignUpBusinessClick}/>
                    </div>
                </div>
                <div className={styles.form__right}>

                </div>
            </div>
        </div>
    );
}

export default LogInPage;