import { FC, useEffect, useState } from 'react';
import { TCategoryType, TListType } from '../../types';
import './MovieList.scss';
import tmdbApi from '../../api/tmdbApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import apiConfig from '../../api/apiConfig';
import { TItemTV, TMovieItem } from '../../api/types';
import { useStores } from '../../root-store-context';
import { observer } from 'mobx-react';

type MovieListProps = {
    category: TCategoryType;
    listType: TListType;
};

const MovieList: FC<MovieListProps> = ({ category, listType }) => {
    const { moviesStore } = useStores();
    const { data } = moviesStore;

    useEffect(() => {
        const getList = async () => {
            let response;
            switch (category) {
                case 'movie':
                    // response = await tmdbApi.getMoviesList(movieType, {});
                    break;
                case 'tv':
                    // response = await tmdbApi.getTvList(tvType, {});
                    break;
            }
            if (response) {
                //setItems(response.results);
            }
        };
    }, []);

    return (
        <div className="movie-list">
            {data?.case({
                pending: () => (
                    <div className="loader">
                        <span className="loader__text">Загрузка...</span>
                    </div>
                ),
                rejected: () => <div>Error</div>,
                fulfilled: (list) => (
                    <>
                        <Swiper
                            // modules={[Autoplay]}
                            grabCursor={true}
                            spaceBetween={10}
                            slidesPerView={'auto'}
                            // autoplay={{ delay: 3000 }}
                        >
                            {list.results.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>
                ),
            })}
        </div>
    );
};

export default observer(MovieList);
