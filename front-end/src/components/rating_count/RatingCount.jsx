import React from "react";
import styles from './RatingCount.module.scss';
import VoidStar from '../../assets/image/void_star.png';
import SemiStar from '../../assets/image/semi_star.png';
import FillStar from '../../assets/image/fill_star.png';


const RatingCount = ({rating, size}) => {

    const faStar = (i) =>{
        if ((rating) >= i + 1){
            return <img src={VoidStar} width={size} height={size}/>
        } else if ((rating) >= i + 0.5){
            return <img src={SemiStar} width={size} height={size}/>
        }
        else return <img src={FillStar} width={size} height={size}/>
    }

    return(
        <div>
            {[...Array(5)].map((_, i) => faStar(i))}
        </div>
    );
}

export default RatingCount;