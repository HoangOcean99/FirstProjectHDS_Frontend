import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';


const PopUpMasterProductComponent = ({ show, handleClose, handleSave, initialData = {} }) => {

    const [formData, setFormData] = useState({
        productCode: '',
        productName: '',
        unit: '',
        specification: '',
        quantityPerBox: '',
        productWeight: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                productCode: initialData.productCode || '',
                productName: initialData.productName || '',
                unit: initialData.unit || '',
                specification: initialData.specification || '',
                quantityPerBox: initialData.quantityPerBox || '',
                productWeight: initialData.productWeight || '',
            });
        }
    }, [initialData]);

    const isEdit = initialData.productCode ? true : false;
    const modalTitle = isEdit ? 'Chỉnh sửa Sản phẩm' : 'Thêm mới Sản phẩm';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave(formData, isEdit, initialData.id);
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Mã sản phẩm <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="productCode"
                                    value={formData.productCode}
                                    onChange={handleChange}
                                    required
                                    disabled={isEdit}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Tên sản phẩm <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleChange}
                                    required
                                    disabled={isEdit}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Đơn vị <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="unit"
                                    value={formData.unit}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Quy cách <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="specification"
                                    value={formData.specification}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Số lượng/Thùng <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="number"
                                    name="quantityPerBox"
                                    value={formData.quantityPerBox}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Trọng lượng <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="number"
                                    name="productWeight"
                                    value={formData.productWeight}
                                    onChange={handleChange}
                                    step="0.01"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end border-top pt-3 mt-3">
                        <Button variant="secondary" onClick={handleClose} className="me-2">
                            Đóng
                        </Button>
                        <Button variant="success" type='submit'>
                            Lưu
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default PopUpMasterProductComponent;