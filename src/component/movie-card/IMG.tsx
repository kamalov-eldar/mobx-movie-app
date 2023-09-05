import { FC, useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { observer } from 'mobx-react';

type IMGProps = {
    path: string;
    size: string;
};

export const IMG: FC<IMGProps> = observer(function IMG({ size, path }) {
    const [url, setUrl] = useState('');
    useEffect(() => {
        fetch(`https://image.tmdb.org/t/p/w220_and_h330_face/${path}`)
            .then((response) => response.blob())
            .then((image) => {
                if (!path) {
                    setUrl('');
                } else {
                    setUrl(URL.createObjectURL(image));
                }
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
});
