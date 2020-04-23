import React from 'react';
import './style.scss';

interface Props {
    children: JSX.Element[]
}

const Grid: React.FC<Props> = ({children}) => {
    return (
        <div className="grid">
            {children}
        </div>
    );
};

export default Grid;
