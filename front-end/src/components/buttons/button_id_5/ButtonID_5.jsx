import React from "react";
import styles from './ButtonID_5.module.scss';

const ButtonID_5 = (props) =>{

    return(
        <button className={styles.button} onClick={props.onClick}>
            {props.text}
        </button>
    );
}

export default ButtonID_5;