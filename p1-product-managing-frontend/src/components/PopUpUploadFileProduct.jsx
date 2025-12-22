import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { uploadTemplate } from '../utils/handleTemplateUtil';

const PopUpUploadFileProduct = ({ show, handleClose, type }) => {

    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState([]);

    const handleUpload = async () => {
        if (!file) {
            alert("Vui lòng chọn file Excel");
            return;
        }
        const isSuccess = await uploadTemplate(file, setErrors, type);
        handleClose(isSuccess);
        setFile(null);
    };

    return (
        <div className="p-5">
            <Modal show={show} onHide={handleClose} centered size="md">
                <Modal.Header closeButton>
                    <Modal.Title className="fs-5 fw-bold text-success">Tải lên tập tin</Modal.Title>
                </Modal.Header>

                <Modal.Body className="py-4 px-5">
                    <div className="d-grid gap-2">
                        <input
                            type="file"
                            id="file-upload"
                            hidden
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <label
                            htmlFor="file-upload"
                            className="btn btn-outline-success py-3 fs-4 mb-0"
                            style={{ border: '2px solid #198754' }}
                        >
                            Chọn tệp
                        </label>
                    </div>
                </Modal.Body>
                {file && (
                    <div className="ms-5">
                        {file.name}
                    </div>
                )}

                <Modal.Footer className="border-0 pb-4">
                    <Button
                        variant="outline-success"
                        onClick={handleClose}
                        className="px-4 border-2 fw-bold"
                    >
                        Đóng
                    </Button>
                    <Button
                        variant="success"
                        onClick={handleUpload}
                        className="px-4 border-2 fw-bold"
                    >
                        Tải lên
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PopUpUploadFileProduct;