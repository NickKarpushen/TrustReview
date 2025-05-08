import React, {useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ReviewEdit.module.scss";
import CrossImage from '../../assets/icon/cross.png';
import Photo from '../../assets/icon/photo.png';
import Delete from '../../assets/icon/delete.png';
import ButtonID_2 from "../buttons/button_id_2/ButtonID_2";
import ButtonID_1 from "../buttons/button_id_1/ButtonID_1";
import InputID_2 from '../../components/inputs/input_id_2/InputID_2';
import TextareaID_1 from "../textarea/textarea_id_1/TextareaID_1";
import {UpdateReview, DeleteReview} from "../../api/review.js";
import {useUser} from '../../contexts/UserContext.js';
import { useUserReviews } from "../../contexts/UserReviewsContext.js";

const ReviewEdit = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const {review} = location.state;
    const {updateReviews} = useUserReviews();
    const {updateUser} = useUser();

    const [title, setTitle] = useState(review.title);
    const [text, setText] = useState(review.text);
    const [file, setFile] = useState();

    const handleBackClick = () => {
        navigate(-1);
    }

    const handleUpdateReview = async() => {
        try{
            const res = await UpdateReview(title, text, file, review._id);
            console.log(res);
            updateReviews();
        }catch (error){
            console.log(error.response ? error.response : { message: error.message });
        }
    }

    const handleDeleteReview = async()=>{
        try{
            const res = await DeleteReview(review._id);
            updateUser();
            updateReviews();
            console.log(res);
            navigate(-1);
        }catch (error){
            console.log(error.response ? error.response : { message: error.message });
        }
    }

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleImgButtonClick = () => {
        document.getElementById('img-input').click();
    }

    const handleTitleChange = (value) => {
        if (value.length <= 80){
            setTitle(value);
        }
    };

    const handleTextChange = (value) => {
        if (value.length <= 320){
            setText(value);
        }
    };

    return (
        <div className={styles.conteiner}>
            <div className={styles.background} onClick={handleBackClick}></div>
            <div className={styles.position_form}>
                <div className={styles.form}>
                    <div className={styles.form__header}>
                        <ButtonID_2 src={CrossImage} size={30} width={25} onClick={handleBackClick}/>
                        <h1>Edit Review</h1>
                        <ButtonID_1 text = "Save" className = "border" function={handleUpdateReview}/>
                    </div>
                    <div className={styles.form__body}>
                        <div className={styles.form__inputBar}>
                            <InputID_2 placeholder="title" value={title} setState={handleTitleChange}/>
                            {title && <p>{title.length}/80</p>}
                        </div>
                        <div className={styles.form__inputBar}>
                            <TextareaID_1 placeholder="text" value={text} setState={handleTextChange}/>
                        </div>
                        <div className={styles.form__flexBar}>
                            <div className={styles.form__flexBar_left}>
                                <ButtonID_2 src={Photo} size={30} width={18} onClick={handleImgButtonClick}/>
                                <ButtonID_2 src={Delete} size={30} width={18} onClick={handleDeleteReview}/>
                                <input className={styles.input} type="file" id="img-input" onChange={handleChange} accept="image/*" />
                            </div>
                            {text && <p>{text.length}/320</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewEdit;