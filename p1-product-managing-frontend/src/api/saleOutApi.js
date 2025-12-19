import axiosClient from "./axiosClient";

const saleOutApi = {
    /**
     * @returns {Promise<any>}
     */
    getAll() {
        const url = 'SaleOut';
        return axiosClient.get(url);
    },
    insertSaleOut(saleOut) {
        const url = 'SaleOut';
        return axiosClient.post(url, saleOut);
    },
    deleteSaleOut(id) {
        const url = `SaleOut/${id}`;
        return axiosClient.delete(url);
    }
}
export default saleOutApi;