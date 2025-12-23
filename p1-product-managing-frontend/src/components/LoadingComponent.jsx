const LoadingComponent = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
            <div className="text-center">
                <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem' }}>
                    <span className="visually-hidden">Đang tải...</span>
                </div>
                <p className="mt-2 text-success fw-bold">Đang tải dữ liệu...</p>
            </div>
        </div>
    );
}
export default LoadingComponent; 