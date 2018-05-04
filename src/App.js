import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {login, bookmark} from './actions/auth'

class App extends Component {

  state = {
    currentTab: '',
    profile: null,
    tabData: {},
    bookmarked: false,
    loading: false
  }


  componentDidMount() {
    this.getTab()
    if (chrome && chrome.storage) {
      chrome.storage.sync.get('bookmark_profile',result => {
        this.setState({
          profile: JSON.parse(result.bookmark_profile)
        })
      })
    }
    chrome.runtime.onMessage.addListener((request, sender) => {
      if (request.action === "getSource") {
        this._saveBookmark(request.source)
      }
    });

  }


  getTab = () => {
    let currentTab
    if (chrome.tabs) {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, tabs => {
        currentTab = tabs[0].url
        console.log(tabs[0])
        this.setState({currentTab, tabData: tabs[0]})
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

  _handleBookmark = () => {
    const message = document.querySelector('#message');
    chrome.tabs.executeScript(null, {
      file: "getPagesSource.js"
    }, function() {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) {
        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }
    });
  }

  _saveBookmark = (source) => {
    const {tabData, profile} = this.state
    const {title, url} = tabData
    const {photo, description, keywords, content, readingTime} = source
    const data = {
      profile_id: profile._id,
      title,
      url,
      photo,
      description,
      keywords,
      readingTime,
      content
    }

    console.log(data)
    this.setState({loading: true})
    bookmark(data).then(result => {
      console.log(result)
      if (result.status === 201) {
        this.setState({bookmarked: true, loading: false})
      }
    })
  }

  render() {
    const {profile, bookmarked, loading} = this.state
    console.log('profile', profile)
    return (
      <div className="App" style={{position: 'relative'}}>
        <div id='message' />
        {loading && <img alt='' src='https://filedb.experts-exchange.com/incoming/2014/12_w50/886830/load.gif' style={{position: 'absolute', top: '50%', left: '50%', marginTop: -32, marginLeft: -32, width : 32}} />}
        <div style={{textAlign: 'center', marginBottom: 20}}><img src={logo} width='30%' alt='' /></div>
        {profile ?
        <div>
          Welcome <b>{profile.name}</b> to Bookmark Extension
          <br />
          <br />
          <button onClick={this._handleLogout}>Log out</button> &nbsp;&nbsp;
          {bookmarked ? <div><br /><br />Page is bookmarked successfully</div> : <button onClick={this._handleBookmark}>Bookmark this page</button>}

        </div> :
        <form>
          <label style={{width: 100, textAlign: 'right', display: 'inline-block'}}>Email: </label>
          <input type="text" name='email' onChange={this._handleChange} />
          <br />
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