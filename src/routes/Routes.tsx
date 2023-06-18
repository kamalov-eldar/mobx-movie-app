import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/Detail';
import { Route, Switch } from 'react-router-dom';

const Routes = () => {
    return (
        <Switch>
            <Route path="/:category/search/:keyword" component={Catalog} />
            <Route path="/:category/:id" component={Detail} />
            <Route path="/:category" component={Catalog} />
            <Route path="/" exact component={Home} />
        </Switch>
    );
};

export default Routes;
