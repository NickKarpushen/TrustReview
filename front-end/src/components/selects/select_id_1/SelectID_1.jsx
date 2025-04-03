import React from "react";
import styles from './SelectID_1.module.scss';

const SelectID_1 = (props) =>{
    return(
        <select value={props.value} onChange={(e) => props.setState(e.target.value)} className={styles.select}>
            <option value="" disabled>{props.text}</option>
            {props.map.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
        </select>
    );
}

export default SelectID_1;