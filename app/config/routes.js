import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Parse from 'parse';
import MobileDetect from 'mobile-detect';
import Main from '../components/Main';
import Home from '../components/search/Home';
import Result from '../components/result/Result';
import Detail from '../components/detail/Detail';
import Invite from '../components/invite/Invite';
let md = new MobileDetect(window.navigator.userAgent);

Parse.initialize("JUXCXuysBgoulgFgGDGzc9elQNx4q84XiaDBoYyo", "B7RS0P7Yc5ts80tia2wMoMFBsyVqMFmj9H3JocTK");

function indexRedirect(location, replaceWith) {
  if (md.mobile()) {
    window.location = 'https://s3.amazonaws.com/vokou/assets/m.html';
    return
  }

  if (Parse.User.current()) {
    replaceWith(null, '/search');
  } else {
    replaceWith(null, '/invite');
  }
}

function authenticate(location, replaceWith) {
  if (md.mobile()) {
    window.location = 'https://s3.amazonaws.com/vokou/assets/m.html';
    return
  }

  if (!Parse.User.current()) {
    replaceWith(null, '/invite');
  }
}

function redirectAfterLogin(locatoin, replaceWith) {
  if (md.mobile()) {
    window.location = 'https://s3.amazonaws.com/vokou/assets/m.html';
    return
  }

  if (Parse.User.current()) {
    replaceWith(null, '/search');
  }
}

var routes = (
  <Route name="app" path="/" component={Main}>
    <IndexRoute onEnter={indexRedirect} />
    <Route path="/search" component={Home} onEnter={authenticate} />
    <Route path="/result" component={Result} onEnter={authenticate}/>
    <Route path="/detail/:hotelname/:city/:checkin/:checkout/:propID" component={Detail} onEnter={authenticate} />
    <Route path="/detail/" component={Detail} onEnter={authenticate} />
    <Route path="/invite" component={Invite} onEnter={redirectAfterLogin}/>
  </Route>
);

export default routes;
