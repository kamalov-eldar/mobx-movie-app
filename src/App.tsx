import { observer } from 'mobx-react-lite';
import { MoviesLists } from './component/MoviesLists/MoviesLists';
import { moviesStore } from './store/moviesStore';
import './App.scss';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
            </header>
            <section className="container">
                <MoviesLists />
            </section>
            <header className="App-header">
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
            </header>
        </div>
    );
}

export default App;
// App.displayName = 'App'
