import React, {useState} from 'react';
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
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(index);
    if (images && images.length > 0) {
        const getPath = () => getImage(images[currentImageIndex].fullpath, 600);

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

        return (
            <Modal onClose={onClose} withoutContainer>
                <div className="gallery">
                    <div onClick={() => changeImage(false)}>
                        <img src={prevIcon} alt="prev icon"/>
                    </div>
                    <img className="image" src={getPath()} alt="current" onLoadStart={() => console.log('loading')}/>
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
