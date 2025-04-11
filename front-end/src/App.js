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
import CompanyEdit from './components/company_edit/CompanyEdit';
import { Routes, Route, useLocation } from "react-router-dom";
import { CompanyProvider } from './contexts/CompanyContext';
import { useUser } from './contexts/UserContext';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function App() {

  const location = useLocation();
  const [isMenu, setIsMenu] = useState(false);
  const {user} = useUser();
  
  const handleMenuClick = () =>{
    setIsMenu(!isMenu)
  }

  const showMenu = location.pathname !== '/log_in' && location.pathname !== '/sign_up' && location.pathname !== '/sign_up_business';

  return (
    <div className={styles.App}>
        {(isMenu && showMenu) && <Menu function={handleMenuClick}/>}
        <Routes>
          <Route path="/" element={<MainPage function={handleMenuClick} isState={!isMenu}/>}/>
          <Route path="/sign_up" element={<SignUpPage />} />
          <Route path="/sign_up_business" element={<SignUpBusinessPage/>} />
          <Route path="/log_in" element={<LogInPage/>}/>
          <Route path="/profile_user/*" element={user ? <ProfileUserPage function={handleMenuClick} isState={!isMenu}/> : <Navigate to="/log_in" replace />}>
            <Route path='user_edit' element={<UserEdit/>}/>
          </Route>
            <Route path="/my_company/*" element={<CompanyProvider> {user && user.role === 'business' ? <CompanyPage function={handleMenuClick} isState={!isMenu}/> : <Navigate to="/log_in" replace />}</CompanyProvider>}>
              <Route path='company_edit' element={<CompanyEdit/>}/>
            </Route>
          <Route path="*" element={<NotFoundPage404 />}/>
        </Routes>
    </div>
  );
}

export default App;
