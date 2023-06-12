import { createContext, useContext } from 'react';
import RootStore from './store/root-store';

export const RootStoreContext = createContext<RootStore | null>(null);

export const useStores = () => {
    const context = useContext(RootStoreContext);

    if (context === null) {
        throw new Error(
            'Возможно вы не обернули приложение в провайдер Context',
        );
    }
    return context;
};
