import { useEffect, useState } from "react";
import { emailApi } from "../api/emailApi";
import DisplayEmailComponent from "../components/DisplayEmailComponent";
import LoadingComponent from "../components/LoadingComponent";
import addNotification from "react-push-notification";
import { useNavigate } from "react-router-dom";

const POLLING_INTERVAL = 5000;

const EmailByGmailApiPage = () => {
    const [content, setContent] = useState([]);
    const [selectedMail, setSelectedMail] = useState(null);
    const [lastMailTime, setLastMailTime] = useState(null);
    const navigate = useNavigate();

    const handleNewMail = (sender, title) => {
        play();

        addNotification({
            title: `📧 Thư mới từ ${sender}`,
            subtitle: title,
            message: 'Bấm để xem chi tiết',
            theme: 'darkblue',
            native: true,
            onClick: () => window.focus(),
            duration: 5000,
        });
    };
    const fetchInbox = async () => {
        try {
            const data = await emailApi.getInbox();
            setContent(data);

            if (data.length > 0) {
                const newest = data[0];

                const newestTime = new Date(newest.time).getTime();

                if (lastMailTime && newestTime > lastMailTime) {
                    handleNewMail(
                        newest.from || "Người gửi",
                        newest.title || "Không có tiêu đề"
                    );
                }

                setLastMailTime(newestTime);
            }
        } catch (error) {
            console.error("Lỗi khi fetch inbox:", error);
        }
    };


    useEffect(() => {
        fetchInbox();

        const interval = setInterval(fetchInbox, POLLING_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    if (content.length === 0) return <LoadingComponent />;

    return (
        <div>
            <DisplayEmailComponent
                content={content}
                selectedMail={selectedMail}
                setSelectedMail={setSelectedMail}
            />
            <button onClick={() => navigate('/')} className="mt-4 btn-outline-success btn test">Trang chủ</button>
        </div>
    );
};

export default EmailByGmailApiPage;

// const connection = new signalR.HubConnectionBuilder()
//     .withUrl("https://unrigorously-uninvadable-shoshana.ngrok-free.dev/mailHub", {
//         transport: signalR.HttpTransportType.WebSockets
//     })
//     .withAutomaticReconnect()
//     .build();

// connection.start()
//     .then(() => console.log("SignalR connected!"))
//     .catch(err => console.error(err));

// connection.on("ReceiveMail", (mail) => {
//     fetchInbox();
//     handleNewMail(mail.Sender, mail.Subject);
// });

// return () => {
//     connection.stop();
// };