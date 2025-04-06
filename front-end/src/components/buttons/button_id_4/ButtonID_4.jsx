import React from "react";
import styles from './ButtonID_4.module.scss';

const ButtonID_4 = (props) =>{

    return(
        <button className={styles.button} onClick={props.onClick}>
            <img src={props.img} width="25px" alt="зображення"/>
            {props.text}
        </button>
    );
}

export default ButtonID_4;