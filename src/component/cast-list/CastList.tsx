import React, { FC, useEffect } from 'react';
import './CastList.scss';
import { useParams } from 'react-router-dom';
import { TCategoryItem, TCategoryType } from '../../types';
import apiConfig from '../../api/apiConfig';
import { useStores } from '../../root-store-context';
import { observer } from 'mobx-react';

type CastListProps = {
    id: number;
    category: TCategoryType;
};

const CastList: FC<CastListProps> = ({ id, category }) => {
    const { moviesStore, tvStore } = useStores();
    const { getCasts, resetCasts, casts } = moviesStore;

    useEffect(() => {
        getCasts(category, id);
        return () => {
            resetCasts();
        };
    }, [category, id]);

    return (
        <div className="casts">
            {casts.map((item, i) => (
                <div key={i} className="casts__item">
                    <div
                        className="casts__item__img"
                        style={{ backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})` }}
                    ></div>
                    <p className="casts__item__name">{item.name}</p>
                </div>
            ))}
        </div>
    );
};

export default observer(CastList);
