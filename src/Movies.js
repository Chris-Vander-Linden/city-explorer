import React from 'react';
import './Movies.css'

class Movies extends React.Component {

  // rather than fetch the data every time the component renders, hide it, so it can fetch in the background and is ready to be displayed when active.
  render() {
    return <div id="movies" style={ !this.props.show ? { visibility: 'hidden' } : {} }>Movies!!!</div>;
  }
}

export default Movies;