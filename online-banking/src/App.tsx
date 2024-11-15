import { BrowserRouter, Routes, Route } from "react-router-dom";

import NullPage from './pages/NullPage';

import AtmFeature from './pages/AtmFeature';
import AtmLogin from './pages/AtmLogin';
import AccountPage from './pages/AccountPage';
import AdminLogin from './pages/AdminLogin';
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import UserLogin from "./pages/UserLogin";
import ForgotPassword from "./pages/ForgotPassword";
import Password from "./pages/Password";


import VerifyCode from './pages/VerifyCode';
import ResetPassword from './pages/ResetPassword';
import AdminPortal from "./pages/AdminPortal";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default landing page  */}
        <Route index element={<Homepage />}/>

        <Route path="/atmlogin" element={<AtmLogin />} />
        <Route path="/atmfeature" element={<AtmFeature />} />
        <Route path="/accountpage" element={<AccountPage />} />

        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminportal" element={<AdminPortal/>} />

        <Route path="/homepage" element={<Homepage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/password" element={<Password />} />

        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/verifyCode" element={<VerifyCode />} />
        <Route path="/resetPassword" element={<ResetPassword />} />

        {/* Any other url input that doesn't match the ones above will land to this null page */}
        <Route path="*" element={<NullPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
