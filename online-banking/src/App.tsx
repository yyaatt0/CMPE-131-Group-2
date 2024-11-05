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
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />

        {/* Any other url input that doesn't match the ones above will land to this null page */}
        <Route path="*" element={<NullPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
