import React, { FC, useCallback } from 'react';
import { useStores } from '../../root-store-context';
import './MovieSearch.scss';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { TCategoryType } from '../../types';
import Button from '../button/Button';

type MovieSearchProps = {
    category: TCategoryType | undefined;
};

const MovieSearch: FC<MovieSearchProps> = ({ category }) => {
    const { moviesStore, tvStore } = useStores();
    const navigate = useNavigate();

    const { keyword, setKeyword, searchMovie } = moviesStore;

    const { popularTVList: popularTVListLoadMore, totalPagesTVList } = tvStore;

    const goToSearch = useCallback(() => {
        console.log('keyword: ', keyword);

        if (keyword.trim().length > 0) {
            navigate(`/${category}/search/${keyword}`);
            const params = {
                page: 1,
                query: keyword,
            };
            if (category) searchMovie(category, { params });
        }
    }, [keyword, category, history]);

    return (
        <div className="movie-search">
            <input type="text" placeholder="Enter keyword" value={keyword} onChange={(evt) => setKeyword(evt.target.value)} />
            <Button className="small" onClick={goToSearch}>
                Search
            </Button>
        </div>
    );
};

export default observer(MovieSearch);
