import React, { FC, useEffect } from 'react';
import Video from './video/Video';
import './VideoList.scss';
import { useStores } from '../../root-store-context';
import { TCategoryType } from '../../api/types';
import { observer } from 'mobx-react';

type VideoListProps = {
    id: number;
    category: TCategoryType;
};

const VideoList: FC<VideoListProps> = ({ category, id }) => {
    const { moviesStore, tvStore } = useStores();
    const { getVideos, resetCasts, videos } = moviesStore;

    useEffect(() => {
        getVideos(category, id);
        return () => {
            // getVideos();
        };
    }, [category, id]);

    return (
        <>
            {videos.map((item, i) => (
                <Video key={i} item={item} />
            ))}
        </>
    );
};

export default observer(VideoList);
