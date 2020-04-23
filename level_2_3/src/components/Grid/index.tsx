import React from 'react';
import './style.scss';

const Grid: React.FC = ({children}) => {
    return (
        <div className="grid">
            {children}
        </div>
    );
};

export default Grid;
