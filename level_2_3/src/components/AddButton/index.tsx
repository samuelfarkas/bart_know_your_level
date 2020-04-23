import React from 'react';
import icon from '../../assets/icons/add_white.svg';
import './style.scss';

interface Props {
    onClick: () => void;
    disabled?: boolean
}

const AddButton: React.FC<Props> = ({onClick, disabled}) =>
    <button disabled={disabled} className="add-button" onClick={onClick}><img src={icon} alt="add"/>PRIDAŤ</button>;

export default AddButton;
