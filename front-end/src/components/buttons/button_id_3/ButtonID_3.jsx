import React from "react";
import styles from './ButtonID_3.module.scss';

const ButtonID_3 = (props) =>{

    return(
        <button className={styles.button} onClick={props.function}>
            {props.text}
        </button>
    );
}

export default ButtonID_3;