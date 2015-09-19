import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Main from '../components/Main';
import Search from '../components/Search';

function redirectToSearch(location, replaceWith) {
  replaceWith(null, '/search');
}

var routes = (
  <Route name="app" path="/" component={Main}>
    <IndexRoute onEnter={redirectToSearch} />
    <Route name="search" path="/search" component={Search} />
  </Route>
);

export default routes;