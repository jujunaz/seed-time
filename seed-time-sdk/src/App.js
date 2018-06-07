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


import ReactDOM from 'react-dom';
import SdkDrawingReducer from '@boundlessgeo/sdk/reducers/drawing';
import SdkZoomControl from '@boundlessgeo/sdk/components/map/zoom-control';
import * as mapActions from '@boundlessgeo/sdk/actions/map';
import * as drawingActions from '@boundlessgeo/sdk/actions/drawing';
import {INTERACTIONS} from '@boundlessgeo/sdk/constants';
import '@boundlessgeo/sdk/stylesheet/sdk.scss';




const store = createStore(combineReducers({
  'map': SdkMapReducer,
  'drawing': SdkDrawingReducer,
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
  constructor(props) {
  super(props);

  this.handleClick = this.handleClick.bind(this);

}
  componentDidMount() {
  // add the OSM source
  store.dispatch(SdkMapActions.addOsmSource('osm'));

  // add an OSM layer
  store.dispatch(SdkMapActions.addLayer({
    id: 'osm',
    source: 'osm',
  }));

  store.dispatch(mapActions.addSource('polygons', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      },
    }));

  store.dispatch(mapActions.addLayer({
  id: 'polys',
  source: 'polygons',
  type: 'fill',
  paint: {
    'fill-opacity': 0.7,
    'fill-color': '#feb24c',
    'fill-outline-color': '#f03b20',
  },
}));
}

handleClick() {
  console.log("ahhhhhh");
  store.dispatch(drawingActions.startDrawing('polygons', INTERACTIONS.polygon, 'direct_select'));
};

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
    <Button bsStyle="custom" onClick={this.handleClick}>Draw a polygon</Button>
    <Button bsStyle="custom">Draw a line</Button>
    </div>
  );
}
}

export default App;
