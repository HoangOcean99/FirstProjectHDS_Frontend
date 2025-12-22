import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const PopUpSaleOutComponent = ({ show, handleClose, handleSave, initialData = {}, allMasterProductData }) => {

    const [formData, setFormData] = useState({
        customerPoNo: '',
        orderDate: '',
        customerName: '',
        productCode: '',
        productName: '',
        unit: '',
        price: '',
        quantity: '',
        quantityPerBox: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                customerPoNo: initialData.customerPoNo || '',
                orderDate: initialData.orderDate || '',
                customerName: initialData.customerName || '',
                productCode: initialData.productCode || '',
                productName: initialData.productName || '',
                unit: initialData.unit || '',
                price: initialData.price || '',
                quantity: initialData.quantity || '',
                quantityPerBox: initialData.quantityPerBox || '',
            });
        }
    }, [initialData]);

    const isEdit = initialData.id ? true : false;
    const modalTitle = isEdit ? 'Chỉnh sửa Đơn xuất hàng' : 'Thêm mới Đơn xuất hàng';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSelectProduct = (e) => {
        const selectedProductCode = e.target.value;
        const selectedProduct = allMasterProductData.find(
            p => p.productCode === selectedProductCode
        );

        if (selectedProduct) {
            setFormData(prev => ({
                ...prev,
                productCode: selectedProduct.productCode,
                productName: selectedProduct.productName,
                unit: selectedProduct.unit || '',
                quantityPerBox: selectedProduct.quantityPerBox || '',
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                productCode: '',
                productName: '',
                unit: '',
                quantityPerBox: '',
            }));
        }
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
                <Modal.Title className="fs-5 fw-bold">{modalTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Số PO Khách hàng <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="customerPoNo"
                                    value={formData.customerPoNo}
                                    onChange={handleChange}
                                    required
                                    disabled={isEdit}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Ngày đặt hàng <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="date"
                                    name="orderDate"
                                    value={formData.orderDate}
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
                                <Form.Label>Khách hàng <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleChange}
                                    required
                                    disabled={isEdit}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Sản phẩm <span className="text-danger">*</span></Form.Label>
                                <Form.Select
                                    name="productCode"
                                    value={formData.productCode}
                                    onChange={handleSelectProduct}
                                    required
                                >
                                    <option value="">Chọn sản phẩm</option>
                                    {allMasterProductData.map((item, _) => {
                                        return <option key={`${item.productCode}`} value={`${item.productCode}`}>{item.productCode} - {item.productName}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Đơn vị tính <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="unit"
                                    value={formData.unit}
                                    onChange={handleChange}
                                    required
                                    disabled={true}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Đơn giá <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Số lượng <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
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
                    </Row>

                    <div className="d-flex justify-content-end border-top pt-3 mt-3">
                        <Button variant="outline-success" onClick={handleClose} className="me-2 px-4 border-2">
                            Đóng
                        </Button>
                        <Button variant="success" type='submit' className="px-4 border-2">
                            Lưu
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default PopUpSaleOutComponent;