import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import saleOutApi from '../api/saleOutApi';
import { toast } from 'react-toastify';
import LoadingComponent from './LoadingComponent';

const PopUpPrintPdf = ({ show, handleClose, handleExport }) => {
    const [allSaleOutNo, setAllSaleOutNo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const saleOutNoRef = useRef();

    useEffect(() => {
        fetchSaleOutNo();
    }, []);
    const fetchSaleOutNo = async () => {
        try {
            setIsLoading(true);
            const response = await saleOutApi.getAllSaleOutNo();
            setAllSaleOutNo(response);
        }
        catch (error) {
            toast.error(error);
        } finally {
            setIsLoading(false);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        handleExport(saleOutNoRef.current.value);
    };

    if (isLoading) return <LoadingComponent />;

    return (
        <Modal show={show} onHide={handleClose} centered size="md">
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="fs-4 fw-bold text-success">In phiếu</Modal.Title>
            </Modal.Header>

            <Modal.Body className="py-2 px-4">
                <Form.Group className="mb-3">
                    <Form.Label className="mb-1">
                        Số phiếu <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                        className="bg-light border-success"
                        style={{ borderRadius: '4px' }}
                        ref={saleOutNoRef}
                    >
                        {allSaleOutNo.map((item, _) => {
                            return (
                                <option key={item}>{item}</option>
                            );
                        })}
                    </Form.Select>
                </Form.Group>
            </Modal.Body>

            <Modal.Footer className="border-0 d-flex justify-content-center gap-3 pb-4">
                <Button
                    variant="outline-success"
                    onClick={handleClose}
                    className="px-4 py-1 btn btn-ouline-success"
                >
                    Đóng
                </Button>
                <Button
                    variant="success"
                    className="px-4 py-1 border-0 btn btn-success"
                    onClick={handleSubmit}
                >
                    Xuất dữ liệu
                </Button>
            </Modal.Footer>
        </Modal >
    );
};

export default PopUpPrintPdf;