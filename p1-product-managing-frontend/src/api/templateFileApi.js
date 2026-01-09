import axiosClient from "./axiosClient";

const templateFileApi = {

    downloadTemplate(columns) {
        const url = 'TemplateFile/download-template';
        return axiosClient.post(url, columns, { responseType: 'blob' });
    },
    downloadReport(startDate, toDate) {
        const url = 'TemplateFile/download-report';
        return axiosClient.post(url, { startDate, toDate }, { responseType: 'blob' });
    },
    downloadReportPdf(saleOutNo) {
        const url = 'ReportPdf/download-report-pdf';
        return axiosClient.post(url, saleOutNo, { responseType: 'blob' });
    },
    UploadTemplateProduct(file) {
        const formData = new FormData();
        formData.append('file', file);
        const url = 'TemplateFile/upload-templateProduct';
        return axiosClient.post(url, formData, {
            headers: {
                "Content-Type": undefined
            }
        })
    },
    UploadTemplateSaleOut(file) {
        const formData = new FormData();
        formData.append('file', file);
        const url = 'TemplateFile/upload-templateSaleOut';
        return axiosClient.post(url, formData, {
            headers: {
                "Content-Type": undefined
            }
        })
    }
}
export default templateFileApi;