import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Parse from 'parse';
import Main from '../components/Main';
import Search from '../components/search/Search';
import Result from '../components/result/Result';
import Detail from '../components/detail/Detail';
import Invite from '../components/invite/Invite';

Parse.initialize("JUXCXuysBgoulgFgGDGzc9elQNx4q84XiaDBoYyo", "B7RS0P7Yc5ts80tia2wMoMFBsyVqMFmj9H3JocTK");

function indexRedirect(location, replaceWith) {
  if (Parse.User.current()) {
    replaceWith(null, '/search');
  } else {
    replaceWith(null, '/invite');
  }
}

function authenticate(location, replaceWith) {
  if (!Parse.User.current()) {
    replaceWith(null, '/invite');
  }
}

var routes = (
  <Route name="app" path="/" component={Main}>
    <IndexRoute onEnter={indexRedirect} />
    <Route path="/search" component={Search} onEnter={authenticate} />
    <Route path="/result" component={Result} onEnter={authenticate}/>
    <Route path="/detail/:hotelname/:city/:checkin/:checkout/:propID" component={Detail} onEnter={authenticate} />
    <Route path="/detail/" component={Detail} onEnter={authenticate} />
    <Route path="/invite" component={Invite} />
  </Route>
);

export default routes;
