import { useEffect, useRef, useState } from "react";
import DataTableComponent from "../components/DataTableComponent";
import DetailFunctionsComponent from "../components/DetailFunctionsComponent";
import SearchComponent from "../components/SearchComponent";
import SaleOutApi from "../api/SaleOutApi";
import saleOutApi from "../api/SaleOutApi";
import LoadingComponent from "../components/LoadingComponent";
import { formatDateToInt, formatIntDate } from "../utils/handleSaleOut";
import PopUpSaleOutComponent from "../components/PopUpSaleOutComponent";
import masterProductApi from "../api/MasterProductApi";
import { toast } from "react-toastify";
import { formatNumber } from "../utils/handleNumberUtil";

const SaleOutPage = () => {
    const [SaleOutData, setSaleOutData] = useState([]);
    const [originSaleOutData, setOriginSaleOutData] = useState([]);
    const [masterProductData, setMasterProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenPopUpInsertEdit, setIsOpenPopUpInsertEdit] = useState(false);
    const [productEdit, setProductEdit] = useState({});

    const selectFieldRef = useRef();
    const inputFilterRef = useRef();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const columnData = [
        { title: "Số PO khách hàng", data: "customerPoNo" },
        { title: "Ngày đặt hàng", data: "orderDate" },
        { title: "Khách hàng", data: "customerName" },
        { title: "Mã sản phẩm", data: "productCode" },
        { title: "Tên sản phẩm", data: "productName" },
        { title: "Đơn vị tính", data: "unit" },
        { title: "Số lượng", data: "quantity" },
        { title: "Số lượng/thùng", data: "quantityPerBox" },
        { title: "Số thùng", data: "boxQuantity" },
        { title: "Đơn giá", data: "price" },
        { title: "Thành tiền", data: "amount" }
    ];

    useEffect(() => {
        fetchSaleOut();
    }, []);

    const fetchSaleOut = async () => {
        try {
            setIsLoading(true);
            const responseSaleOut = await saleOutApi.getAll();
            const responseMasterProduct = await masterProductApi.getAll();
            const mainData = responseSaleOut.map((item) => ({
                ...item,
                orderDate: formatIntDate(item.orderDate),
                quantity: formatNumber(item.quantity),
                price: formatNumber(item.price),
                amount: formatNumber(item.amount),
                quantityPerBox: formatNumber(item.quantityPerBox),
                boxQuantity: formatNumber(item.boxQuantity),
            }));
            setSaleOutData(mainData);
            setOriginSaleOutData(mainData);
            setMasterProductData(responseMasterProduct);

            const totalPages = Math.ceil(mainData.length / rowsPerPage);
            if (page >= totalPages) setPage(totalPages - 1);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const filterData = () => {
        if (!originSaleOutData) return;
        const field = selectFieldRef.current.value;
        const keyword = inputFilterRef.current.value.trim().toLowerCase();

        const filtered = originSaleOutData.filter(item =>
            String(item[field]).toLowerCase().includes(keyword)
        );
        setSaleOutData(filtered);
        setPage(0);
    };


    const handleSave = async (formData, isEdit, id) => {
        try {
            setIsLoading(true);
            if (isEdit) {
                await masterProductApi.editProduct({ ...formData, id });
                toast.success("Chỉnh sửa sản phẩm thành công!");
            } else {
                const dataSend = {
                    ...formData,
                    boxQuantity: Math.ceil(formData.quantity / formData.quantityPerBox),
                    amount: formData.quantity * formData.price,
                    orderDate: formatDateToInt(formData.orderDate),
                    quantity: parseInt(formData.quantity),
                    price: parseInt(formData.price)

                }
                await saleOutApi.insertSaleOut(dataSend);
                toast.success("Thêm sản phẩm thành công!");
            }
            await fetchSaleOut();
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            setIsLoading(false);
            setIsOpenPopUpInsertEdit(false);
        }
    };

    const handleDownload = async () => {
        const columns = columnData.map((item, index) => {
            return item.title
        })
        await downloadTemplate(columns, 'TemplateMasterProduct');
    }

    const handleDelete = async (id) => {
        try {
            setIsLoading(true);
            await SaleOutApi.deleteProduct(id);
            toast.success("Xóa sản phẩm thành công!");
            await fetchSaleOut();
        } catch (error) {
            console.error(error);
            toast.error("Đã xảy ra lỗi!");
        } finally {
            setIsLoading(false);
        }
    };

    const openInsertPopUp = () => {
        setProductEdit({});
        setIsOpenPopUpInsertEdit(true);
    };
    const openEditPopUp = (data) => {
        setProductEdit(data);
        setIsOpenPopUpInsertEdit(true);
    };


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
                            type={true}
                        />
                    </div>
                </div>
            </div>

            <DataTableComponent
                data={SaleOutData}
                columnData={columnData}
                deleteProduct={handleDelete}
                openPopUpEdit={openEditPopUp}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            />
            <PopUpSaleOutComponent
                show={isOpenPopUpInsertEdit}
                handleClose={() => setIsOpenPopUpInsertEdit(false)}
                handleSave={handleSave}
                initialData={productEdit}
                allMasterProductData={masterProductData}
            />
        </div>
    ); s
}
export default SaleOutPage;