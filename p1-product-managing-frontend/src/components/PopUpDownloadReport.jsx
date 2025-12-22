import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const PopUpDownloadReport = ({ show, handleClose, handleExport }) => {
    const [formData, setFormData] = useState({
        fromDate: '',
        toDate: '',
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        handleExport(formData);
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
            size="md"
        >
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="fs-4 fw-normal">Ngày đặt hàng</Modal.Title>
            </Modal.Header>

            <Modal.Body className="pt-2">
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-4">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>
                                    Từ ngày <span className="text-danger">*</span>
                                </Form.Label>
                                <div className="input-group">
                                    <Form.Control
                                        type="date"
                                        name="fromDate"
                                        value={formData.fromDate}
                                        onChange={handleChange}
                                        required
                                        className="border-dark shadow-none"
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>
                                    Đến ngày <span className="text-danger">*</span>
                                </Form.Label>
                                <div className="input-group">
                                    <Form.Control
                                        type="date"
                                        name="toDate"
                                        value={formData.toDate}
                                        onChange={handleChange}
                                        required
                                        className="border-dark shadow-none"
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end gap-2 pt-2">
                        <Button
                            variant="white"
                            onClick={handleClose}
                            className="px-4 btn btn-outline-success"
                        >
                            Đóng
                        </Button>
                        <Button
                            type="submit"
                            className="px-4 btn btn-success"
                        >
                            Xuất dữ liệu
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default PopUpDownloadReport;