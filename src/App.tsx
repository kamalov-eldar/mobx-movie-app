import { observer } from 'mobx-react-lite';
import { MoviesLists } from './component/MoviesLists/MoviesLists';
import { moviesStore } from './store/moviesStore';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <p>Edit</p>
            </header>
            <section className="container">
                <MoviesLists />
            </section>
        </div>
    );
}

export default App;
// App.displayName = 'App'
