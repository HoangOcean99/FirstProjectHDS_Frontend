import { toast } from "react-toastify";
import templateFileApi from "../api/templateFileApi"
import { notifyError } from "./swalPopUp";

export const downloadTemplate = async (columns, name) => {
    try {
        const response = await templateFileApi.downloadTemplate(columns);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = `${name}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        toast.success("Tải file thành công!")
    } catch (error) {
        toast.error("Tải file thất bại!")
    }
}
export const uploadTemplate = async (file, setErrors, type) => {
    try {
        var res = null
        if (type === 'product')
            res = await templateFileApi.UploadTemplateProduct(file);
        else
            res = await templateFileApi.UploadTemplateSaleOut(file);


        toast.success(`Import thành công (${res.inserted} dòng)`);
        setErrors([]);
        return true;
    } catch (err) {
        if (err.response?.status === 400) {
            const errors = err.response.data.errors || [];
            setErrors(errors);
            await notifyError({
                title: 'Import thất bại',
                html: errors.map((item, _) => `${item}`).join("<br/>")
            })
        } else {
            await notifyError({
                title: 'Import thất bại',
                text: "Lỗi hệ thống khi import file" + err.response?.status, err
            })
        }
        return false;
    }
}
export const downloadReport = async (fromDate, toDate) => {
    try {
        const response = await templateFileApi.downloadReport(fromDate, toDate);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = `SaleOutReport${fromDate}-${toDate}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        toast.success("Export report thành công!")
    } catch (error) {
        toast.error("Export report thất bại!")
    }
}
export const downloadReportPdf = async (saleOutNo) => {
    try {
        const response = await templateFileApi.downloadReportPdf(saleOutNo);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = `Report-${saleOutNo}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        toast.success("Export report thành công!")
    } catch (error) {
        toast.error("Export report thất bại!")
        console.log('error', error)
    }
}

