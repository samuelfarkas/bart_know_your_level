import React, {useState} from 'react';
import Modal from "../Modal";
import AddButton from "../AddButton";

import './style.scss';

interface Props {
    onClose: () => void,
    createCategory: (name: string) => void;
    disabled?: boolean
}

const AddCategoryModal: React.FC<Props> = ({onClose, createCategory, disabled}) => {
    const [value, setValue] = useState<string>('');

    return (
        <Modal onClose={onClose} title="Pridat kategóriu">
            <div className="add-category">
                <input type="text" placeholder="ZADAJTE NÁZOV KATEGÓRIE" onChange={({target}) => setValue(target.value)}/>
                <AddButton onClick={() => createCategory(value)} disabled={disabled}/>
            </div>
        </Modal>
    );
};

export default AddCategoryModal;
