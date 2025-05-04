import styles from './App.module.scss';
import MainPage from './pages/main_page/MainPage';
import SignUpPage from './pages/sing_up_page/SIgnUpPage';
import NotFoundPage404 from './pages/NotFoundPage404/NotFoundPage404';
import LogInPage from './pages/log_in_page/LogInPage';
import Menu from './components/menu/Menu'
import SignUpBusinessPage from './pages/sing_up_business_page/SignUpBusinessPage';
import ProfileUserPage from './pages/profile_user_page/PofileUserPage';
import UserEdit from './components/user_edit/UserEdit';
import CompanyPage from './pages/company_page/CompanyPage';
import CompanyUserPage from './pages/company_user_page/CompanyUserPage';
import CompanyEdit from './components/company_edit/CompanyEdit';
import CategoryPage from './pages/category_page/CategoryPage';
import ReviewForm from './components/review_form/ReviewForm';
import ReviewEdit from './components/review_edit/ReviewEdit';
import CategoriesPage from './pages/categories_page/CategoriesPage';
import { Routes, Route, useLocation } from "react-router-dom";
import { CompanyProvider } from './contexts/CompanyContext';
import { UserReviewsProvider } from './contexts/UserReviewsContext';
import { useUser } from './contexts/UserContext';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function App() {

  const location = useLocation();
  const [isMenu, setIsMenu] = useState(false);
  const {user} = useUser();
  
  const handleMenuClick = () =>{
    setIsMenu(!isMenu)
  }

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const showMenu = location.pathname !== '/log_in' && location.pathname !== '/sign_up' && location.pathname !== '/sign_up_business';

  return (
    <div className={styles.App}>
        {(isMenu && showMenu) && <Menu function={handleMenuClick}/>}
        <Routes>
          <Route path="/" element={<MainPage function={handleMenuClick} isState={!isMenu}/>}/>
          <Route path="/sign_up" element={<SignUpPage />} />
          <Route path="/sign_up_business" element={<SignUpBusinessPage/>} />
          <Route path="/log_in" element={<LogInPage/>}/>
          <Route path="/profile_user/*" element={<UserReviewsProvider> {user ? <ProfileUserPage function={handleMenuClick} isState={!isMenu}/> : <Navigate to="/log_in" replace />}</UserReviewsProvider>}>
            <Route path='user_edit' element={<UserEdit/>}/>
            <Route path='review_edit' element={<ReviewEdit/>}/>
          </Route>
          <Route path="/my_company/*" element={<CompanyProvider> {user && user.role === 'business' ? <CompanyUserPage function={handleMenuClick} isState={!isMenu}/> : <Navigate to="/log_in" replace />}</CompanyProvider>}>
            <Route path='company_edit' element={<CompanyEdit/>}/>
          </Route>
          <Route path='/company/*' element={<CompanyPage function={handleMenuClick} isState={!isMenu}/>}>
            <Route path='review' element={user ? <ReviewForm/> : <Navigate to="/log_in" replace />}/>
          </Route>
          <Route path ='/category' element={<CategoryPage function={handleMenuClick} isState={!isMenu}/>}/>
          <Route path='/categories' element={<CategoriesPage function={handleMenuClick} isState={!isMenu}/>}/>
          <Route path="*" element={<NotFoundPage404 />}/>
        </Routes>
    </div>
  );
}

export default App;
