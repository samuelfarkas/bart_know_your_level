import React, {useState} from 'react';
import errorImage from '../../assets/icons/missing.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './style.scss';

interface Props {
    image: string;
    name: string;
    withoutDesc?: boolean
}

const Card: React.FC<Props> = ({name, ...props}) => {
    const [image, setImage] = useState(props.image);

    const handleErrorImage = () => {
        setImage(errorImage);
    };

    return (
        <div className={`card ${props.withoutDesc ? 'without-desc' : ''}`}>
            <LazyLoadImage src={image}
                           alt={name}
                           effect="blur"
                           onError={handleErrorImage}
                           style={image === errorImage ? {objectFit: 'contain'} : undefined}/>
                {props.withoutDesc ? null : <div className="text">
                    <p>{name}</p>
                    <p className="subtext">6 fotiek</p>
                </div>}
        </div>
    );
};

export default Card;
