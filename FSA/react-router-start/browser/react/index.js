import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import { Router, Route, Link, hashHistory, IndexRedirect } from 'react-router';
import Albums from './components/Albums'
import Album from './components/Album'
import Artists from './components/Artists'
import Artist from './components/Artist'
ReactDOM.render(
  <Router history = {hashHistory}>
    <Router path='/' component = {AppContainer}>
      <IndexRedirect to="albums" />
      <Route path='albums' component={Albums} />
      <Route path='albums/:albumId' component={Album} />
      <Route path='artists' component={Artists} />
      <Route path='artists/:artistId' component={Artist} />
    </Router>
  </Router>,
  document.getElementById('app')
);
