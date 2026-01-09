import { useEffect, useRef, useState } from "react";
import InputContentEmail from "../components/InputContentEmail";
import DisplayEmailComponent from "../components/DisplayEmailComponent";
import { toast } from "react-toastify";
import { emailApi } from "../api/emailApi";
import * as signalR from "@microsoft/signalr";
import addNotification from "react-push-notification";
import useSound from "use-sound";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";
const ringtone = "https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3";

function EmailPage() {
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [content, setContent] = useState([]);
    const [isOpenCompose, setIsOpenCompose] = useState(false);
    const [selectedMail, setSelectedMail] = useState(null);
    const navigate = useNavigate();

    const sendEmail = async () => {
        try {
            await emailApi.sendEmail(
                email,
                title,
                `<html><body>${message}</body></html>`,
            );
            getEmail();
            toast.success('Send Email successfully!!!')
            setIsOpenCompose(false);
        } catch {
            toast.error("Send email failed!!!");
        }
    };

    const getEmail = async () => {
        const res = await emailApi.getEmail();
        setContent(res);
    };

    const [play] = useSound(ringtone);

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

    useEffect(() => {
        getEmail();

        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5054/mailHub")
            .withAutomaticReconnect()
            .build();


        connection.start()
            .then(() => console.log("SignalR connected!!!"))
            .catch(err => console.error(err));

        connection.on("NewMailArrived", () => {
            getEmail();
            handleNewMail(email, title)
        });

        return () => {
            connection.stop();
        };
    }, []);

    if (content.length === 0) return <LoadingComponent />;

    return (
        <>
            <div className="container-fluid mt-3" style={{ width: '90%' }}>
                {!isOpenCompose &&
                    <DisplayEmailComponent
                        content={content}
                        selectedMail={selectedMail}
                        setSelectedMail={setSelectedMail}
                    />
                }
                {isOpenCompose && (
                    // <div className="compose-popup border">
                    <InputContentEmail
                        sendEmail={sendEmail}
                        setTitle={setTitle}
                        setMessage={setMessage}
                        setEmail={setEmail}
                        email={email}
                        title={title}
                        message={message}
                    />
                    // </div>
                )}
                <button
                    className="fab-compose btn-success"
                    onClick={() => setIsOpenCompose(!isOpenCompose)}
                    title="Soạn thư mới"
                >
                    {!isOpenCompose ?
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                        :
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>}
                </button>
                <button className="btn btn-outline-success mt-4" onClick={() => navigate('/')}>Trang chu</button>

            </div>
        </>
    );
}

export default EmailPage;
