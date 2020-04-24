import React, {useCallback, useState} from 'react';
import Modal from "../Modal";
import add_photo from '../../assets/icons/add_photo.svg';

import './style.scss';
import AddButton from "../AddButton";
import {useDropzone} from "react-dropzone";

interface Props {
    onConfirm: (images: File[]) => void;
    onClose: () => void;
    loading: boolean
}

const UploadModal: React.FC<Props> = ({onClose, onConfirm, loading}) => {
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);

    // DnD
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setUploadedImages(prevImgs => [...prevImgs, ...acceptedFiles])
        }
    }, []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, disabled: loading});

    return (
        <Modal title="PRIDAŤ FOTKY" onClose={onClose}>
            <div className={`drag-n-drop ${isDragActive ? 'active' : ''}`} {...getRootProps()}>
                <img src={add_photo} alt="add"/>
                <p>SEM PRESUNTE FOTKY</p>
                {isDragActive ? null : (
                    <>
                        <p>alebo</p>
                        <button className="pick-files">Vyberte súbory</button>
                    </>
                )}
                <input type="file" multiple accept="image/*" {...getInputProps()}/>
            </div>
            <div className="image-row">
                {uploadedImages.map((imgSrc, i) => {
                    return <img key={`uploaded_img_${i}`} src={URL.createObjectURL(imgSrc)} alt=""/>
                })}
            </div>
            {loading ? 'Nahrávam...' : null}
            <AddButton onClick={() => onConfirm(uploadedImages)} disabled={loading}/>
        </Modal>
    );
};

export default UploadModal;
