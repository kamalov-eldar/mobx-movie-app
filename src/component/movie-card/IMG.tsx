import { FC, useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';

type IMGProps = {
    path: string;
    size: string;
};

export const IMG: FC<IMGProps> = ({ size, path }) => {
    const [url, setUrl] = useState('');
    useEffect(() => {
        fetch(`https://image.tmdb.org/t/p/${size}/${path}`)
            .then((response) => response.blob())
            .then((image) => {
                setUrl(URL.createObjectURL(image));
            });
    }, []);

    if (!url) {
        return (
            <Skeleton variant="rectangular" sx={{ bgcolor: 'grey.900', borderRadius: '30px', maxWidth: '100%' }}>
                <div style={{ paddingTop: '153%' }} />
            </Skeleton>
        );
    }

    return <img src={url} className="img-card" />;
};
