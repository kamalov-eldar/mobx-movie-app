import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import { Route, Switch, useRouteMatch, BrowserRouter } from 'react-router-dom';


const Routes = () => {
    return (
        <Switch>
            <Route path="/:category/:id" exact component={Detail} />
            <Route path="/:category/search/:keyword" component={Catalog} />
            <Route path="/:category/:listType" exact component={Catalog}></Route>
            <Route path="/:category" component={Catalog} />

            <Route path="/" exact component={Home} />
        </Switch>
    );
};

export default Routes;
