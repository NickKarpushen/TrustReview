import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './SignUpPage.module.scss';
import InputID_2 from '../../components/inputs/input_id_2/InputID_2';
import ButtonID_3 from '../../components/buttons/button_id_3/ButtonID_3';
import ButtonID_1 from '../../components/buttons/button_id_1/ButtonID_1';
import ButtonID_2 from '../../components/buttons/button_id_2/ButtonID_2';
import CrossImage from '../../assets/icon/cross.png';
import CloseEye from '../../assets/icon/closeEye.png';
import Eye from '../../assets/icon/eye.png';

import { SignUpUser } from '../../api/users';

const SignUpPage = () => {

    const navigate = useNavigate();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();

    const [isVisible, setIsVisible] = useState(false);

    const handleSingUpClick = async() => {
        try{
            const res = await SignUpUser(name, surname, email, password, passwordConfirm);
            console.log(res)
            if (res.status === 201){
                navigate('/log_in');
            }
        }catch (error) {
            console.log("Error:", error.response?.data?.message || error.message);
        }
    }
    
    const handleBackClick = () =>{
        navigate("/")
    }

    const VisibleCLick = () =>{
        setIsVisible(!isVisible);
    }

    const handleToLogInClick = () =>{
        navigate("/log_in");
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
                    <h2>have an account? <a onClick={handleToLogInClick}>Log in</a></h2>
                    <div className={styles.form__inputBar}>
                        <InputID_2 placeholder="Name" value={name} setState={setName}/>
                    </div>
                    <div className={styles.form__inputBar}>
                        <InputID_2 placeholder="Surname" value={surname} setState={setSurname}/>
                    </div>
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
                        <ButtonID_3 text="Sign up" function={handleSingUpClick}/>
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

export default SignUpPage;