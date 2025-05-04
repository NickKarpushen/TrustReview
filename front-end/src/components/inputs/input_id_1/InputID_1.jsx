import React from "react";
import styles from "./InputID_1.module.scss"

const InputID_1 = (props) => {
    return(
        <input className={styles.input} placeholder={props.placeholder} value={props.value} onChange={(e) => props.setState(e.target.value)}/>
    );
}

export default InputID_1;