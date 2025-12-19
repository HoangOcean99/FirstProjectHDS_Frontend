import axiosClient from "./axiosClient";

const masterProductApi = {
    /**
     * @returns {Promise<any>}
     */
    getAll() {
        const url = 'MasterProduct';
        return axiosClient.get(url);
    },
    insertProduct(masterproduct) {
        const url = 'MasterProduct';
        return axiosClient.post(url, masterproduct);
    },
    deleteProduct(id) {
        const url = `MasterProduct/${id}`;
        return axiosClient.delete(url);
    },
    editProduct(masterProduct) {
        const url = 'MasterProduct';
        return axiosClient.put(url, masterProduct);
    }
}
export default masterProductApi;