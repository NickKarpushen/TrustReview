import React, { useEffect, useState } from 'react';
import {useNavigate } from "react-router-dom";
import styles from './SignUpBusinessPage.module.scss';
import InputID_2 from '../../components/inputs/input_id_2/InputID_2';
import SelectID_1 from '../../components/selects/select_id_1/SelectID_1';
import ButtonID_3 from '../../components/buttons/button_id_3/ButtonID_3';
import ButtonID_2 from '../../components/buttons/button_id_2/ButtonID_2';
import CrossImage from '../../assets/icon/cross.png';
import CloseEye from '../../assets/icon/closeEye.png';
import Eye from '../../assets/icon/eye.png';
import { SignUpBusiness } from '../../api/users';
import { GetCategories } from '../../api/categories';
import { useNotification } from '../../contexts/NotificationContext';


const SignUpBusinessPage = () => {

    const navigate = useNavigate();
    const {showNotification} = useNotification();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();

    const [company_name, setCompanyName] = useState();
    const [work_email, setWorkEmail] = useState();
    const [phone_number, setPhoneNumber] = useState();
    const [website_link, setWebsiteLink] = useState();
    const [number_employment, setNumberEmployment] = useState();
    const [category, setCategory] = useState("");

    const [categories, setCategories] = useState([]);

    const [isVisible, setIsVisible] = useState(false);

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
    }, [])

    const handleSingUpClick = async() => {
        try{
            const res = await SignUpBusiness(name, surname, email, password, passwordConfirm, 
                company_name, work_email, phone_number, website_link, number_employment, category);
            console.log(res)
            if (res.status === 201){
                showNotification("Successful registration", "Success")
                navigate('/log_in');
            }
        }catch (error) {
            console.log("Error:", error.response.data.message);
            showNotification(error.response.data.message, "Error")
        }
    }

    const VisibleCLick = () =>{
        setIsVisible(!isVisible);
    }

    const handleBackClick = () =>{
        navigate('/')
    }

    const handleToLogInClick = () =>{
        navigate("/log_in");
    }

    return (
        <div className={styles.conteiner}>
            <div className={styles.left}>
                <div className={styles.crossBar}>
                    <ButtonID_2 src={CrossImage} size={30} width={25} onClick={handleBackClick}/>
                </div>
                <div className={styles.form}>
                    <h1>Welcome</h1>
                    <h2>have an account? <a onClick={handleToLogInClick}>Log in</a></h2>
                    <div className={styles.form__flex}>
                        <div className={styles.form__column}>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Name" value={name} setState={setName}/>
                            </div>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Email" value={email} setState={setEmail}/>
                            </div>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Confirm Password" type={isVisible ? "text" : "password"} value={passwordConfirm} setState={setPasswordConfirm}/>
                            </div>
                        </div>
                        <div className={styles.form__column}>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Surname" value={surname} setState={setSurname}/>
                            </div>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Password" type={isVisible ? "text" : "password"} value={password} setState={setPassword}/>
                                <div className={styles.form__VisibleBar}>
                                    <ButtonID_2 src={isVisible ? Eye : CloseEye} size={30} width={18} onClick={VisibleCLick}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.form__flex}>
                        <div className={styles.form__column}>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Company Name" value={company_name} setState={setCompanyName}/>
                            </div>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Phone Number" value={phone_number} setState={setPhoneNumber}/>
                            </div>
                            <div className={styles.form__inputBar}>
                                <SelectID_1 text={"Category"} value={category} setState={setCategory} map={categories}/>
                            </div>
                        </div>
                        <div className={styles.form__column}>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Work Email" value={work_email} setState={setWorkEmail}/>
                            </div>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Website (not necessarily)" value={website_link} setState={setWebsiteLink}/>
                            </div>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Number of Employees (not necessarily)" value={number_employment} setState={setNumberEmployment}/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.form__buttonBar}>
                        <ButtonID_3 text="Sign up" function={handleSingUpClick}/>
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