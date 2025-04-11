import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useUser} from "../../contexts/UserContext";
import styles from "./UserEdit.module.scss";
import CrossImage from '../../assets/icon/cross.png';
import AddPhoto from '../../assets/icon/add_photo.png';
import Avatar from '../../assets/image/avatar.png';
import ButtonID_2 from "../buttons/button_id_2/ButtonID_2";
import ButtonID_1 from "../buttons/button_id_1/ButtonID_1";
import InputID_2 from '../../components/inputs/input_id_2/InputID_2'
import { UpdateUser } from "../../api/users";

const UserEdit = () => {

    const {user, updateUser} = useUser();
    const navigate = useNavigate();

    const [name, setName] = useState(user && user.name);
    const [surname, setSurname] = useState(user && user.surname);
    const [file, setFile] = useState();

    const handleBackClick = () => {
        navigate(-1);
    }

    const handleUpdateUser = async() => {
        try{
            const res = await UpdateUser(file, user, name, surname); 
            await updateUser();
            console.log(res);
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

    return (
        <div className={styles.conteiner}>
            <div className={styles.background} onClick={handleBackClick}></div>
            <div className={styles.position_form}>
                <div className={styles.form}>
                    <div className={styles.form__header}>
                        <ButtonID_2 src={CrossImage} size={30} width={25} onClick={handleBackClick}/>
                        <h1>Edit Profile</h1>
                        <ButtonID_1 text = "Save" className = "border" function={handleUpdateUser}/>
                    </div>
                    <div className={styles.form__body}>
                        <div className={styles.form__ava}>
                            {user.avatar.data ? (
                                <img
                                    src={`data:${user.avatar.contentType};base64,${user.avatar.data}`}
                                    alt="User Avatar"
                                    style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
                                />
                                ) : (
                                <img src={Avatar} width='150px' height='150px'/>
                            )}
                            <div className={styles.form__buttonAva}>
                                <ButtonID_2 src={AddPhoto} size={30} width={25} onClick={handleImgButtonClick}/>
                                <input type="file" id="img-input" onChange={handleChange} accept="image/*" />
                            </div>
                        </div>
                        <div className={styles.form__input}>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Name" value={name} setState={setName}/>
                            </div>
                            <div className={styles.form__inputBar}>
                                <InputID_2 placeholder="Surname" value={surname} setState={setSurname}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserEdit;