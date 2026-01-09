import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const InputContentEmail = ({ sendEmail, email, setEmail, message, setMessage, title, setTitle }) => {
    const modules = {
        toolbar: [
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['clean']
        ],
    };

    return (
        <div className="container-fluid py-4 bg-light" style={{width: '70vw'}}>
            <div className="container-fluid">
                <div className="row g-4">
                    
                    {/* BÊN TRÁI: Ô SOẠN THẢO (EDITOR) */}
                    <div className="col-lg-5">
                        <div className="card shadow-sm border-0 p-4">
                            <h5 className="mb-4 text-primary fw-bold">📝 Soạn Thảo Email</h5>
                            
                            <div className="mb-3">
                                <label className="form-label fw-bold">Người nhận</label>
                                <input 
                                    type="email" className="form-control" 
                                    placeholder="example@gmail.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Tiêu đề</label>
                                <input 
                                    type="text" className="form-control" 
                                    placeholder="Nhập tiêu đề mail..."
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-bold">Nội dung </label>
                                <div style={{ height: '300px', marginBottom: '50px' }}>
                                    <ReactQuill 
                                        theme="snow" 
                                        value={message} 
                                        onChange={setMessage} 
                                        modules={modules}
                                        style={{ height: '100%' }}
                                    />
                                </div>
                            </div>

                            <button className="btn btn-success btn-lg w-100" onClick={sendEmail}>
                                Gửi Mail
                            </button>
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <div className="card shadow-sm border-0 p-4 h-100">
                            <h5 className="mb-4 text-secondary fw-bold">👁️ Xem trước & Mã HTML</h5>
                            
                            <label className="text-muted small fw-bold mb-2">GIAO DIỆN HIỂN THỊ:</label>
                            <div className="preview-window border rounded p-3 mb-4 bg-white h-100">
                                <h4 className="fw-bold text-start">{title || "Chưa có tiêu đề"}</h4>
                                <hr />
                                <div className='text-start' dangerouslySetInnerHTML={{ __html: message }} />
                            </div>

                            {/* <label className="text-muted small fw-bold">MÃ HTML (Dùng cho mail.Body):</label>
                            <div className="p-3 bg-dark text-warning rounded shadow-inner text-start" 
                                 style={{ fontSize: '12px', maxHeight: '500px', overflowY: 'auto', height: }}>
                                <pre style={{ whiteSpace: 'pre-wrap' }}>
                                    {`mail.Body = @"\n<html>\n  <body>\n    ${message}\n  </body>\n</html>";`}
                                    {`\nmail.IsBodyHtml = true;`}
                                </pre>
                            </div> */}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default InputContentEmail;