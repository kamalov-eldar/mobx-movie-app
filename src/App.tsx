import './App.scss';
import 'swiper/swiper.min.css';

import './assets/boxicons-2.0.7/css/boxicons.min.css';

import Footer from './component/footer/Footer';
import Header from './component/header/Header';
import { BrowserRouter, Route } from 'react-router-dom';
import Routes from './routes/Routes';

function App() {
    console.log('App: ');

    return (
        <BrowserRouter>
            <Route
                render={(props) => (
                    <>
                        <Header />
                        <Routes />
                        <Footer />
                    </>
                )}
            />
            {/* <div className="App">
                <header className="App-header">
                    <p>Movie Application</p>
                </header>
                <section className="container">
                    <MoviesLists />
                </section>
                <header className="App-header">
                    <p>The End</p>
                </header>
            </div> */}
        </BrowserRouter>
    );
}

export default App;
// App.displayName = 'App'
