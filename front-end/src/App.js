import './App.css';
import MainPage from './pages/main_page/MainPage';
import SignUpPage from './pages/sing_up_page/SIgnUpPage';
import NotFoundPage404 from './pages/NotFoundPage404/NotFoundPage404';
import LogInPage from './pages/log_in_page/LogInPage';
import SignUpBusinessPage from './pages/sing_up_business_page/SignUpBusinessPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sign_up" element={<SignUpPage />} />
          <Route path="sign_up_business" element={<SignUpBusinessPage/>} />
          <Route path="/log_in" element={<LogInPage/>}/>
          <Route path="*" element={<NotFoundPage404 />}/>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
