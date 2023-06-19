import { moviesStore } from './movies-store';
import { tvStore } from './tv-store';

class RootStore {
    moviesStore = moviesStore;
    tvStore = tvStore;
}

export default RootStore;
