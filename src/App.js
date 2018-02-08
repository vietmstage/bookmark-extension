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

  _handleLogin = (e) => {
    e.preventDefault()
    console.log('chỏm', chrome)
    chrome.storage.sync.set({'tokenXXX': 'this_is_token_code'}, () => {

    })
  }

  _handleViewToken = e => {
    e.preventDefault()
    chrome.storage.sync.get('tokenXXX', function(result) {
      // this.setState({result})
      console.log('asasdd;,', result)
    })
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
          <button onClick={this._handleLogin}>click</button>
          <button onClick={this._handleViewToken}>view token</button>
          <p>{this.state.result}</p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </div>
      </div>
    );
  }
}

export default App;
