import { useHistory } from 'react-router-dom';
import apiConfig from '../../../api/apiConfig';
import tmdbApi, { TResponseMovie } from '../../../api/tmdbApi';
import { FC } from 'react';
import Button from '../../button/Button';
import OutlineButton from '../../button/Button';

type HeroSlideItemProps = {
    item: TResponseMovie;
    className: string;
};

const HeroSlideItem: FC<HeroSlideItemProps> = ({ item, className }) => {
    let hisrory = useHistory();

    // const item = props.item;

    const background = apiConfig.originalImage(
        item.backdrop_path ? item.backdrop_path : item.poster_path,
    );

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        const videos = await tmdbApi.getVideos('movie', item.id);

        /* if (videos.results.length > 0) {
            const videSrc =
                'https://www.youtube.com/embed/' + videos.results[0].key;
            modal
                .querySelector('.modal__content > iframe')
                .setAttribute('src', videSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer';
        }

        modal.classList.toggle('active'); */
    };

    return (
        <div
            className={`hero-slide__item ${className}`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    {/* <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button
                            onClick={() => hisrory.push('/movie/' + item.id)}
                        >
                            Watch now
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch trailer
                        </OutlineButton>
                    </div> */}
                </div>
                {/* <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div> */}
            </div>
        </div>
    );
};

export default HeroSlideItem;
