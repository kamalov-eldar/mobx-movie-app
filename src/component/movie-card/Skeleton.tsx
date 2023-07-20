import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import { JSX } from 'react/jsx-runtime';

/* const Skeleton = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => (
    <ContentLoader
        speed={2}
        width={'100%'} //240
        height={'100%'} //440
        // viewBox="0 0 100% 100%"
        backgroundColor="#323232"
        foregroundColor="#4d4d4d"
        {...props}
    >
        <rect x="0" y="0" rx="30" ry="30" width={'100%'}  height={'100%'}  />
    </ContentLoader>
);

export default Skeleton; */

const Skeleton = ({ ...rest }) => (
    <ContentLoader height={'100%'} width={'100%'} viewBox="0 0 100% 100%" {...rest}>
        {/* <rect x="15" y="15" rx="4" ry="4" width="350" height="25" />
        <rect x="15" y="50" rx="2" ry="2" width="350" height="150" />
        <rect x="15" y="230" rx="2" ry="2" width="170" height="20" />
        <rect x="60" y="230" rx="2" ry="2" width="170" height="20" /> */}
        <rect x="0" y="0" rx="30" ry="30" width={'100%'} height={'100%'} />
    </ContentLoader>
);

/* Skeleton.metadata = {
    name: 'Didier Munezero',
    github: 'didiermunezero',
    description: 'Grid for content of head and body',
    filename: 'HeadBodyGrid',
}; */

export default Skeleton;
