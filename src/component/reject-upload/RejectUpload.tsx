import { FC, ReactNode } from 'react';

export interface WithChildren<T = ReactNode> {
    children: T;
}

const RejectUpload: FC<WithChildren> = ({ children }) => {
    return (
        <div className="loader">
            <span className="loader__text">Enable vpn in browser &nbsp;</span>
            {children}
        </div>
    );
};

export default RejectUpload;
