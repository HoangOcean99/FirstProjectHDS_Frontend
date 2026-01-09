import React from 'react';
import './DisplayEmailComponent.css';

const DisplayEmailComponent = ({ setSelectedMail, selectedMail, content }) => {
    return (
        <div className="container-fluid mt-3">
            <div className="email-app-container border rounded shadow-sm">
                {/* CỘT DANH SÁCH (30%) */}
                <div className="email-side-panel">
                    <div className="fixed-inner">
                        <div className="p-3 border-bottom bg-white fw-bold">
                            Hộp thư đến ({content?.length || 0})
                        </div>
                        <div className="scroll-area">
                            {content?.map((mail, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedMail(mail)}
                                    className={`p-3 border-bottom ${selectedMail === mail ? 'bg-primary bg-opacity-10 border-start border-primary border-4' : 'bg-transparent'}`}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="d-flex align-items-center text-start gap-2">
                                        {mail.isUnread && mail.isNew && (
                                            <span
                                                style={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: '50%',
                                                    backgroundColor: '#1a73e8'
                                                }}
                                            />
                                        )}

                                        <span
                                            className={`text-truncate ${mail.isUnread ? 'fw-bold' : ''}`}
                                            style={{ flex: 1 }}
                                        >
                                            {mail.email || "Người gửi"}
                                        </span>

                                        {/* Thời gian */}
                                        <small className={`${mail.isUnread ? 'fw-bold' : 'text-muted'}`}>
                                            {mail.time}
                                        </small>
                                    </div>

                                    <div className={`${mail.isUnread ? 'fw-bold' : 'text-muted'} small strict-truncate text-start`}>
                                        {mail.title || "(Không có tiêu đề)"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CỘT NỘI DUNG (70%) */}
                <div className="email-main-panel">
                    <div className="fixed-inner">
                        {selectedMail ? (
                            <>
                                <div className="p-4 border-bottom bg-white">
                                    <h3 className="fw-bold text-dark mb-4 text-start">{selectedMail.title}</h3>
                                    <div className="d-flex align-items-center">
                                        <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3"
                                            style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                                            {selectedMail.email?.[0]?.toUpperCase()}
                                        </div>
                                        <div className="fw-bold">{selectedMail.email}</div>
                                    </div>
                                </div>
                                <div className="scroll-area p-4">
                                    <div className="mail-body-content text-start"
                                        dangerouslySetInnerHTML={{ __html: selectedMail.content }}>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="h-100 d-flex align-items-center justify-content-center text-muted">
                                Chọn một email để xem nội dung
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default DisplayEmailComponent;