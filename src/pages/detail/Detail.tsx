import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TCategoryType } from '../../api/types';

import './Detail.scss';
import { useStores } from '../../root-store-context';
import apiConfig from '../../api/apiConfig';
import { observer } from 'mobx-react';
import { TMovieDetail } from '../../api/types';
import CastList from '../../component/cast-list/CastList';
import VideoList from '../../component/video-list/VideoList';
import MovieList from '../../component/movie-list/MovieList';

const Detail = () => {
    const { category, id } = useParams<{ category?: TCategoryType; id?: string }>();

    const { moviesStore, tvStore } = useStores();
    const { getMovieDetails, dataMovieDetail, movieDetail, resetMovieDetails } = moviesStore;
    // const { popularTVListLoadMore, totalPagesTVList, getPopularTVListLoadMore } = tvStore;

    useEffect(() => {
        if (category && id) {
            getMovieDetails(category, Number(id), { params: {  } });
        }
        return () => {
            resetMovieDetails();
        };
    }, [category, id]);

    if (!dataMovieDetail) {
        return <div className="loader">No Data</div>;
    }

    return (
        <>
            {dataMovieDetail?.case({
                pending: () => (
                    <div className="loader">
                        <span className="loader__text">Загрузка...</span>
                    </div>
                ),
                rejected: () => <div className="loader">Error</div>,
                fulfilled: () => {
                    return (
                        <>
                            {movieDetail && (
                                <>
                                    <div
                                        className="banner"
                                        style={{
                                            backgroundImage: `url(${apiConfig.originalImage(
                                                movieDetail.backdrop_path || movieDetail.poster_path,
                                            )})`,
                                        }}
                                    ></div>
                                    <div className="mb-3 movie-content container">
                                        <div className="movie-content__poster">
                                            <div
                                                className="movie-content__poster__img"
                                                style={{
                                                    backgroundImage: `url(${apiConfig.originalImage(
                                                        movieDetail.poster_path || movieDetail.backdrop_path,
                                                    )})`,
                                                }}
                                            ></div>
                                        </div>
                                        <div className="movie-content__info">
                                            <h1 className="title">{movieDetail.title /* || movieDetail.name */}</h1>
                                            <div className="genres">
                                                {movieDetail.genres &&
                                                    movieDetail.genres.slice(0, 5).map((genre, i) => (
                                                        <span key={i} className="genres__item">
                                                            {genre.name}
                                                        </span>
                                                    ))}
                                            </div>
                                            <p className="overview">{movieDetail.overview}</p>
                                            <div className="cast">
                                                <div className="section__header">
                                                    <h2>Casts</h2>
                                                </div>
                                                <CastList id={movieDetail.id} category={category!} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container">
                                        <div className="section mb-3">
                                            <VideoList id={movieDetail.id} category={category!} />
                                        </div>
                                        <div className="section mb-3">
                                            <div className="section__header mb-2">
                                                <h2>Similar</h2>
                                            </div>
                                            <MovieList category={category!} listType="similar" id={movieDetail.id} />
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    );
                },
            })}
        </>
    );
};

export default observer(Detail);
