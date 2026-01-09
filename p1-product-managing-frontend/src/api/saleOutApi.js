import axiosClient from "./axiosClient";

const saleOutApi = {

    getAll() {
        const url = 'SaleOut';
        return axiosClient.get(url);
    },
    GetPagedAsync(pageIndex, pageSize) {
        return axiosClient.get('SaleOut/get-paged', {
            params: { pageIndex, pageSize }
        });
    },
    insertSaleOut(saleOut) {
        const url = 'SaleOut';
        return axiosClient.post(url, saleOut);
    },
    deleteSaleOut(id) {
        const url = `SaleOut/${id}`;
        return axiosClient.delete(url);
    },
    editSaleOut(saleOut) {
        const url = 'SaleOut';
        return axiosClient.put(url, saleOut);
    },
    getAllSaleOutNo() {
        const url = 'SaleOut/GetAllSaleOutNo';
        return axiosClient.get(url);
    },
}
export default saleOutApi;