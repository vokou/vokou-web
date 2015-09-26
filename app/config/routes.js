import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Main from '../components/Main';
import Search from '../components/search/Search';
import Result from '../components/result/Result';
import Detail from '../components/detail/Detail';

function redirectToSearch(location, replaceWith) {
  replaceWith(null, '/search');
}

var routes = (
  <Route name="app" path="/" component={Main}>
    <IndexRoute onEnter={redirectToSearch} />
    <Route path="/search" component={Search} />
    <Route path="/result" component={Result} />
    <Route path="/detail/:hotelname/:propID/:checkin/:checkout" component={Detail} />
  </Route>
);

export default routes;
