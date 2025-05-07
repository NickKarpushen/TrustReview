import React, { useEffect, useRef, useState } from 'react';
import HeaderSmall from '../../components/header_small/HeaderSmall'
import styles from './ReviewCheckPage.module.scss';
import Avatar from '../../assets/image/avatar.png';
import Delete from '../../assets/icon/delete.png';
import RatingCount from '../../components/rating_count/RatingCount';
import ButtonID_1 from '../../components/buttons/button_id_1/ButtonID_1';
import ButtonID_2 from '../../components/buttons/button_id_2/ButtonID_2';
import { DeleteReview } from '../../api/review';
import Footer from '../../components/footer/Footer';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReviewCheckPage = (props) => {

    const {user} = useUser();
    const [reviews, setReviews] = useState([])
    const navigate = useNavigate();

    const fetchReview = async() => {
        try{
            const res = await axios.get('/unverified_review', 
                {
                    headers:{
                    Authorization: `${sessionStorage.getItem("token")}`
                    } 
                }
            );
            setReviews(res.data.newReviews)
        }catch(error){
            console.log(error)
        }
    }

    useEffect (() => {
        fetchReview();
    }, []);

    const formattedDate = (value) =>{
        const formattedDate = new Date(value).toLocaleDateString('uk-UA', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        return <>{formattedDate}</>
    }

    const handleUpdateReviewClick = async(review_id) => {
        try{
            const res = await axios.patch('http://localhost:4000/api/update_status', {
                review_id: review_id
            }, {
                headers:{
                Authorization: `${sessionStorage.getItem("token")}`
                } 
            });
            await fetchReview();
        }catch (error){
            console.log(error)
        }
    }

    const handleDeleteReviewClick = async(review_id) => {
        try{
            const res = await DeleteReview(review_id)

            await fetchReview();
        }catch (error){
            console.log(error)
        }
    }

    return (
        <div className={styles.conteiner}>
            <header className={styles.header}>
                <HeaderSmall function={props.function} isState={props.isState}/>
            </header>
            <main className={styles.main}>
                <section>
                    {reviews && reviews.map((review) => (
                        <div className={styles.item}>
                            <div className={styles.item__userData}>
                                <div className={styles.item__userFlex}>
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
                                </div>
                                <div className={styles.item__ratingBar}>
                                    <RatingCount rating={review.rating} size={30}/>
                                    {review.status === 0 ? <p>Awaiting verification</p> : <p>verified</p>}
                                </div>
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
                                <ButtonID_2 src={Delete} size={30} width={18} onClick={() => handleDeleteReviewClick(review._id)}/>
                                <ButtonID_1 text="Verify" function={() => handleUpdateReviewClick(review._id)}/>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
            <Footer/>
        </div>
    );
}

export default ReviewCheckPage;