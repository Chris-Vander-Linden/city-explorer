import React from 'react';
import Nav from './Nav.js';
import Map from './Map.js';
import Weather from './Weather.js';
import Movies from './Movies.js';
import Food from './Food.js';
import './Content.css';

class Content extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      mapShow: true,
      weatherShow: false,
      movieShow: false,
      foodShow: false
    }
  }

  handleNavClick = (event) => {

    // if elem is active, don't update.
    if (event.currentTarget.className !== 'active') {

      // create state copy
      const stateToUpdate = { ...this.state }

      // set all values to false
      for (const property in stateToUpdate) {
        stateToUpdate[property] = false;
      }

      // toggle clicked elem status
      // boolean value has to be compared to string since data value is string
      stateToUpdate[event.currentTarget.dataset.name] = event.currentTarget.dataset.value === 'false';

      // update state
      this.setState(stateToUpdate)
    }
  }

  render() {

    return <>
      {/* #contentContainer needs the ref from #formContainer, so I can dynamically update the height by subtracting the static element height and the dynamic form area height. */ }
      <div id="contentContainer" style={ { height: `calc(100vh - ${(124 + this.props.mapFormElemHeight)}px)` } }>
        {/* Nav needs all state props */ }
        <Nav { ...this.state } onHandleNavClick={ this.handleNavClick } />


        <Map show={ this.state.mapShow } results={ this.props.results } lat={ this.props.lat } lon={ this.props.lon } />
        <Weather show={ this.state.weatherShow } results={ this.props.results } lat={ this.props.lat } lon={ this.props.lon } />
        <Movies show={ this.state.movieShow } results={ this.props.results } lat={ this.props.lat } lon={ this.props.lon } />
        <Food show={ this.state.foodShow } results={ this.props.results } lat={ this.props.lat } lon={ this.props.lon } />
      </div>
    </>
  }
}

export default Content