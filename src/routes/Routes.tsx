import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

function f1() {
    return <div>movie/popular</div>;
}

const Routes = () => {
    return (
        <Switch>
            <Route path="/:category/search/:keyword" component={Catalog} />
            <Route path="/:category/:id" component={Detail} />
            <Route path="/category/:category/list/:listType" component={Catalog} />
            {/*     <Route path="/:category" component={Catalog}></Route> */}
            <Route path="/" exact component={Home} />
        </Switch>
    );
};

export default Routes;
