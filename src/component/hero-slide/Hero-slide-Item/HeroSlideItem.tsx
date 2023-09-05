import { useNavigate } from 'react-router-dom';
import apiConfig from '../../../api/apiConfig';
import tmdbApi from '../../../api/tmdbApi';
import { FC } from 'react';
import Button, { OutlineButton } from '../../button/Button';
import '../Hero-Slide.scss';
import { TMovieItem } from '../../../api/types';
import { IMG } from '../../movie-card/IMG';
import { observer } from 'mobx-react';

type HeroSlideItemProps = {
    item: TMovieItem;
    className: string;
};

const HeroSlideItem: FC<HeroSlideItemProps> = observer(function HeroSlideItem({ item, className }) {
    let navigate = useNavigate();

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);
    const poster = apiConfig.originalImage(item.poster_path);
    // 	https://image.tmdb.org/t/p/original/upXYRYVA4Jij3whT5ilP4fTuVw0.jpg
    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);
        console.log('modal: ', modal);
        const modalContent = modal?.querySelector('.modal__content');

        const videos = await tmdbApi.getVideos('movie', item.id);

        if (videos.results.length > 0) {
            const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;

            modal?.querySelector('.modal__content > iframe')?.setAttribute('src', videSrc);
        } else {
            if (modalContent) {
                modalContent.innerHTML = 'No trailer';
            }
        }
        modal?.classList.toggle('active');
    };

    return (
        <div className={`hero-slide__item ${className}`} style={{ backgroundImage: `url(${background})` }}>
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => navigate('/movie/' + item.id)}>Watch now</Button>
                        <OutlineButton onClick={setModalActive}>Watch trailer</OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <IMG path={item.poster_path || item.backdrop_path} size={'w500'} />
                </div>
            </div>
        </div>
    );
});

export default HeroSlideItem;
