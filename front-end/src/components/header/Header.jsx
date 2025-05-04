import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import ButtonID_1 from "../buttons/button_id_1/ButtonID_1";
import ButtonID_2 from "../buttons/button_id_2/ButtonID_2";
import InputID_1 from "../inputs/input_id_1/InputID_1";
import MenuImage from "../../assets/icon/menu.png";
import RatingCount from '../rating_count/RatingCount'
import Logo from '../../assets/image/logo.png'
import styles from './Header.module.scss';
import axios from 'axios';

const Header = (props) => {

    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isVisily, setIsVisily] = useState(false);

    useEffect(() => {
        if (query.trim() === "") {
          setResults([]);
          setIsVisily(false)
          return;
        }
    
        const fetchData = async () => {
          try {
            const res = await axios.get('http://localhost:4000/api/search_company', {
                params: { search: query }
            });
            setResults(res.data);
            res.data.length > 0  ? setIsVisily(true) : setIsVisily(false)
          } catch (err) {
            console.error(err);
          }
        };
    
        fetchData();
      }, [query]);

    const handleToConpanyClick = (company) => {
        navigate('/company', {state: {company}})
    }
    
    const handleSignUpClick = () =>{
        navigate("/sign_up")
    }

    const handleLogInClick = () => {
        navigate("/log_in");
    }

    return(<>
        {isVisily &&
            <div className={styles.search}>
                {results.map((company) => (
                    <div className={styles.search__item} onClick={() => handleToConpanyClick(company)}>
                        <div className={styles.search__itemData}>
                            {company && company.logo.data ? (
                                <img
                                    src={`data:${company.logo.contentType};base64,${company.logo.data}`}
                                    alt="User Avatar"
                                    style={{ width: '50px', height: '50px', borderRadius: '5px', objectFit: 'cover'}}
                                />
                            ) : (
                                <img src={Logo} style={{width: '50px', height: '50px', borderRadius:'5px'}}/>
                            )}
                            <h1>{company.company_name}</h1>
                        </div>
                        <RatingCount rating={company && company.rating} size={28}/>
                    </div>
                ))}
            </div>}
        <div className={styles.conteiner}>
            <div className={styles.shape1}></div>
            <div className={styles.shape2}></div>
            <div className={styles.shape3}></div>
            <div className={styles.shape4}></div>
            <nav className={props.isState ? styles.menu : styles.menuDisactive}>
                {props.isState && <ButtonID_2 src={MenuImage} width={30} onClick={props.function}/>}
                <div className={styles.menu__rightRow}>
                    <ButtonID_1 text = "Log in" className = "fill" function={handleLogInClick}/>
                    <ButtonID_1 text = "Sign up" className = "border" function={handleSignUpClick}/>
                </div>
            </nav>
            <div className={styles.searchBox}>
                <h1>Welcome to our website</h1>
                <div className={styles.searchBox__input}>
                    <InputID_1 placeholder = "Search company" value={query} setState={setQuery}/>
                </div>
            </div>
        </div>
    </>);
}

export default Header;