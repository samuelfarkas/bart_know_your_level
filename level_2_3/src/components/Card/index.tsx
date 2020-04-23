import React, {useState} from 'react';
import errorImage from '../../assets/icons/missing.svg';
import './style.scss';

interface Props {
    image: any;
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
            <img src={image} alt={name} onError={handleErrorImage} style={image === errorImage ? {objectFit: 'contain'} : undefined}/>
                {props.withoutDesc ? null : <div className="text">
                    <p>{name}</p>
                    <p className="subtext">6 fotiek</p>
                </div>}
        </div>
    );
};

export default Card;
