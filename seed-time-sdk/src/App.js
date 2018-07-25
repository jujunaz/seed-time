import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { createStore, combineReducers } from 'redux';
import SdkMap from '@boundlessgeo/sdk/components/map';
import SdkMapReducer from '@boundlessgeo/sdk/reducers/map';
import * as SdkMapActions from '@boundlessgeo/sdk/actions/map';
// import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Well } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
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
import * as printActions from '@boundlessgeo/sdk/actions/print';
import { saveAs } from 'file-saver';
import SdkPrintReducer from '@boundlessgeo/sdk/reducers/print';





// all the reducers used
const store = createStore(combineReducers({
  'map': SdkMapReducer,
  'drawing': SdkDrawingReducer,
  'print': SdkPrintReducer,
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//all the constructors
class App extends Component {
  constructor(props) {
    super(props);
    this.handleClickPoly = this.handleClickPoly.bind(this);
    this.handleClickLi = this.handleClickLi.bind(this);
    this.handleClickPt = this.handleClickPt.bind(this);
    this.addFeature = this.addFeature.bind(this);
    this.exportImage = this.exportImage.bind(this);
  }
  componentDidMount() {
    // add the OSM source
    store.dispatch(SdkMapActions.addOsmSource('osm'));
    // add an OSM layer
    store.dispatch(SdkMapActions.addLayer({
      id: 'osm',
      source: 'osm',
      type: 'raster',
    }));

    // make stores for all three geometry types users can enter
    ['points', 'lines', 'polygons'].forEach((geom_type)=> {
      store.dispatch(mapActions.addSource(geom_type, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      }));
    });

    // create the layer for polygons
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

    // create the layer for points
    store.dispatch(mapActions.addLayer({
      id: 'pts',
      source: 'points',
      type: 'circle',
      paint: {
        'circle-radius': 4,
        'circle-color': '#feb24c',
        'circle-stroke-color': '#f03b20',
      },
    }));

    // create the layer for lines
    store.dispatch(mapActions.addLayer({
      id: 'linez',
      source: 'lines',
      type: 'lines',
      paint: {
        'line-color': '#feb24c',
        'line-width': 4,
      },
    }));

  }

  exportMapImage(blob) {
    saveAs(blob, 'map.png');
    store.dispatch(printActions.receiveMapImage());
  };

  addFeature(map, sourceName, collection) {
    const feature = collection.features[0];
    store.dispatch(mapActions.addFeatures(sourceName, [feature]));
  };

  handleClickPoly() {
    store.dispatch(drawingActions.startDrawing('polygons', INTERACTIONS.polygon, 'direct_select'));
  };
  handleClickLi() {
    store.dispatch(drawingActions.startDrawing('lines', INTERACTIONS.line, 'direct_select'));
  };
  handleClickPt() {
    store.dispatch(drawingActions.startDrawing('points', INTERACTIONS.point, 'direct_select'));
  };

  exportImage() {
    store.dispatch(printActions.exportMapImage())
  };


  render() {
    return (
      <div className="App">
      <header className="App-header">

      <h1 className="App-title"></h1>
      </header>
      <SeedLogo />
      <Jumbotron>
      <h1>Welcome to Seed Time</h1>
      <p>
      Seed time helps you grow food.
      </p>
      </Jumbotron>
      <Jumbotron>
      <h2>How it works:</h2>
      <p>
      Choose a plot to grow on.
      Choose what you would like to grow.
      Get a customized plot and calendar.
      </p>
      </Jumbotron>
      <p>  </p>
      <VeggieLine />
      <p>  </p>
      <Button bsStyle="custom">Sup</Button>
      <div> Try out Seed Time!</div>
      <p>  </p>

      <div className="main-map">
      <SdkMap store={store} onFeatureDrawn={this.addFeature} onExportImage={this.exportMapImage} />
      </div>

      <ListGroupItem bsStyle="success">Find your plot on the map, draw it out, and start adding individual plants or rows of plants</ListGroupItem>

      <div className="map-buttons">
      <ButtonToolbar>
      <Button bsStyle="custom" active onClick={this.handleClickPoly}>Draw out your plot</Button>
      <Button bsStyle="custom" active onClick={this.handleClickLi}>Add a row of plants</Button>
      <Button bsStyle="custom" active onClick={this.handleClickPt}>Add a plant</Button>
      </ButtonToolbar>
      <p> </p>
      <Button bsStyle="custom" active>Done? Continue here</Button>
      <p>  </p>
      <Button bsStyle="custom" active onClick={this.exportImage}>Download your garden</Button>
      </div>
      </div>

    );
  }
}


export default App;
