import React, { FC, ReactNode } from 'react';
import './Button.scss';

type ButtonPropsType = {
    onClick?: () => void;
    className?: string;
    children?: ReactNode | string;
};


const Button: FC<ButtonPropsType> = ({ className, children, onClick }) => {
    return (
        <button onClick={onClick} className={`btn ${className}`}>
            {children}
        </button>
    );
};

export const OutlineButton: FC<ButtonPropsType> = ({ className, children, onClick }) => {
    return (
        <button onClick={onClick} className={`btn btn-outline ${className}`}>
            {children}
        </button>
    );
};

export default Button;
