import React from 'react';
import add_photo from '../../assets/icons/add_photo.svg'
import plus_icon from '../../assets/icons/plus.svg'

import './style.scss';

const AddCard: React.FC<{onClick: () => void; photo?: boolean}> = ({photo, onClick}) => {
    return (
        <div className="add-card" onClick={onClick}>
            <img src={photo ? add_photo : plus_icon} alt="add"/>
            <p>{photo ? 'Pridať fotky' : 'Pridať kategóriu'}</p>
        </div>
    );
};

export default AddCard;
