const SearchComponent = ({ selectFieldRef, inputFilterRef, filter, columnData }) => {
    return (
        <div className="row g-2 align-items-center">

            <div className="col-md-3">
                <select className="form-select" ref={selectFieldRef}>
                    {columnData.map((item, index) => {
                        return <option key={`${item.data}`} value={`${item.data}`}>{item.title}</option>
                    })}
                </select>
            </div>

            <div className="col-md-6">
                <input
                    className="form-control"
                    placeholder="Nhập nội dung tìm kiếm"
                    ref={inputFilterRef}
                />
            </div>

            <div className="col-md-3">
                <button className="btn btn-success w-100" onClick={filter}>
                    Tìm kiếm
                </button>
            </div>
        </div>
    );
}
export default SearchComponent;