import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from 'mobx-react';
import store from './store/root-store';
import { spy } from 'mobx';
import { RootStoreContext } from './root-store-context';
import RootStore from './store/root-store';

spy((evt) => {
    if (evt.type === 'action') {
        console.log('evt', evt);
    }
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <Provider store={store}>
        <RootStoreContext.Provider value={new RootStore()}>
            <App />
        </RootStoreContext.Provider>
    </Provider>,
);
