import React, {useState, useEffect} from "react";
import styles from './ReviewList.module.scss';
import RatingCount from "../rating_count/RatingCount";
import ButtonID_2 from "../buttons/button_id_2/ButtonID_2";
import ButtonID_1 from "../buttons/button_id_1/ButtonID_1";
import TextareaID_1 from "../textarea/textarea_id_1/TextareaID_1";
import { GetReviews} from "../../api/review";
import { useNotification } from '../../contexts/NotificationContext';
import Avatar from "../../assets/image/avatar.png";
import LikeDisactive from "../../assets/icon/like_disactive.png";
import LikeActive from "../../assets/icon/like_active.png";
import CommentDisactive from "../../assets/icon/comment_disactive.png";
import Delete from "../../assets/icon/delete.png"
import CommentActive from "../../assets/icon/comment_active.png"
import { useNavigate } from "react-router-dom";
import {useUser} from "../../contexts/UserContext";
import axios from "axios";

const ReviewList = (props) =>{

    const { showNotification } = useNotification();
    const [reviews, setReview] = useState([]);
    const [replies, setReplies] = useState([]);
    const [selectedReviewId, setSelectedReviewId] = useState(null);
    const [selectedReviewId_2, setSelectedReviewId_2] = useState(null);
    const [selectedEdit, setSelectedEdit] = useState(null);
    const [text, setText] = useState(null);
    const [editText, setEditText] = useState('');

    const navigate = useNavigate();
    const {user} = useUser();

    useEffect(() => {
        fetchGetReview();
    }, [props.item]);

    const fetchGetReview = async() => {
        try{
            const res = await GetReviews(props.item, user && user._id);
            console.log(res)
            setReview(res);

            if (!res.replies_count){
                setSelectedReviewId_2(null)
            }

        }catch (error){
            console.log(error);
        }
    }

    const fetchGetReplies = async(review_id) => {
        try{
            const res = await axios.get('http://localhost:4000/api/replies',{ 
                params: { parent_id: review_id },
            });
            console.log(res.data.newReplies);
            setReplies(res.data.newReplies);
        }catch(error){
            console.log(error);
            setReplies(null);
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
                fetchGetReview();
            }
            catch (error){
                console.log(error)
            }
        }
    }

    const handleCreatedReplyCLick = async(review_id) => {
        try{
            const res = await axios.post('http://localhost:4000/api/reply', {
                text: text,
                user_id: user._id,
                company_id: props.item,
                parent_id: review_id
            }, {
                headers: {
                    Authorization: `${sessionStorage.getItem("token")}`
                }
            })
            await fetchGetReview();
            await fetchGetReplies(review_id);
            setSelectedReviewId(null);
            showNotification("Success created", "Success");
            setText(null);
        }catch (error) {
            console.log(error)
            showNotification(error.response.data.message, "Error");
        }
    };

    const handleUpdateReplyCLick = async(reply_id) => {
        try{
            const res = await axios.patch('http://localhost:4000/api/reply', {
                reply_id: reply_id,
                text: editText,
            }, {
                headers: {
                    Authorization: `${sessionStorage.getItem("token")}`
                }
            })
            setSelectedEdit(null);
            setEditText(null);
            showNotification("Success update", "Success")
            await fetchGetReplies(selectedReviewId_2);
        }catch (error) {
            console.log(error);
            showNotification(error.response.data.message, "Error")
        }
    };

    const handleDeleteReplyCLick = async(reply_id) => {
        try{
            const res = await axios.delete('http://localhost:4000/api/reply', {
                params: { reply_id: reply_id},
                headers: {
                    Authorization: `${sessionStorage.getItem("token")}`
                }
            })
            await fetchGetReview()
            await fetchGetReplies(selectedReviewId_2);
            showNotification("Success delete", "Success")
        }catch (error) {
            console.log(error);
            showNotification(error.response.data.message, "Error")
        }
    };

    const handleReplyClick = (reviewId) => {
        if (selectedReviewId === reviewId) {
            setSelectedReviewId(null);
        } else {
            setSelectedReviewId(reviewId);
        }
    };

    const handleEditClick = (replyId, text) => {
        if (selectedEdit === replyId) {
            setSelectedEdit(null);
            setEditText(null);
        } else {
            setSelectedEdit(replyId);
            setEditText(text);
        }
    };

    const handleGetRepliesClick = (reviewId, replies_count) => {
        if (selectedReviewId_2 === reviewId) {
            setSelectedReviewId_2(null);
        } else if (replies_count !== null || 0) {
            fetchGetReplies(reviewId);
            setSelectedReviewId_2(reviewId);
        }
    };

    const formattedDate = (value) =>{
        const formattedDate = new Date(value).toLocaleDateString('uk-UA', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        return <>{formattedDate}</>
    }

    const formattedText = (value) =>{
        if (value == null) return

        let count = value.toString()

        if (value >= 1000){
            count = `${(value / 1000).toFixed(1)}K`
        }

        return <>{count}</>
    }

    const handleEditTextChange = (value) => {
        if (value.length <= 320){
            setEditText(value);
        }
    };

    const handleTextChange = (value) => {
        if (value.length <= 320){
            setText(value);
        }
    };

    return (
        <section className={styles.list}>
            {reviews.map((review) => (
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
                            {review.status === 0 ? <p>Awaiting verification</p> : <p className={styles.status__active}>verified</p>}
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
                        <div className={styles.item__buttonBar}>
                            <ButtonID_2 src={review.likeExists ? LikeActive : LikeDisactive} size={35} width={28} onClick={() => handleLikeClick(review._id, review.likeExists)}/>
                            <p>{formattedText(review.likes_count)}</p>
                        </div>
                        <div className={styles.item__buttonBar}>
                            <ButtonID_2 src={(selectedReviewId_2 === review._id) ? CommentActive : CommentDisactive} size={35} width={24} onClick={() => handleGetRepliesClick(review._id, review.replies_count)}/>
                            <p>{formattedText(review.replies_count)}</p>
                            <ButtonID_1 text = "New reply" className = "fill" function={() => handleReplyClick(review._id)}/>
                        </div>
                    </div>
                    {user && (selectedReviewId === review._id) && 
                    <><div className={styles.item__userDataReply}>
                        <div className={styles.item__userFlex}>
                            <div>
                                {user.avatar.data ? (
                                    <img
                                        src={`data:${user.avatar.contentType};base64,${user.avatar.data}`}
                                        alt="User Avatar"
                                        style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                                    />
                                    ) : (
                                        <img src={Avatar} width='50px' height='50px'/>
                                    )
                                }
                            </div>
                            <div className={styles.item__userBar}>
                                <h3>{user && user.name} {user && user.surname}</h3>
                                <h4>{user && user.email}</h4>
                            </div>
                        </div>
                    </div>
                    <div>
                        <TextareaID_1 placeholder="Text" value={text} setState={handleTextChange}/>
                    </div>
                    <div className={styles.item__replies}>
                        {text && <p>{text.length}/320</p>}
                        <ButtonID_1 text = "Reply" className = "fill" function={() => handleCreatedReplyCLick(review._id)}/>
                    </div></>
                    }
                    {selectedReviewId_2 === review._id && (
                        <>
                        {replies.map((reply) => (
                            <div className={styles.item}>
                                <div className={styles.item__userData}>
                                    <div className={styles.item__userFlexReply}>
                                        <div className={styles.item__userFlexReply_left}>
                                            <div>
                                            {reply.user_avatar.data ? (
                                                <img
                                                    src={`data:${reply.user_avatar.contentType};base64,${reply.user_avatar.data}`}
                                                    alt="User Avatar"
                                                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <img src={Avatar} width='50px' height='50px'/>
                                            )
                                            }
                                            </div>
                                            <div className={styles.item__userBar}>
                                                <h3>{reply && reply.user_name} {reply && reply.user_surname}</h3>{reply.replyAdmin ? <p>Owner's response</p> : null}
                                                <p>{formattedDate(reply.createdAt)}</p>
                                                <h4>{reply && reply.user_email}</h4>
                                            </div>
                                        </div>
                                        <div>
                                            {user && reply.user_id === user._id && <ButtonID_1 text = "Edit Reply" className = "fill" function={() => handleEditClick(reply._id, reply.text)}/>}
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className={styles.item__replyBody}>
                                    <h3>{reply.text}</h3>
                                    {selectedEdit === reply._id && 
                                        <div className={styles.item__edit}>
                                            <TextareaID_1 placeholder="Text" value={editText} setState={handleEditTextChange}/>
                                            <div className={styles.item__editNav}>
                                                <ButtonID_2 src={Delete} size={30} width={18} onClick={() => handleDeleteReplyCLick(reply._id)}/>
                                                {editText && <p>{editText.length}/320</p>}
                                                <ButtonID_1 text="Save" function={() => handleUpdateReplyCLick(reply._id)}/>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        ))}
                        </>
                    )}
                </div>
            ))}
        </section>
    )
}

export default ReviewList;