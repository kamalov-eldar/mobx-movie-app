import { FC } from 'react';

import './PageHeader.scss';

import bg from '../../assets/footer-bg.jpg';

type PageHeaderProps = {
    title: string | undefined;
};

const PageHeader: FC<PageHeaderProps> = ({ title }) => {
    return (
        <div className="page-header" style={{ backgroundImage: `url(${bg})` }}>
            <h2>{title}</h2>
        </div>
    );
};

export default PageHeader;
