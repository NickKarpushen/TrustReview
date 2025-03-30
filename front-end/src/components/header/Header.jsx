import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonID_1 from "../buttons/button_id_1/ButtonID_1";
import ButtonID_2 from "../buttons/button_id_2/ButtonID_2";
import InputID_1 from "../inputs/input_id_1/InputID_1";
import MenuImage from "../../assets/icon/menu.png"
import styles from './Header.module.scss';


const Header = () => {

    const navigate = useNavigate();

    const handleSignUpClick = () =>{
        navigate("/sign_up")
    }

    const handleLogInClick = () => {
        navigate("/log_in");
    }

    return(
        <div className={styles.conteiner}>
            <div className={styles.shape1}></div>
            <div className={styles.shape2}></div>
            <div className={styles.shape3}></div>
            <div className={styles.shape4}></div>
            <nav className={styles.menu}>
                <ButtonID_2 src={MenuImage} width={30}/>
                <div className={styles.menu__rightRow}>
                    <ButtonID_1 text = "Log in" className = "fill" function={handleLogInClick}/>
                    <ButtonID_1 text = "Sign up" className = "border" function={handleSignUpClick}/>
                </div>
            </nav>
            <div className={styles.searchBox}>
                <h1>Welcome to our website</h1>
                <div className={styles.searchBox__input}>
                    <InputID_1 placeholder = "Search company"/>
                </div>
            </div>
        </div>
    );
}

export default Header;