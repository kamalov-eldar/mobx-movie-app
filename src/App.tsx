import { observer } from 'mobx-react-lite';
import { MoviesLists } from './component/MoviesLists/MoviesLists';
import { moviesStore } from './store/movies-store';
import './App.scss';

function App() {
    console.log('App: ');
    return (
        <div className="App">
            <header className="App-header">
                <p>Movie Application</p>
            </header>
            <section className="container">
                <MoviesLists />
            </section>
            <header className="App-header">
                <p>The End</p>
            </header>
        </div>
    );
}

export default App;
// App.displayName = 'App'
