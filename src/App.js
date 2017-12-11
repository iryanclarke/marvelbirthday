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
      <div class="results">
        <h1>{`This comic was released on: ${this.props.birthday}`}</h1>
        {this.props.comics.map(comic =>
          <h3>{comic.title}</h3>
        )}
        <h4>Featuring the characters:</h4>

        {this.props.characters.map(character =>
          <p>{character.name}</p>
        )}
      </div>
    );
  }
}

class BirthdayComic extends Component {

  // App Constructor
  constructor(props) {
    super(props);

    this.state = {
      comics: [],
      characters: [],
      birthdayStart: moment(),
      birthdayEnd: moment(),
      showResults: false
    };

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(date) {
    console.log('Date: ' + date);
    console.log(date);

    const dateString = date;
    this.setState({
      birthdayStart: dateString,
      birthdayEnd: dateString,
    });
  }

  fetchComic () {
    axios.get(`https://gateway.marvel.com:443/v1/public/comics?dateRange=${this.state.birthdayStart},${this.state.birthdayEnd}&apikey=2be07e16999a2baea0054454ca1a1b3b`)
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
      <div class="birthdaycomic">
        <div class="interactive-area">
          <DatePicker
              selected={this.state.birthdayStart}
              onChange={this.handleChange}
              showYearDropdown
              dateFormatCalendar="YYYY/MM/DD"
          />
          <button onClick={() => this.fetchComic()}>Find it</button>
        </div>

        { this.state.showResults ? <ComicResults
          comics = {this.state.comics}
          characters = {this.state.characters}
          birthday = {this.state.birthdayStart} /> : null }
      </div>
    );
  }
}


class App extends Component {

  // Render View
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Your Birthday Comic</h1>
          <h3>Want to know what comic was released on your birthday? Enter it below!</h3>
        </header>
        <BirthdayComic />
      </div>
    );
  }
}

export default App;
