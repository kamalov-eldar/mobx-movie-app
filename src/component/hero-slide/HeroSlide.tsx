import React, { FC, useEffect, useState } from 'react';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import HeroSlideItem from './Hero-slide-Item/HeroSlideItem';

import TrailerModal from './Hero-slide-Item/TrailerModal';
import { useStores } from '../../root-store-context';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

const HeroSlide: FC = () => {
    const { moviesStore } = useStores();
    const { dataPopularMovieList, popularMovieList, clearMovieList } = moviesStore;

    SwiperCore.use([Autoplay]);

    useEffect(() => {
        return () => {
            clearMovieList();
        };
    }, []);

    {
        !dataPopularMovieList && (
            <div className="loader">
                <span className="loader__text"> No Data</span>
            </div>
        );
    }

    return (
        <div className="hero-slide">
            {dataPopularMovieList?.case({
                pending: () => (
                    <div className="loader">
                        <span className="loader__text">Загрузка...</span>
                    </div>
                ),

                rejected: () => (
                    <div className="loader">
                        <span className="loader__text">Rejected upload - Enable vpn in browser &nbsp;</span>
                    </div>
                ),
                fulfilled: (movieList) => {
                    //console.log('fulfilled: ');
                    //console.log('popularMovieList: ', toJS(popularMovieList));

                    return (
                        <>
                            <Swiper
                                // modules={[Autoplay]}
                                grabCursor={true}
                                spaceBetween={0}
                                slidesPerView={1}
                                autoplay={{ delay: 3000 }}
                            >
                                {popularMovieList.map((item, i) => (
                                    <SwiperSlide key={i}>
                                        {({ isActive }) => (
                                            <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                                        )}
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            {popularMovieList.map((item, i) => (
                                <TrailerModal key={i} item={item} />
                            ))}
                        </>
                    );
                },
            })}
        </div>
    );
};

export default observer(HeroSlide);
