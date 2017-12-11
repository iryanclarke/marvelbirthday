import React, { Component } from 'react';
import ComicResult from './ComicResult';

class ComicList extends Component {
  // Render View
  render() {
    return (
      <div className="comic-results">
        <h2>{`These comics were released on your birthday (${this.props.birthday})`}</h2>

        <div className="comic-list">
          {this.props.comics.map(comic =>
            <ComicResult data = {comic} />
          )}
        </div>

        {this.props.characters.map(character =>
          <p>{character.name}</p>
        )}
      </div>
    );
  }
}

export default ComicList;
