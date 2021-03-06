import React, {useEffect, useState} from 'react';
import prevIcon from '../../assets/icons/prev_icon.svg';
import nextIcon from '../../assets/icons/next_icon.svg';

import Modal from "../Modal";

import './style.scss';
import {getImage, Image} from "../../config/http";

interface Props {
    images: Image[];
    index: number;
    onClose: () => void;
}

const Gallery: React.FC<Props> = ({images, index, onClose}) => {
    const navigateOnArrows = (e: KeyboardEvent) => {
        if(images && images.length > 0) {
            if(e.code === 'ArrowLeft') {
                changeImage(false);
            } else if (e.code === 'ArrowRight') {
                changeImage();
            }
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', navigateOnArrows);
        return function cleanup() {
            document.removeEventListener('keydown', navigateOnArrows);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const [currentImageIndex, setCurrentImageIndex] = useState<number>(index);

    const changeImage = (next = true) => {
        setCurrentImageIndex(prevIndex => {
            const length = images.length;
            if(next) {
                return prevIndex + 1 > length - 1 ? 0 : prevIndex + 1;
            } else {
                return prevIndex - 1 < 0 ? length - 1 : prevIndex - 1;
            }
        });
    };
    if (images && images.length > 0) {
        const getPath = () => getImage(images[currentImageIndex].fullpath, 1000);

        return (
            <Modal onClose={onClose} withoutContainer>
                <div className="gallery">
                    <div onClick={() => changeImage(false)}>
                        <img src={prevIcon} alt="prev icon"/>
                    </div>
                    <img className="image" src={getPath()} alt="current"/>
                    <div onClick={() => changeImage()}>
                        <img src={nextIcon} alt="next_icon"/>
                    </div>
                </div>
                <div className="phone-arrows">
                    <div onClick={() => changeImage(false)}>
                        <img src={prevIcon} alt="prev icon"/>
                    </div>
                    <div onClick={() => changeImage()}>
                        <img src={nextIcon} alt="next_icon"/>
                    </div>
                </div>
            </Modal>
        );
    } else {
        return null;
    }
};

export default Gallery;
