import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonID_1 from "../buttons/button_id_1/ButtonID_1";
import ButtonID_2 from "../buttons/button_id_2/ButtonID_2";
import MenuImage from "../../assets/icon/menu.png"
import styles from './HeaderSmall.module.scss';


const Header = (props) => {

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
            <div className={styles.shape3}></div>
            <nav className={props.isState ? styles.menu : styles.menuDisactive}>
                {props.isState && <ButtonID_2 src={MenuImage} width={30} onClick={props.function}/>}
                <div className={styles.menu__rightRow}>
                    <ButtonID_1 text = "Log in" className = "fill" function={handleLogInClick}/>
                    <ButtonID_1 text = "Sign up" className = "border" function={handleSignUpClick}/>
                </div>
            </nav>
        </div>
    );
}

export default Header;