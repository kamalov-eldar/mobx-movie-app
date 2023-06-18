import React, { FC, useEffect, useState } from 'react';

import tmdbApi, { TResponseMovie } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import HeroSlideItem from './Hero-slide-Item/HeroSlideItem';

const HeroSlide: FC = () => {
    console.log('HeroSlide: ');
    const [movieItems, setMovieItems] = useState<TResponseMovie[]>([]);
    console.log('movieItems: ', movieItems);
    SwiperCore.use([Autoplay]);
    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 };
            try {
                const response = await tmdbApi.getMoviesList('popular', {
                    params,
                });
                // console.log('response: ', response.results);

                setMovieItems(response.results);
            } catch (error) {}
        };
        getMovies();
    }, []);

    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                // autoplay={{delay: 3000}}
            >
                {movieItems.map((item, i) => (
                    <SwiperSlide key={i}>
                        {({ isActive }) => (
                            <HeroSlideItem
                                item={item}
                                className={`${isActive}` ? 'active' : ''}
                            />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* {movieItems.map((item, i) => (
                <TrailerModal key={i} item={item} />
            ))} */}
        </div>
    );
};

export default HeroSlide;
