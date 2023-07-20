import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { spy } from 'mobx';
import { RootStoreContext } from './root-store-context';
import RootStore from './store/root-store';
import { BrowserRouter, HashRouter, Router } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';

spy((evt) => {
    if (evt.type === 'action') {
        //console.log('evt', evt);
    }
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <RootStoreContext.Provider value={new RootStore()}>
        <HashRouter>
            <StyledEngineProvider injectFirst>
                <App />
            </StyledEngineProvider>
        </HashRouter>
    </RootStoreContext.Provider>,
);
