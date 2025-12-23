import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PopUpPrintPdf = ({ show, handleClose }) => {
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
                    >
                        <option>STO2025120002</option>
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
                >
                    Xuất dữ liệu
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PopUpPrintPdf;