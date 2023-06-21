import { FC } from 'react';

import './PageHeader.scss';

import bg from '../../assets/footer-bg.jpg';

type PageHeaderProps = {
    children: string;
};

const PageHeader: FC<PageHeaderProps> = ({ children }) => {
    return (
        <div className="page-header" style={{ backgroundImage: `url(${bg})` }}>
            <h2> {children}</h2>
        </div>
    );
};

export default PageHeader;
