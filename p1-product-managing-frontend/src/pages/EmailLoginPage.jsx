import { emailApi } from "../api/emailApi";

const EmailLoginPage = () => {
    const loginGmail = () => {
        window.location.href =
            "http://localhost:5054/api/EmailByGmailAPI/login";
    };
    const getInbox = async () => {
        const mails = await emailApi.getInbox();
        console.log(mails);
    }
    return (
        <div>
            <button onClick={loginGmail}>
                Login Gmail
            </button>
        </div>
    );
};

export default EmailLoginPage;
