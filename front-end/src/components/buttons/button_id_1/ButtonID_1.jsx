import React from "react";
import styles from './ButtonID_1.module.scss';

const ButtonID_1 = (props) =>{

    const style = styles[props.className] || styles.fill

    return(
        <button className={`${styles.button} ${style}`} onClick={props.function}>
            {props.text}
        </button>
    );
}

export default ButtonID_1;