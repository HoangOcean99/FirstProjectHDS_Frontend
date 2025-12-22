import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="mt-5 rounded-5 d-flex align-items-center">
            {/* Container chính */}
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">

                        {/* Biểu tượng hoặc Badge */}
                        <div className="mb-4">
                            <span className="badge rounded-pill bg-success bg-opacity-10 text-success px-3 py-2">
                                Hệ thống nội bộ v1.0
                            </span>
                        </div>

                        {/* Tiêu đề */}
                        <h1 className="display-3 fw-bold text-dark mb-3">
                            Website Quản Lý <span className="text-success">Sản Phẩm</span>
                        </h1>

                        <p className="lead text-secondary mb-5">
                            Hệ thống quản trị thông minh giúp bạn theo dõi tồn kho, cập nhật giá cả
                            và lưu trữ toàn bộ đơn hàng.
                        </p>

                        {/* Khu vực nút bấm */}
                        <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                            <button
                                className="btn btn-outline-success btn-lg px-5 py-3 shadow-sm fw-semibold"
                                onClick={() => navigate('/master-product')}
                            >
                                <i className="bi bi-box-seam me-2"></i> Xem danh sách sản phẩm
                            </button>

                            <button
                                className="btn btn-outline-success btn-lg px-5 py-3 shadow-sm fw-semibold"
                                onClick={() => navigate('/sale-out')}
                            >
                                <i className="bi bi-plus-circle me-2"></i> Xem danh sách đơn hàng
                            </button>
                        </div>

                        {/* Chỉ số nhanh (Tùy chọn thêm cho đẹp) */}
                        <div className="row mt-5 pt-5 border-top">
                            <div className="col-12">
                                <h4 className="fw-bold mb-0 text-success">HDSoft</h4>
                                <small className="text-muted">Company</small>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;