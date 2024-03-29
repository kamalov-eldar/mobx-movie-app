import React, { FC, useEffect, useRef } from 'react';
import { TVideo } from '../../../api/types';
import { observer } from 'mobx-react';

type VideoProps = {
    item: TVideo;
};

const Video: FC<VideoProps> = observer(function Video({ item }) {
    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    useEffect(() => {
        if (iframeRef) {
            const height = (iframeRef!.current!.offsetWidth * 9) / 16 + 'px';
            iframeRef!.current!.setAttribute('height', height);
        }
    }, [iframeRef]);

    return (
        <div className="video">
            <div className="video__title">
                <h2>{item.name}</h2>
            </div>
            <iframe src={`https://www.youtube.com/embed/${item.key}`} ref={iframeRef} width="100%" title="video"></iframe>
        </div>
    );
});

export default Video;
