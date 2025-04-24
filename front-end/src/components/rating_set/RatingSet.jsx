import React, {useState} from "react";
import styles from './RatingSet.module.scss';
import VoidStar from '../../assets/image/void_star.png';
import FillStar from '../../assets/image/fill_star.png';


const RatingSet = ({size, setState}) => {

    const [hoveredRating, setHoveredRating] = useState(null);
    const [selectedRating, setSelectedRating] = useState()

    const handleClick = (value) => {
        setSelectedRating(value);
        if (setState) setState(value);
    };

    const getStarImage = (i) => {
        const currentRating = hoveredRating !== null ? hoveredRating : selectedRating;

        if (currentRating >= i + 1) {
            return VoidStar;
        } else {
            return FillStar;
        }
    };

    return(
        <div>
            {[...Array(5)].map((_, i) => (
                 <img
                    key={i}
                    src={getStarImage(i)}
                    width={size}
                    height={size}
                    onMouseEnter={() => setHoveredRating(i + 1)}
                    onMouseLeave={() => setHoveredRating(null)}
                    onClick={() => handleClick(i+1)}
                    alt={`star-${i}`}
                    className={styles.img}
                />
            ))}
        </div>
    );
}

export default RatingSet;