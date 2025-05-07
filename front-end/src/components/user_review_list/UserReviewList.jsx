import React from "react";
import styles from './UserReviewList.module.scss';
import RatingCount from "../rating_count/RatingCount";
import { useUser } from "../../contexts/UserContext";
import { useUserReviews } from "../../contexts/UserReviewsContext";
import Logo from '../../assets/image/logo.png';
import ButtonID_5 from "../buttons/button_id_5/ButtonID_5";
import { useNavigate } from "react-router-dom";

const UserReviewList = (props) =>{

    const {user} = useUser();
    const {reviews} = useUserReviews();

    const navigate = useNavigate();

    const formattedDate = (value) =>{
        const formattedDate = new Date(value).toLocaleDateString('uk-UA', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        return <>{formattedDate}</>
    }

    const handleReviewEditClick = (review) =>{
        navigate('review_edit', {state: {review}})
    }

    return (
        <section className={styles.list}>
            {reviews.map((review) => (
                <div className={styles.item}>
                    <div className={styles.item__company}>
                        <div>
                            {review && review.company_logo.data ? (
                                <img
                                    src={`data:${review.company_logo.contentType};base64,${review.company_logo.data}`}
                                    alt="User Avatar"
                                    style={{ width: '50px', height: '50px', borderRadius: '5px', objectFit: 'cover'}}
                                />
                            ) : (
                                <img src={Logo} style={{width: '50px', height: '50px', borderRadius:'5px'}}/>
                            )}
                            <div className={styles.item__companyData}>
                                <h3>{review && review.company_name}</h3>
                                <p>{review && review.website_link}</p>
                            </div>
                        </div>
                        <ButtonID_5 text="Edit review" onClick={() => handleReviewEditClick(review)}/>
                    </div>
                    <div className={styles.item__review}>
                        <div className={styles.item__userData}>
                            <h3>{user && user.name} {user && user.surname}</h3>
                            <p>{formattedDate(review.createdAt)}</p>
                        </div>
                        {(review.text !='' || review.title != '' || review.image.data) && <hr/>}
                        <div className={styles.item__body}>
                            {review.title && <h1>{review.title}</h1>}
                            {review.text && <h3>{review.text}</h3>}
                            {review && review.image.data && (
                                <div className={styles.item__img}>
                                    <img
                                        src={`data:${review.image.contentType};base64,${review.image.data}`}
                                        alt="User Avatar"
                                        style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '30px', objectFit: 'cover'}}
                                    />  
                                </div>)
                            }
                        </div>
                        <hr/>
                        <div className={styles.item__rating}>
                            <RatingCount rating={review.rating} size={30}/>
                            {review.status === 0 ? <p>Awaiting verification</p> : <p>verified</p>}
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default UserReviewList;