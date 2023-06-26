import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import { Route, Routes } from 'react-router-dom';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="catalog/:category/:listType" element={<Catalog />}></Route>
            <Route path="/:category/:id" element={<Detail />} />
            <Route path="catalog/:category/search/:keyword" element={<Catalog />} />
            {/* <Route path="/:category" element={<Catalog />} /> */}

            <Route path="/" element={<Home />} />
        </Routes>
    );
};

export default AppRouter;
