const LoadingComponent = () => {
    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{
                zIndex: 9999,
                backgroundColor: 'rgba(255,255,255,0.7)'
            }}
        >
            <div className="text-center">
                <div
                    className="spinner-border text-success"
                    style={{ width: '4rem', height: '4rem' }}
                />
                <p className="mt-3 fw-bold text-success">
                    Đang tải dữ liệu...
                </p>
            </div>
        </div>
    );
};

export default LoadingComponent;
