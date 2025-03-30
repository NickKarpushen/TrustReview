import React from "react";
import styles from "./InputID_2.module.scss"

const InputID_2 = (props) => {

    let type = null;
    props.type ? type = props.type : type = "text";

    return(
        <input 
            type={type} 
            className={styles.input} 
            placeholder={props.placeholder} 
            value={props.value} 
            onChange={(e) => props.setState(e.target.value)}
        />
    );
}

export default InputID_2;