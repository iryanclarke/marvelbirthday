import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ComicList from './ComicList';

class ComicFinder extends Component {

  // App Constructor
  constructor(props) {
    super(props);

    this.state = {
      comics: [],
      characters: [],
      buttonText: 'Find it!',
      birthday: moment(),
      startDate: moment().format('MM/DD/YYYY'),
      endDate: moment().format('MM/DD/YYYY'),
      showResults: false,
      hasResults: false,
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
  }


  // Handle datepicker changing value,
  handleChange(date) {
    this.setState({
      birthday: date,
      startDate: date.format('MM/DD/YYYY'),
      endDate: date.format('MM/DD/YYYY')
    });
  }

  // Perform AJAX request using Axios
  fetchComic () {
    this.setState({
      isLoading: true,
      buttonText: 'Finding...'
    });

    const bleh = this.state.birthday.format('MM/DD/YYYY');
    console.log("Start Date: " + this.state.startDate + " End Date: " + this.state.endDate + " Datepicker date: " + bleh)

    axios.get(`https://gateway.marvel.com:443/v1/public/comics?dateRange=${this.state.startDate},${this.state.endDate}&apikey=2be07e16999a2baea0054454ca1a1b3b`)
      .then(res => {
        console.log("Numbah " + res.data.data.count);
        if (res.data.data.count > 0) {
          const comics = res.data.data.results.map(obj => obj);
          this.setState({ comics });
          const characters = res.data.data.results.map(obj => obj.characters.items);
          this.setState({ characters });
          this.setState({
            showResults: true,
            hasResults: true,
            isLoading: false,
            buttonText: 'Find Another Birthday Comic!'
          });
        }
        else {
          this.setState({
            showResults: true,
            hasResults: false,
            isLoading: false,
            buttonText: 'Find it!'
          });
        }
      })
      // Catch any response errors (from Axios Docs)
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
          <button className={this.state.isLoading ? 'loading': null}  onClick={() => this.fetchComic()}>{this.state.buttonText}</button>
        </div>

        { this.state.showResults && this.state.hasResults ?
          <ComicList
            comics = {this.state.comics}
            characters = {this.state.characters}
            birthday = {this.state.startDate}
          />
          : null
        }
        { this.state.showResults && !this.state.hasResults ?
          <h2>We couldnt find any results for you</h2>
          : null
        }
      </div>
    );
  }
}

export default ComicFinder;
