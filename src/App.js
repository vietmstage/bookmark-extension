import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  getTab = () => {
    if(chrome.tabs) {
      // chrome.tabs.create({url: 'http://google.com'}, function () {})
      // const query = { active: true, currentWindow: true };
      // return 'meo len cmn'
      chrome.tabs.getSelected(0, function(tabs) {
        return 'meo len cmn'
      })
      // return JSON.stringify(chrome.tabs)
    } else {
      return window.location.toString()
    }
  }
  render() {
    console.log('thi ddfsfsdfs;lfm')
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <p>{this.getTab()}</p>
          <p>123</p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </div>
      </div>
    );
  }
}

export default App;
