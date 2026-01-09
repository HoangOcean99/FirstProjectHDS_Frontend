import axiosClient from "./axiosClient";

export const emailApi = {

    sendEmail(email, title, content) {
        const url = `Email/send`;
        return axiosClient.post(url,
            {
                email,
                title,
                content
            });
    },
    getEmail() {
        const url = 'Email/get';
        return axiosClient.get(url);
    },
    getLoginUrl() {
        return axiosClient.get('/EmailByGmailAPI/login')
    },
    getInbox() {
        return axiosClient.get('/EmailByGmailAPI/inbox')
    }
}
