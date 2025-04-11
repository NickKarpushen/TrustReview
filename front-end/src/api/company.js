import axios from "axios";

const API_URL = 'http://localhost:4000/api';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_URL;

export const UpdateCompany = async(file, company,
    company_name, website_link, phone_number, about_company, category ) => {

    console.log(about_company)
    const formData = new FormData();
    if (file) {
        formData.append('logo', file);
    }
    formData.append('companyId', company._id);
    formData.append('company_name', company_name);
    formData.append('website_link', website_link);
    formData.append('phone_number', phone_number);
    formData.append('about_company', about_company);
    formData.append('category', category);

    try{
        const res = await axios.patch('/company', formData, 
        {
            headers:{
            Authorization: `${sessionStorage.getItem("token")}`
            } 
        }
        );
        console.log(res)
    }catch (error){
        throw error.response ? error.response : { message: error.message };
    }
}