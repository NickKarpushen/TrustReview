import styles from './App.module.scss';
import MainPage from './pages/main_page/MainPage';
import SignUpPage from './pages/sing_up_page/SIgnUpPage';
import NotFoundPage404 from './pages/NotFoundPage404/NotFoundPage404';
import LogInPage from './pages/log_in_page/LogInPage';
import Menu from './components/menu/Menu'
import SignUpBusinessPage from './pages/sing_up_business_page/SignUpBusinessPage';
import ProfileUser from './pages/profile_user/PofileUser';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { UserProvider } from './contexts/UserContext';
import { useState } from 'react';

function App() {

  const location = useLocation();
  const [isMenu, setIsMenu] = useState(false);

  const handleMenuClick = () =>{
    setIsMenu(!isMenu)
  }

  const showMenu = location.pathname !== '/log_in' && location.pathname !== '/sign_up' && location.pathname !== '/sign_up_business';

  return (
    <div className={styles.App}>
      <UserProvider>
          {(isMenu && showMenu) && <Menu function={handleMenuClick}/>}
          <Routes>
            <Route path="/" element={<MainPage function={handleMenuClick} isState={!isMenu}/>}/>
            <Route path="/sign_up" element={<SignUpPage />} />
            <Route path="sign_up_business" element={<SignUpBusinessPage/>} />
            <Route path="/log_in" element={<LogInPage/>}/>
            <Route path="profile_user" element={<ProfileUser function={handleMenuClick} isState={!isMenu}/>}/>
            <Route path="*" element={<NotFoundPage404 />}/>
          </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
