import React, { FC, ReactNode } from 'react';
import './Button.scss';

type ButtonPropsType = {
    onClick?: () => void;
    className?: string;
    children?: ReactNode | string;
};

const Button: FC<ButtonPropsType> = ({ className, children }) => {
    return <button className={`btn ${className}`}>{children}</button>;
};

export const OutlineButton: FC<ButtonPropsType> = ({ className, children }) => {
    return <button className={`btn btn-outline ${className}`}>{children}</button>;
};

export default Button;
