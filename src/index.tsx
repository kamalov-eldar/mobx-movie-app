import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { spy } from 'mobx';
import { RootStoreContext } from './root-store-context';
import RootStore from './store/root-store';
import { BrowserRouter, HashRouter, Router } from 'react-router-dom';

spy((evt) => {
    if (evt.type === 'action') {
        //console.log('evt', evt);
    }
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <RootStoreContext.Provider value={new RootStore()}>
        <HashRouter>
            <App />
        </HashRouter>
    </RootStoreContext.Provider>,
);
