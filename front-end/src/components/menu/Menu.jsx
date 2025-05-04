import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './Menu.module.scss';
import { useUser } from "../../contexts/UserContext";
import { UserExit } from "../../api/users";
import ButtonID_2 from "../buttons/button_id_2/ButtonID_2";
import ButtonID_4 from "../buttons/button_id_4/ButtonID_4";
import BackArrow from "../../assets/icon/back_arrow.png";
import User from "../../assets/icon/user.png";
import Exit from '../../assets/icon/exit.png';
import Catalog from '../../assets/icon/catalog.png';
import Home from '../../assets/icon/home.png';
import Company from '../../assets/icon/company.png';
import Avatar from '../../assets/image/avatar.png';


const Header = (props) => {

    const navigate = useNavigate();
    const {user, updateUser} = useUser();
    const role = user ? user.role : null

    const menuItems = {
        admin: [
          {},
        ],
        user: [
            { text: 'Main', img: Home, onClick: () => navigate('/') },
            { text: 'Profile', img: User, onClick: () => navigate('/profile_user') },
            { text: 'Categories', img: Catalog, onClick: () => navigate('/categories')},
            { text: 'Exit', img: Exit, onClick: () => {handleExitClick()}},
        ],
        business: [
            { text: 'Main', img: Home, onClick: () => navigate('/') },
            { text: 'Profile', img: User, onClick: () => navigate('/profile_user')  },
            { text: 'My Company', img: Company, onClick: () => navigate('/my_company') },
            { text: 'Categories', img: Catalog, onClick: () => navigate('/categories') },
            { text: 'Exit', img: Exit, onClick: () => {handleExitClick()} }
        ],
        null: [
            { text: 'Main', img: Home, onClick: () => navigate('/') },
            { text: 'Profile', img: User, onClick: () => navigate('/log_in') },
            { text: 'Categories', img: Catalog, onClick: () => navigate('/categories')}
        ]
      };

    const handleExitClick = async() => {
        try{
            UserExit();
            updateUser();
        }catch (error){
            console.log(error)
        }
    }

    return(
        <div className={styles.conteiner}>
            <div className={styles.menu}>
                <div className={styles.menu__header}>
                    <ButtonID_2 src={BackArrow} size={30} width={25} onClick={props.function}/>
                </div>
                {user && <><div className={styles.menu__user}>
                    {user.avatar.data ? (
                        <img
                            src={`data:${user.avatar.contentType};base64,${user.avatar.data}`}
                            alt="User Avatar"
                            style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        ) : (
                        <img src={Avatar} width='70px' height='70px'/>
                    )}
                    <div className={styles.menu__dataUser}>
                        <h1>{user && user.name} {user && user.surname}</h1>
                        <h2>{user && user.email}</h2>
                    </div>
                </div></>}
                <hr/>
                <nav className={styles.menu__conteiner}>
                    {
                        menuItems[role].map((item) => (
                            <div className={styles.menu__buttonBar}>
                                <ButtonID_4 text={item.text} img={item.img} onClick={item.onClick}/>
                            </div>
                        ))
                    }
                </nav>
            </div>
        </div>
    );
}

export default Header;