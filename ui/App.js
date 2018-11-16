import React, { Component } from 'react';
import 'spectre.css';

import BarChart from './components/BarChart/BarChart';

const state = [
  {
    name: 'Release A',
    data: [
      {
        name: 'Chunk A',
        size: 200
      },
      {
        name: 'Chunk B',
        size: 300
      },
      {
        name: 'Chunk C',
        size: 500
      }
    ]
  },
  {
    name: 'Release B',
    data: [
      {
        name: 'Chunk A',
        size: 400
      },
      {
        name: 'Chunk B',
        size: 600
      },
      {
        name: 'Chunk C',
        size: 800
      }
    ]
  },
  {
    name: 'Release B',
    data: [
      {
        name: 'Chunk A',
        size: 800
      },
      {
        name: 'Chunk B',
        size: 1000
      },
      {
        name: 'Chunk C',
        size: 400
      },
      {
        name: 'Chunk D',
        size: 1200
      }
    ]
  },
  {
    name: 'Release B',
    data: [
      {
        name: 'Chunk A',
        size: 800
      },
      {
        name: 'Chunk B',
        size: 700
      },
      {
        name: 'Chunk C',
        size: 400
      },
      {
        name: 'Chunk D',
        size: 1200
      }
    ]
  }
];

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="App-title">Welcome to webpack-bundle-phobia</h1>
        <BarChart data={state} />
      </div>
    );
  }
}

export default App;
