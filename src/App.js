import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    currentTab: ''
  }


  componentDidMount() {
    this.getTab()
  }


  getTab = () => {
    let currentTab
    if (chrome.tabs) {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, tabs => {
        currentTab = tabs[0].url
        this.setState({currentTab})
        chrome.storage.sync.set({'page': currentTab}, function() {
          // Notify that we saved.
          console.log('Settings saved')
        });
      })
    } else {
      currentTab =  window.location.toString()
      this.setState({currentTab})
    }
  }

  render() {
    const {currentTab} = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <p>{currentTab}</p>
          <p>123</p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </div>
      </div>
    );
  }
}

export default App;
