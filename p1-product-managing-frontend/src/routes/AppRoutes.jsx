import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MasterProductPage from "../pages/MasterProductPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SaleOutPage from "../pages/SaleOutPage";
import HomePage from "../pages/HomePage";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/master-product" element={<MasterProductPage />} />
                <Route path="/sale-out" element={<SaleOutPage />} />
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