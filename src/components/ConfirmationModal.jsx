import React from 'react';
import { Button } from 'react-bootstrap';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="confirmModal-overlay" onClick={(e) => {
            e.stopPropagation();
        }}>
            <div className="confirmModal-content">
                <p>{message}</p>
                <div className="btnGroup">
                    <Button onClick={onConfirm} className='priColor'>Đồng ý</Button>
                    <Button onClick={onClose}>Hủy</Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
