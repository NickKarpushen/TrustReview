import React from "react";
import styles from './TextareaID_1.module.scss';

const TextareaID_1 = (props) =>{
    return(
        <textarea
            className={styles.textarea}
            placeholder={props.placeholder} 
            value={props.value} 
            onChange={(e) => props.setState(e.target.value)}
            rows={1}
        />
    );
}

export default TextareaID_1;