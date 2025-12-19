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

export const uploadTemplate = async (file, setErrors) => {
    try {
        const res = await templateFileApi.UploadTemplate(file);

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

