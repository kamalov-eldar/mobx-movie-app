import { injectStores } from '@mobx-devtools/tools';

import MoviesStore from './moviesStore';

/* injectStores({
    MoviesStore,
}); */

/* class RootStore {
    constructor() {
        this.moviesStore = new MoviesStore();
        //this.todoStore = new TodoStore(this)
    }
} */

const stores = {
    //MoviesStore: new MoviesStore(),
    // CurrenciesStore: new CurrenciesStore(),
};

export default { MoviesStore };
