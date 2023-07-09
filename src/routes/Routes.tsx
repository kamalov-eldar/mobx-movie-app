import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import { Navigate, Route, Routes } from 'react-router-dom';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="catalog/:category/:listType" element={<Catalog />}></Route>
            <Route path="/:category/search/:keyword" element={<Catalog />} />
            <Route path="/:category/:id" element={<Detail />} />
        </Routes>
    );
};

export default AppRouter;
