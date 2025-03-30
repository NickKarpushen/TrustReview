import React from "react";
import styles from "./InputID_1.module.scss"

const InputID_1 = (props) => {
    return(
        <input className={styles.input} placeholder={props.placeholder}/>
    );
}

export default InputID_1;