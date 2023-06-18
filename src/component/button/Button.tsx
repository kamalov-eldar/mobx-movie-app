import React, { FC } from 'react';

type ButtonPropsType = {
    onClick: () => void;
    className?: string;
    children?: string;
};

const Button: FC<ButtonPropsType> = ({ onClick, className, children }) => {
    return (
        <button className={`btn ${className}`} onClick={() => onClick()}>
            Button
            {children}
        </button>
    );
};

const OutlineButton: FC<ButtonPropsType> = ({
    onClick,
    className,
    children,
}) => {
    return (
        <button
            className={`btn-outline ${className}`}
            onClick={() => onClick()}
        >
            Button
            {children}
        </button>
    );
};

export default Button;
