import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser} from "../../contexts/UserContext";
import styles from "./ReviewForm.module.scss";
import CrossImage from '../../assets/icon/cross.png';
import Photo from '../../assets/icon/photo.png';
import Avatar from '../../assets/image/avatar.png';
import ButtonID_2 from "../buttons/button_id_2/ButtonID_2";
import ButtonID_1 from "../buttons/button_id_1/ButtonID_1";
import InputID_2 from '../../components/inputs/input_id_2/InputID_2';
import TextareaID_1 from '../../components/textarea/textarea_id_1/TextareaID_1';
import RatingSet from "../rating_set/RatingSet";
import { ReviewCreate } from "../../api/review";

const ReviewForm = () => {

    const {user, updateUser} = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const {company} = location.state;

    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const [rating, setRating] = useState();
    const [file, setFile] = useState();

    const handleBackClick = () => {
        navigate(-1);
    }

    const handleUpdateReview = async() => {
        try{
            const res = await ReviewCreate(file, title, text, rating, user._id, company._id) 
            updateUser();
            console.log(res.data.message);
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

    if(!user){
        return <div>Loading</div>
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
                        <h1>Review</h1>
                        <ButtonID_1 text = "Reply" className = "border" function={handleUpdateReview}/>
                    </div>
                    <div className={styles.form__body}>
                        <div className={styles.form__user}>
                            {user.avatar.data ? (
                                <img
                                    src={`data:${user.avatar.contentType};base64,${user.avatar.data}`}
                                    alt="User Avatar"
                                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                                />
                            ) : (
                                <img src={Avatar} width='50px' height='50px'/>
                            )}
                            <div className={styles.form__userData}>
                                <h1>{user && user.name} {user && user.surname}</h1>
                                <h2>{user && user.email}</h2>
                            </div>
                        </div>
                        <div className={styles.form__text}>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Title" valua={title} setState={handleTitleChange}/>
                                {title && <p>{title.length}/80</p>}
                            </div>
                            <div className={styles.form__inputBar}>
                                <TextareaID_1 placeholder="Text" valua={text} setState={handleTextChange}/>
                            </div>
                        </div>
                        <div className={styles.form__add}>
                            <div className={styles.form__add_left}>
                                <RatingSet size={28} setState={setRating}/>
                                <ButtonID_2 src={Photo} size={30} width={18} onClick={handleImgButtonClick}/>
                                <input type="file" id="img-input" onChange={handleChange} accept="image/*" />
                            </div>
                            {text && <p>{text.length}/320</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewForm;