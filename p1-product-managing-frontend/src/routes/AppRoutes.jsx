import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MasterProductPage from "../pages/MasterProductPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SaleOutPage from "../pages/SaleOutPage";
import HomePage from "../pages/HomePage";
import EmailPage from "../pages/EmailPage";
import EmailLoginPage from "../pages/EmailLoginPage";
import EmailByGmailApiPage from "../pages/EmailByGmailApiPage";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/master-product" element={<MasterProductPage />} />
                <Route path="/sale-out" element={<SaleOutPage />} />
                <Route path="/email" element={<EmailPage />} />
                <Route path="/emailByGmailApi" element={<EmailLoginPage />} />
                <Route path="/gmail/inbox" element={<EmailByGmailApiPage />} />

            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </BrowserRouter>

    );
}
export default AppRoutes;