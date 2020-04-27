import React, {useEffect} from 'react';
import close from '../../assets/icons/close.svg'

import './style.scss'

interface Props {
    onClose: () => void;
    title?: string;
    withoutContainer?: boolean;
}

const Modal: React.FC<Props> = ({onClose, children, title, withoutContainer}) => {
    const closeOnESC = (e: KeyboardEvent) => {
        if(e.code === 'Escape') {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', closeOnESC);
        return function cleanup() {
            document.removeEventListener('keydown', closeOnESC);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="modal">
                <button className="modal-close-button" onClick={onClose}>
                    <img src={close} alt="close"/>
                    ZAVRIEŤ
                </button>
                {withoutContainer ? children : <div className="content">
                    {title ? <h3>{title}</h3> : null}
                    {children}
                </div>}
            </div>
            <div className="overlay" onClick={onClose}/>
        </>
    );
};

export default Modal;
