import React, { Component } from 'react';
import axios from 'axios';

// React Datepicker Imports
import DatePicker from 'react-datepicker';
import moment from 'moment';

import logo from './logo.svg';
import './style.css';

class ComicResults extends Component {
  // Render View
  render() {
    return (
      <div className="results">
        <h2>{`This comic was released on: ${this.props.birthday}`}</h2>
        {this.props.comics.map(comic =>
          <h3 id="comic.id">{comic.title}</h3>
        )}
        <h4>Featuring the characters:</h4>

        {this.props.characters.map(character =>
          <p>{character.name}</p>
        )}
      </div>
    );
  }
}

class ComicFinder extends Component {

  // App Constructor
  constructor(props) {
    super(props);

    this.state = {
      comics: [],
      characters: [],
      birthday: moment(),
      startDate: moment(),
      endDate: moment(),
      showResults: false,
      hasResults: false
    };

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(date) {
    this.setState({
      birthday: date,
      startDate: this.state.birthday.format('MM/DD/YYYY'),
      endDate: this.state.birthday.add(1, 'days').format('MM/DD/YYYY')
    });
  }

  fetchComic () {
    axios.get(`https://gateway.marvel.com:443/v1/public/comics?dateRange=${this.state.startDate},${this.state.endDate}&apikey=2be07e16999a2baea0054454ca1a1b3b`)
      .then(res => {
        const comics = res.data.data.results.map(obj => obj);
        this.setState({ comics });
        const characters = res.data.data.results.map(obj => obj.characters.items);
        this.setState({ characters });
        this.setState({ showResults: true });
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }

  // Render View
  render() {
    return (
      <div className="birthdaycomic">
        <div className="interactive-area">
          <DatePicker
              selected={this.state.birthday}
              onChange={this.handleChange}
              showYearDropdown
          />
          <button onClick={() => this.fetchComic()}>Find it</button>
        </div>

        { this.state.showResults && !this.state.hasResults ?
          <ComicResults
            comics = {this.state.comics}
            characters = {this.state.characters}
            birthday = {this.state.startDate}
          />
          : null
        }
        { this.state.showResults && this.state.hasResults ?
          <h2>We couldnt find any results for you</h2>
          : null
        }
      </div>
    );
  }
}


class App extends Component {

  // Render View
  render() {
    return (
      <div className="App">
        <header className="app-header">
          <h1 className="app-title">Your Birthday Comic</h1>
          <h3>Want to know what comic was released on your birthday? Enter it below!</h3>
        </header>
        <ComicFinder />
      </div>
    );
  }
}

export default App;
