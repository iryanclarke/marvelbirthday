import React, { Component } from 'react';
import ComicResult from './ComicResult';

class ComicList extends Component {
  render() {
    return (
      <div className="comic-results">

        { this.props.comics.length === 1 ?
          <h2>{`This comic was released on your birthday (${this.props.birthday})`}</h2>
          : null
        }

        { this.props.comics.length > 1 && this.props.comics.length < 5 ?
          <h2>{`These comics were released on your birthday! (${this.props.birthday})`}</h2>
          : null
        }

        { this.props.comics.length >= 5  ?
          <h2>{`Wow, ${this.props.comics.length} comics were released on your birthday! (${this.props.birthday})`}</h2>
          : null
        }

        <div className="comic-list">
          {this.props.comics.map(comic =>
            <ComicResult data = {comic} />
          )}
        </div>
      </div>
    );
  }
}

export default ComicList;
