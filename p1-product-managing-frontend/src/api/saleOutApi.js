import axiosClient from "./axiosClient";

const saleOutApi = {
    /**
     * @returns {Promise<any>}
     */
    getAll() {
        const url = 'SaleOut';
        return axiosClient.get(url);
    },
}
export default saleOutApi;