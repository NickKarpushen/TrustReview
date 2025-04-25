import React, {useState, useEffect} from "react";
import styles from './ReviewList.module.scss';
import RatingCount from "../rating_count/RatingCount";
import ButtonID_2 from "../buttons/button_id_2/ButtonID_2"
import { GetReviews} from "../../api/review";
import Avatar from "../../assets/image/avatar.png";
import LikeDisactive from "../../assets/icon/like_disactive.png";
import LikeActive from "../../assets/icon/like_active.png";
import { useNavigate } from "react-router-dom";
import {useUser} from "../../contexts/UserContext";
import axios from "axios";

const ReviewList = (props) =>{

    const [reviews, setReview] = useState([]);

    const navigate = useNavigate();
    const {user} = useUser();

    useEffect(() => {
        fetchGetReview();
    }, []);

    const fetchGetReview = async() => {
        try{
            const res = await GetReviews(props.item, user && user._id);
            setReview(res);
            console.log(res);
        }catch (error){
            console.log(error);
        }
    }

    const handleLikeClick = async(review_id, likeExists) => {
        if (!likeExists)
            try{
                const res = await axios.post('http://localhost:4000/api/like', {
                    user_id: user._id,
                    review_id: review_id,
                },{
                    headers: {
                        Authorization: `${sessionStorage.getItem("token")}`
                    }
                });

                console.log(res);
                fetchGetReview();
            }
            catch (error){
                console.log(error)
            }
        else{
            try{
                const res = await axios.delete('http://localhost:4000/api/like', {
                    params: { user_id: user._id, review_id: review_id },
                    headers: {
                        Authorization: `${sessionStorage.getItem("token")}`
                    }
                });

                console.log(res);
                fetchGetReview();
            }
            catch (error){
                console.log(error)
            }
        }
    }

    const formattedDate = (value) =>{
        const formattedDate = new Date(value).toLocaleDateString('uk-UA', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        return <>{formattedDate}</>
    }

    return (
        <section className={styles.list}>
            {reviews.map((review) => (
                <div className={styles.item}>
                    <div className={styles.item__userData}>
                        <div>
                            {review.user_avatar.data ? (
                                <img
                                    src={`data:${review.user_avatar.contentType};base64,${review.user_avatar.data}`}
                                    alt="User Avatar"
                                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                                />
                                ) : (
                                    <img src={Avatar} width='150px' height='150px'/>
                                )
                            }
                        </div>
                        <div className={styles.item__userBar}>
                            <h3>{review && review.user_name} {review && review.user_surname}</h3><p>{formattedDate(review.createdAt)}</p>
                            <h4>{review && review.user_email}</h4>
                        </div>
                        <RatingCount rating={review.rating} size={30}/>
                    </div>
                    {(review.text !== '' || review.title !== '' || review.image.data) && <hr/>}
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
                    <div className={styles.item__nav}>
                        <div className={styles.item__buttonBar}>
                            <ButtonID_2 src={review.likeExists ? LikeActive : LikeDisactive} size={35} width={28} onClick={() => handleLikeClick(review._id, review.likeExists)}/>
                            <p>{review.likes_count}</p>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default ReviewList;