import React from 'react';
import './App.css';
import { MoviesLists } from './component/MoviesLists';
import MoviesStore from './store/moviesStore';

function App() {
    const { isLoading } = MoviesStore;
    console.log('isLoading: ', isLoading);

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <p>Edit</p>
            </header>
            <section className="container">
                {isLoading ? (
                    <div className="loader">
                        <span className="loader__text">Загрузка...</span>
                    </div>
                ) : (
                    <MoviesLists />
                )}
            </section>
        </div>
    );
}

export default App;
