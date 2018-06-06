import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { createStore, combineReducers } from 'redux';
import SdkMap from '@boundlessgeo/sdk/components/map';
import SdkMapReducer from '@boundlessgeo/sdk/reducers/map';
import * as SdkMapActions from '@boundlessgeo/sdk/actions/map';
// import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Jumbotron } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import VeggieLine from './components/veggie-line';
import SeedLogo from './components/seed-logo';

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

    <h1 className="App-title">Seed Time</h1>
    </header>
    <SeedLogo />
    <Jumbotron>
    <h1>Welcome to Seed Time</h1>
    <p>
    Seed time helps you grow things.
    </p>
    </Jumbotron>
    <Button bsStyle="custom">How it works</Button>
    <p>  </p>
    <div className="intro-list">
    <ListGroup>
    <ListGroupItem bsStyle="success">Choose a plot to grow on</ListGroupItem>
    <ListGroupItem bsStyle="success">Choose what you would like to grow</ListGroupItem>
    <ListGroupItem bsStyle="success">Get a customised map and calendar</ListGroupItem>
    </ListGroup>
    </div>
    <VeggieLine />
    <p>  </p>
    <Button bsStyle="custom">Try out Seed Time!</Button>
    <p>  </p>


    <SdkMap store={store} />

    </div>
  );
}
}

export default App;
