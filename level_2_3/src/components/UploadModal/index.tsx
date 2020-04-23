import React from 'react';
import Modal from "../Modal";
import add_photo from '../../assets/icons/add_photo.svg';

import './style.scss';
import AddButton from "../AddButton";

interface Props {
    onClose: () => void;
}

const UploadModal: React.FC<Props> = ({onClose}) => {
    return (
        <Modal title="PRIDAŤ FOTKY" onClose={onClose}>
            <div className="drag-n-drop">
                <img src={add_photo} alt="add photo"/>
                <p>SEM PRESUNTE FOTKY</p>
                <p>alebo</p>
                <button className="pick-files">Vyberte súbory</button>
            </div>
            <AddButton onClick={() => null}/>
        </Modal>
    );
};

export default UploadModal;
