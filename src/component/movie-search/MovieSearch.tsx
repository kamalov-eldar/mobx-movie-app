import React, { FC, useCallback } from 'react';
import { useStores } from '../../root-store-context';
import './MovieSearch.scss';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { TCategoryType } from '../../types';
import Button from '../button/Button';

type MovieSearchProps = {
    category: TCategoryType;
};

const MovieSearch: FC<MovieSearchProps> = ({ category }) => {
    const { moviesStore, tvStore } = useStores();
    const history = useHistory();

    const { keyword, setKeyword, searchMovie } = moviesStore;

    const { popularTVListLoadMore, totalPagesTVList, getPopularTVListLoadMore } = tvStore;

    const goToSearch = useCallback(() => {
        console.log('keyword: ', keyword);

        if (keyword.trim().length > 0) {
            history.push(`/${category}/search/${keyword}`);
            const params = {
                page: 1,
                query: keyword,
            };
            searchMovie(category, { params });
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
