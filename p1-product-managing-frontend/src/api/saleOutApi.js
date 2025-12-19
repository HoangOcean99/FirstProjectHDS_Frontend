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
}
export default saleOutApi;