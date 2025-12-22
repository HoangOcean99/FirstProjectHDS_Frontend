import Swal from "sweetalert2";

const baseConfig = {
    confirmButtonText: "OK",
    allowOutsideClick: false,
    allowEscapeKey: false,
    width: 700,
};

const fire = ({ icon, title, text, html, confirmButtonColor }) => {
    return Swal.fire({
        ...baseConfig,
        icon,
        title,
        text: html ? undefined : text,
        html: html
            ? `<div style="max-height:300px; overflow:auto; text-align:center;">
                    ${html}
               </div>`
            : undefined,
        confirmButtonColor,
    });
};

export const notifySuccess = ({ title = "Thành công", text, html, }) => fire({
    icon: "success",
    title,
    text,
    html,
    confirmButtonColor: "#198754",
}).then((result) => {
    return result;
});

export const notifyError = ({ title = "Thất bại", text, html, }) => fire({
    icon: "error",
    title,
    text,
    html,
    confirmButtonColor: "#dc3545",
}).then((result) => {
    return result;
});

export const notifyWarning = ({ title = "Cảnh báo", text, html, }) => fire({
    icon: "warning",
    title,
    text,
    html,
    confirmButtonColor: "#ffc107",
}).then((result) => {
    return result;
});

export const confirmDelete = ({ title, text }) => {
    return Swal.fire({
        icon: "warning",
        title,
        text,
        showCancelButton: true,
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#d33",
        allowOutsideClick: false,
        allowEscapeKey: false,
    });
};

