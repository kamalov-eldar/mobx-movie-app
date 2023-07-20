import React, { FC, useCallback, useEffect } from 'react';
import { useStores } from '../../root-store-context';
import './MovieSearch.scss';
import { observer } from 'mobx-react';

import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import { TCategoryType } from '../../api/types';

type MovieSearchProps = {
    category: TCategoryType | undefined;
};

const MovieSearch: FC<MovieSearchProps> = ({ category }) => {
    const { moviesStore } = useStores();
    const navigate = useNavigate();

    const { keyword, setKeyword, searchMovie } = moviesStore;

    const goToSearch = useCallback(() => {
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
