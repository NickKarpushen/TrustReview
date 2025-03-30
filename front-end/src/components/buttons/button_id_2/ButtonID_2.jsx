import React from "react";
import styles from './ButtonID_2.module.scss';

const ButtonID_1 = (props) =>{

    const style = styles[props.className] || styles.fill

    return(
        <button className={`${styles.button} ${style}`} style={{ width: props.size, height: props.size }} onClick={props.onClick}>
            <img src={props.src} alt="Опис" width={props.width}/>
        </button>
    );
}

export default ButtonID_1;