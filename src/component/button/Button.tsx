import React, { FC } from 'react';
import './Button.scss';

type ButtonPropsType = {
    onClick: () => void;
    className?: string;
    children?: string;
};

const Button: FC<ButtonPropsType> = ({ onClick, className, children }) => {
    return (
        <button className={`btn ${className}`} onClick={() => onClick()}>
            {children}
        </button>
    );
};

export const OutlineButton: FC<ButtonPropsType> = ({
    onClick,
    className,
    children,
}) => {
    return (
        <button
            className={`btn btn-outline ${className}`}
            onClick={() => onClick()}
        >
            {children}
        </button>
    );
};

export default Button;
