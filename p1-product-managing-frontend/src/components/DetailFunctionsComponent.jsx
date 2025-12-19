import { FaDownload, FaPlus, FaUpload } from "react-icons/fa";

const DetailFunctionsComponent = ({ openPopUpInsert, handleDownload, openPopUpUpload, type }) => {
    return (
        <div className="col-md-12 text-center">
            <button className="btn btn-success me-5" onClick={openPopUpInsert}>
                <FaPlus /> Thêm mới
            </button>
            <button className="btn btn-outline-success me-5" onClick={handleDownload}>
                <FaDownload /> File mẫu
            </button>
            <button className="btn btn-outline-success" onClick={openPopUpUpload}>
                <FaUpload /> Upload
            </button>
            {type && <button className="btn btn-success ms-5" onClick={openPopUpUpload}>
                Báo cáo doanh thu
            </button>}
        </div>
    );
}
export default DetailFunctionsComponent;