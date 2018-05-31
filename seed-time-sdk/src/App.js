import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { createStore, combineReducers } from 'redux';
import SdkMap from '@boundlessgeo/sdk/components/map';
import SdkMapReducer from '@boundlessgeo/sdk/reducers/map';
import * as SdkMapActions from '@boundlessgeo/sdk/actions/map';
// import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const store = createStore(combineReducers({
  'map': SdkMapReducer,
}));

class App extends Component {
  componentDidMount() {
  // add the OSM source
  store.dispatch(SdkMapActions.addOsmSource('osm'));

  // add an OSM layer
  store.dispatch(SdkMapActions.addLayer({
    id: 'osm',
    source: 'osm',
  }));
}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button bsStyle="success">NEW BUTTON!</Button>

        <div className="VeggieLine" />
        <SdkMap store={store} />
      </div>
    );
  }
}

export default App;
