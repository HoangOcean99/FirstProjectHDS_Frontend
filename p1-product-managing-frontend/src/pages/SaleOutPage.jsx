import { useEffect, useRef, useState } from "react";
import DataTableComponent from "../components/DataTableComponent";
import DetailFunctionsComponent from "../components/DetailFunctionsComponent";
import SearchComponent from "../components/SearchComponent";
import saleOutApi from "../api/saleOutApi";
import LoadingComponent from "../components/LoadingComponent";
import { formatDateToInt, formatIntDate } from "../utils/handleSaleOut";
import PopUpSaleOutComponent from "../components/PopUpSaleOutComponent";
import masterProductApi from "../api/MasterProductApi";
import { toast } from "react-toastify";
import { formatNumber } from "../utils/handleNumberUtil";
import { downloadReport, downloadReportPdf, downloadTemplate } from "../utils/handleTemplateUtil";
import PopUpUploadFileProduct from "../components/PopUpUploadFileProduct";
import PopUpDownloadReport from "../components/PopUpDownLoadReport";
import { useNavigate } from "react-router-dom";
import PopUpPrintPdf from "../components/PopUpPrintPdf";

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
    const [totalRow, setTotalRow] = useState(0);
    const [isOpenPopUpUpload, setIsOpenPopUpUpload] = useState(false);
    const [isOpenPopUpReport, setIsOpenPopUpReport] = useState(false);
    const [isOpenPopUpPrintPdf, setIsOpenPopUpPrintPdf] = useState(false);

    const navigate = useNavigate();

    const columnDataExcel = [
        { title: "Số PO khách hàng", data: "customerPoNo" },
        { title: "Ngày đặt hàng (yyyy/MM/dd)", data: "orderDate" },
        { title: "Khách hàng", data: "customerName" },
        { title: "Mã sản phẩm", data: "productCode" },
        { title: "Số lượng", data: "quantity" },
        { title: "Số lượng/thùng", data: "quantityPerBox" },
        { title: "Đơn giá", data: "price" },
    ];
    const columnData = [
        { title: "Số PO khách hàng", data: "customerPoNo" },
        { title: "Ngày đặt hàng", data: "orderDate" },
        { title: "Khách hàng", data: "customerName" },
        { title: "Mã sản phẩm", data: "productCode" },
        { title: "Tên sản phẩm", data: "productName" },
        { title: "Đơn vị tính", data: "unit" },
        { title: "Số lượng", data: "quantity" },
        { title: "Số lượng/thùng", data: "quantityPerBox" },
        { title: "Số thùngthùng", data: "boxQuantity" },
        { title: "Đơn giá", data: "price" },
        { title: "Thành tiền", data: "amount" },
    ];
    useEffect(() => {
        fetchSaleOut();
    }, [page, rowsPerPage]);
    const fetchSaleOut = async () => {
        try {
            setIsLoading(true);
            const responseSaleOut = await saleOutApi.GetPagedAsync(page + 1, rowsPerPage);
            console.log('responseSaleOut', responseSaleOut)
            const mainData = responseSaleOut.items.map((item) => ({
                ...item,
                orderDate: formatIntDate(item.orderDate),
                quantity: formatNumber(item.quantity),
                price: formatNumber(item.price),
                amount: formatNumber(item.amount),
                quantityPerBox: formatNumber(item.quantityPerBox),
                boxQuantity: formatNumber(item.boxQuantity),
            }));
            setTotalRow(responseSaleOut.total);
            setSaleOutData(mainData);
            setOriginSaleOutData(mainData);
            setMasterProductData(masterProductData);

            const totalPages = Math.ceil(responseSaleOut.length / rowsPerPage);
            if (page >= totalPages) setPage(totalPages - 1);
        } catch (error) {
            toast.error(error);
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
            const dataSend = {
                ...formData,
                boxQuantity: Math.ceil(formData.quantity / formData.quantityPerBox),
                orderDate: formatDateToInt(formData.orderDate),
                quantity: parseInt(formData.quantity),
                price: parseInt(formData.price),
            }
            if (isEdit) {
                await saleOutApi.editSaleOut({ ...dataSend, id });
                toast.success("Chỉnh sửa sản phẩm thành công!");
            } else {
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
        const columns = columnDataExcel.map((item, index) => {
            return item.title
        })
        await downloadTemplate(columns, 'TemplateSaleOut');
    }
    const handleDelete = async (id) => {
        try {
            setIsLoading(true);
            await SaleOutApi.deleteSaleOut(id);
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
    const handleCloseUploadPopUp = async (success) => {
        setIsOpenPopUpUpload(false);
        if (success) {
            await fetchSaleOut();
        }
    }
    const handleExportReport = async (formData) => {
        const fromDate = formatDateToInt(formData.fromDate);
        const toDate = formatDateToInt(formData.toDate);
        await downloadReport(fromDate, toDate);
    }
    const handleDownloadReportPdf = async (saleOutNo) => {
        await downloadReportPdf(saleOutNo);
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
                            openPopUpReport={() => setIsOpenPopUpReport(true)}
                            openPopUpPrintPdf={() => setIsOpenPopUpPrintPdf(true)}
                            type={true}
                        />
                    </div>
                </div>
            </div>

            <DataTableComponent
                total={totalRow}
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

            <PopUpUploadFileProduct
                show={isOpenPopUpUpload}
                handleClose={handleCloseUploadPopUp}
                type={'saleOut'}
            />
            <PopUpDownloadReport
                show={isOpenPopUpReport}
                handleClose={() => setIsOpenPopUpReport(false)}
                handleExport={handleExportReport}
            />
            <PopUpPrintPdf
                show={isOpenPopUpPrintPdf}
                handleClose={() => setIsOpenPopUpPrintPdf(false)}
                handleExport={handleDownloadReportPdf}
            />
            <button className="btn btn-success mb-3 me-3" onClick={() => navigate('/')}>Trang chủ</button>
            <button className="btn btn-success mb-3" onClick={() => navigate('/master-product')}>Xem sản phẩm</button>
        </div>
    ); s
}
export default SaleOutPage;