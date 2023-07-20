import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';

export const IMG = ({ path }: any) => {
    const [url, setUrl] = useState('');
    useEffect(() => {
        fetch(`https://image.tmdb.org/t/p/w185/${path}`)
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

    return <img src={url} className="img-card" style={{ width: '100%', height: '100%' }} />;
};
