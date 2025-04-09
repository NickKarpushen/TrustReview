import React, { useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import HeaderSmall from '../../components/header_small/HeaderSmall';
import styles from './ProfileUserPage.module.scss';
import ButtonID_5 from '../../components/buttons/button_id_5/ButtonID_5';
import { useUser } from '../../contexts/UserContext';
import Calendar from '../../assets/icon/calendar.png';
import Avatar from '../../assets/image/avatar.png';

const ProfileUser = (props) => {

    const {user} = useUser();
    const navigate = useNavigate();

    const formattedDate = new Date(user.createdAt).toLocaleDateString('uk-UA', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const handleUserEditClick = () => {
        navigate('/profile_user/user_edit');
    }
    
    const handleToCompanyClick = () =>{
        navigate('/my_company')
    }

    return (
        <div className={styles.conteiner}>
            <Outlet/>
            <header className={styles.header}>
                <HeaderSmall function={props.function} isState={props.isState}/>
            </header>
            <main className={styles.main}>
                <section className={styles.userData}>
                    <div className={styles.userData__imgBar}>
                        {user.avatar ? (
                            <img
                                src={`data:${user.avatar.contentType};base64,${user.avatar.data}`}
                                alt="User Avatar"
                                style={{ width: '180px', height: '180px', borderRadius: '50%', border: '10px solid color: rgb(144, 149, 161);' }}
                            />
                            ) : (
                                <img src={Avatar} width='180px' height='180px'/>
                            )}
                    </div>
                    <div className={styles.userData__textBar}>
                        <h1>{user.name} {user.surname}</h1>
                        <h2>{user.email}</h2>
                        <div className={styles.userData__date}>
                            <img src={Calendar} width='28px' height='28px'/>
                            <h2>{formattedDate}</h2>
                        </div>
                    </div>
                    <div className={styles.userData__buttonBar}>
                        <ButtonID_5 text="Edit" onClick={handleUserEditClick}/>
                    </div>
                </section>
                <section className={styles.reviews}>
                    {user.role === 'user' && <h1>My reviews <p>0 reviews</p></h1>}
                    {user.role === 'business' && <ButtonID_5 text="Your company profile" onClick={handleToCompanyClick}/>}
                </section>  
            </main>
        </div>
    );
}

export default ProfileUser;