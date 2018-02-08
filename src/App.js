import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {login} from './actions/auth'
class App extends Component {

  state = {
    currentTab: '',
    profile: null
  }


  componentDidMount() {
    // this.getTab()
    if (chrome && chrome.storage) {
      chrome.storage.sync.get('bookmark_profile',result => {
        console.log(result)
        this.setState({
          profile: JSON.parse(result.bookmark_profile)
        })
      })
    }
    // this._handleViewToken()
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
    login(this.state.email, this.state.password).then(result => {
      console.log(result)
      if (result.status === 200) {
        chrome.storage.sync.set({'bookmark_profile': JSON.stringify(result.data.profiles[0])})
        // chrome.storage.sync.set({'BE_token': result.data.token})
        this.setState({
          profile: result.data.profiles[0],
          email: '',
          password: ''
        })
      } else {

      }
    })
  }

  _handleViewToken = e => {
    e.preventDefault()
    chrome.storage.sync.get('tokenXXX', function(result) {
      // this.setState({result})
      console.log('asasdd;,', result)
    })
  }

  _handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  _handleLogout = (e) => {
    e.preventDefault()
    chrome.storage.sync.remove('bookmark_profile')
    this.setState({
      profile: null
    })
  }

  render() {
    // const {currentTab} = this.state
    const {profile} = this.state
    return (
      <div className="App">
        {profile ?
        <div>
          Welcome {profile.name} to Bookmark Extension
          <br />
          <button onClick={this._handleLogout}>Log out</button>
        </div> :
        <form>
          <label style={{width: 100, textAlign: 'right', display: 'inline-block'}}>Email: </label>
          <input type="text" name='email' onChange={this._handleChange} />
          <br />
          <label style={{width: 100, textAlign: 'right', display: 'inline-block'}}>Password: </label>
          <input type="password" name='password' onChange={this._handleChange} />
          <br />
          <br />
          <button onClick={this._handleLogin}>Login</button>
        </form>
        }
      </div>
    );
  }
}

export default App;
