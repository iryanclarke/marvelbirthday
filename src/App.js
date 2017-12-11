import React, { Component } from 'react';
import './style.css';
import logo from './github.svg';

// Components
import ComicFinder from './components/ComicFinder';

class App extends Component {

  // Render View
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Your Birthday Comic</h1>
          <h3>Want to know what comic was released on your birthday? Enter it below!</h3>
        </header>
        <ComicFinder />

        <div className="credits">
          <div className="socials">
            <a href="https://github.com/iryanclarke/marvelbirthday"><img src={logo} className="github" alt="logo" /></a>
          </div>
          <p>By: Ian Ryan Clarke</p>
        </div>
      </div>
    );
  }
}

export default App;
