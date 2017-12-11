import React, { Component } from 'react';

class ComicResult extends Component {


  // Render View
  render() {
    return (
      <div className="comic" id={this.props.data.id}>
        <div className="thumbnail-wrapper">
          <img src={this.props.data.thumbnail.path + ".jpg"} className="thumbnail" alt="logo" />
        </div>
        <div className="metaData-wrapper">
          <h3>{this.props.data.title}</h3>
          <p className="description">{this.props.data.description}</p>
          <p className="versionMetadata">Format: {this.props.data.format} ({this.props.data.pageCount} pages)</p>
        </div>
      </div>
    );
  }
}

export default ComicResult;
