import axiosClient from "./axiosClient";

const templateFileApi = {
    /**
     * @returns {Promise<any>}
     */
    downloadTemplate(columns) {
        const url = 'TemplateFile/download-template';
        return axiosClient.post(url, columns, { responseType: 'blob' });
    },
    UploadTemplate(file) {
        const formData = new FormData();
        formData.append('file', file);
        const url = 'TemplateFile/upload-template';
        return axiosClient.post(url, formData, {
            headers: {
                "Content-Type": undefined
            }
        })
    }
}
export default templateFileApi;