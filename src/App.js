import React from 'react';
import logo from './logo.svg';
import './App.css';

// server api for all data http://46.101.211.139:3000/

function MyCmp() {
  return (
      <div>Test Text</div>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. <MyCmp />
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React Easy
        </a>
      </header>
    </div>
  );
}

export default App;
