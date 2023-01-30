import React from 'react';
import './Food.css'

class Food extends React.Component {

  // rather than fetch the data every time the component renders, hide it, so it can fetch in the background and is ready to be displayed when active.
  render() {
    return <div id="food" style={ !this.props.show ? { visibility: 'hidden' } : {} }>Food!!!</div>;
  }
}

export default Food;