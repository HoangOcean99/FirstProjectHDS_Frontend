import React, { useEffect, useState, useRef } from "react";
import masterProductApi from "../api/MasterProductApi";
import LoadingComponent from "../components/LoadingComponent";
import SearchComponent from "../components/SearchComponent";
import DetailFunctionsComponent from "../components/DetailFunctionsComponent";
import PopUpMasterProductComponent from "../components/PopUpMasterProductComponent";
import DataTableComponent from "../components/DataTableComponent";
import { toast } from "react-toastify";
import PopUpUploadFileProduct from "../components/PopUpUploadFileProduct";
import { downloadTemplate } from "../utils/handleTemplateUtil";
import { formatNumber } from "../utils/handleNumberUtil";
import { useNavigate } from "react-router-dom";

const MasterProductPage = () => {
    const [masterProductData, setMasterProductData] = useState([]);
    const [originProductData, setOriginProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenPopUpInsertEdit, setIsOpenPopUpInsertEdit] = useState(false);
    const [isOpenPopUpUpload, setIsOpenPopUpUpload] = useState(false);
    const [productEdit, setProductEdit] = useState({});
    const selectFieldRef = useRef();
    const inputFilterRef = useRef();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();

    const columnData = [
        { title: "Mã sản phẩm", data: "productCode" },
        { title: "Tên sản phẩm", data: "productName" },
        { title: "Đơn vị tính", data: "unit" },
        { title: "Quy cách", data: "specification" },
        { title: "Số lượng/Thùng", data: "quantityPerBox" },
        { title: "Trọng lượng", data: "productWeight" }
    ];
    useEffect(() => {
        fetchMasterProduct();
    }, []);
    const fetchMasterProduct = async () => {
        try {
            setIsLoading(true);
            const response = await masterProductApi.getAll();
            const mainData = response.map((item, _) => ({
                ...item,
                quantityPerBox: formatNumber(item.quantityPerBox),
                productWeight: formatNumber(item.productWeight)
            }))
            setMasterProductData(mainData);
            setOriginProductData(mainData);

            const totalPages = Math.ceil(response.length / rowsPerPage);
            if (page >= totalPages) setPage(totalPages - 1);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    const filterData = () => {
        if (!originProductData) return;
        const field = selectFieldRef.current.value;
        const keyword = inputFilterRef.current.value.trim().toLowerCase();

        const filtered = originProductData.filter(item =>
            String(item[field]).toLowerCase().includes(keyword)
        );
        setMasterProductData(filtered);
        setPage(0);
    };
    const handleSave = async (formData, isEdit, id) => {
        try {
            setIsLoading(true);
            if (isEdit) {
                await masterProductApi.editProduct({ ...formData, id });
                toast.success("Chỉnh sửa sản phẩm thành công!");
            } else {
                await masterProductApi.insertProduct(formData);
                toast.success("Thêm sản phẩm thành công!");
            }
            await fetchMasterProduct();
        } catch (error) {
            if (error.status === 409) {
                toast.error(error?.response?.data?.message);
            }
        } finally {
            setIsLoading(false);
            setIsOpenPopUpInsertEdit(false);
        }
    };
    const handleDelete = async (id) => {
        try {
            setIsLoading(true);
            await masterProductApi.deleteProduct(id);
            toast.success("Xóa sản phẩm thành công!");
            await fetchMasterProduct();
        } catch (error) {
            console.error(error);
            toast.error("Đã xảy ra lỗi!");
        } finally {
            setIsLoading(false);
        }
    };
    const openEditPopUp = (data) => {
        setProductEdit(data);
        setIsOpenPopUpInsertEdit(true);
    };
    const openInsertPopUp = () => {
        setProductEdit({});
        setIsOpenPopUpInsertEdit(true);
    };
    const handleDownload = async () => {
        const columns = columnData.map((item, index) => {
            return item.title
        })
        await downloadTemplate(columns, 'TemplateMasterProduct');
    }
    const handleCloseUploadPopUp = async (success) => {
        setIsOpenPopUpUpload(false);
        if (success) {
            await fetchMasterProduct();
        }
    }

    if (isLoading) return <LoadingComponent />;

    return (
        <div className="container">
            <div className="card shadow-sm mb-3">
                <div className="card-body">
                    <div className="row g-2 align-items-center">
                        <SearchComponent
                            selectFieldRef={selectFieldRef}
                            inputFilterRef={inputFilterRef}
                            filter={filterData}
                            columnData={columnData}
                        />
                        <DetailFunctionsComponent
                            openPopUpInsert={openInsertPopUp}
                            handleDownload={handleDownload}
                            openPopUpUpload={() => setIsOpenPopUpUpload(true)}
                            type={false}
                        />
                    </div>
                </div>
            </div>

            <DataTableComponent
                data={masterProductData}
                columnData={columnData}
                deleteProduct={handleDelete}
                openPopUpEdit={openEditPopUp}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            />

            <PopUpMasterProductComponent
                show={isOpenPopUpInsertEdit}
                handleClose={() => setIsOpenPopUpInsertEdit(false)}
                handleSave={handleSave}
                initialData={productEdit}
            />

            <PopUpUploadFileProduct
                show={isOpenPopUpUpload}
                handleClose={handleCloseUploadPopUp}
                type={'product'}
            />
            <button className="btn btn-success mb-3 me-3" onClick={() => navigate('/')}>Trang chủ</button>
            <button className="btn btn-success mb-3" onClick={() => navigate('/sale-out')}>Xem đơn hàng</button>
        </div>
    );
};

export default MasterProductPage;
