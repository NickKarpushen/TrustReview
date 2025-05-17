import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useUser} from "../../contexts/UserContext";
import styles from "./CompanyEdit.module.scss";
import CrossImage from '../../assets/icon/cross.png';
import Logo from '../../assets/image/logo.png';
import AddPhoto from '../../assets/icon/add_photo.png';
import ButtonID_2 from "../buttons/button_id_2/ButtonID_2";
import ButtonID_1 from "../buttons/button_id_1/ButtonID_1";
import InputID_2 from '../../components/inputs/input_id_2/InputID_2';
import TextareaID_1 from "../textarea/textarea_id_1/TextareaID_1";
import SelectID_1 from '../selects/select_id_1/SelectID_1';
import { GetCategories } from "../../api/categories";
import { UpdateCompany } from "../../api/companies";
import { useCompany } from '../../contexts/CompanyContext';
import { useNotification } from "../../contexts/NotificationContext";

const CompanyEdit = () => {

    const {user} = useUser();
    const { showNotification } = useNotification();
    const navigate = useNavigate();
    const {company, isLoading, updateCompany} = useCompany();

    const [company_name, setCompanyName] = useState('');
    const [website_link, setWebsiteLink] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [about_company, setAboutCompany] = useState('');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [file, setFile] = useState();

    useEffect (() => {
        const fetchCategory = async() =>{
            try{
                const res = await GetCategories();
                setCategories(res)
            }catch(error){
                console.log(error)
            }
        }
        fetchCategory();
    }, [])

    useEffect(() => {
        if (company) {
            setCompanyName(company.company_name || '');
            setWebsiteLink(company.website_link || '');
            setPhoneNumber(company.phone_number || '');
            setAboutCompany(company.about_company || '');
            setCategory(String(company.cat_id || ''));
        }
    }, [company]);

    const handleBackClick = () => {
        navigate(-1);
    }

    const handleUpdateCompany = async() => {
        try{
            const res = await UpdateCompany(file, company,
                company_name, website_link, phone_number, about_company, category);
            updateCompany();
            showNotification("Success update", "Success");
        }catch (error){
            console.log(error)
            showNotification(error.data.message, "Error")
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

    if (isLoading || !company) {
        return <>Loading...</>;
    }

    return (
        <div className={styles.conteiner}>
            <div className={styles.background} onClick={handleBackClick}></div>
            <div className={styles.position_form}>
                <div className={styles.form}>
                    <div className={styles.form__header}>
                        <ButtonID_2 src={CrossImage} size={30} width={25} onClick={handleBackClick}/>
                        <h1>Edit Company</h1>
                        <ButtonID_1 text = "Save" className = "border" function={handleUpdateCompany}/>
                    </div>
                    <div className={styles.form__body}>
                        <div className={styles.form__companyData}>
                            <div className={styles.form__ava}>
                                {company && company.logo.data ? (
                                    <img
                                        src={`data:${company.logo.contentType};base64,${company.logo.data}`}
                                        alt="Company logo"
                                        style={{ width: '150px', height: '150px', borderRadius: '15px', objectFit: 'cover'}}
                                    />
                                ) : (
                                    <img src={Logo} style={{width: '150px', height: '150px', borderRadius:'15px'}}/>
                                )}
                                <div className={styles.form__buttonAva}>
                                    <ButtonID_2 src={AddPhoto} size={30} width={25} onClick={handleImgButtonClick}/>
                                    <input type="file" id="img-input" onChange={handleChange} accept="image/*" />
                                </div>  
                            </div>
                            <div className={styles.form__input}>
                                <div className={styles.form__inputBar}>
                                    <InputID_2 placeholder="Company name" value={company_name} setState={setCompanyName}/>
                                </div>
                                <div className={styles.form__inputBar}>
                                    <InputID_2 placeholder="Website link" value={website_link} setState={setWebsiteLink}/>
                                </div>
                                <div className={styles.form__inputBar}>
                                    <InputID_2 placeholder="Phone number" value={phone_number} setState={setPhoneNumber}/>
                                </div>
                            </div>
                        </div>
                        <div className={styles.form__companyAbout}>
                            <TextareaID_1
                                placeholder="Description" 
                                value={about_company} 
                                setState={setAboutCompany}
                            />
                        </div>
                        <div className={styles.form__companyCategory}>
                            <div className={styles.form__inputBar}>
                                <SelectID_1 text={"Category"} value={category} setState={setCategory} map={categories}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyEdit;