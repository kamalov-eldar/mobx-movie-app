import './App.scss';
import 'swiper/swiper.min.css';

import './assets/boxicons-2.0.7/css/boxicons.min.css';

import Footer from './component/footer/Footer';
import Header from './component/header/Header';
import { BrowserRouter, Route } from 'react-router-dom';
import AppRouter from './routes/Routes';

function App() {
    return (
        <>
            <Header />
            <AppRouter />
            <Footer />
        </>
    );
}

export default App;
