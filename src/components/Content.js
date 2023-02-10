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
      nav: {
        mapShow: true,
        weatherShow: false,
        movieShow: false,
        foodShow: false
      }
    }
  }

  handleNavClick = (event) => {

    // if elem is active, don't update.
    if (event.currentTarget.className !== 'active') {

      // create state copy
      const stateToUpdate = { ...this.state.nav }

      // set all values to false
      for (const property in stateToUpdate) {
        stateToUpdate[property] = false;
      }

      // toggle clicked elem status
      // boolean value has to be compared to string since data value is string
      stateToUpdate[event.currentTarget.dataset.name] = event.currentTarget.dataset.value === 'false';

      // update state
      this.setState({ nav: stateToUpdate });
    }
  }

  // this will prevent content child components from rendering unless there is 1 city value, the nav items are clicked, or the form height has changed or is null.
  shouldComponentUpdate(nextProps, nextState) {
    return !(nextProps.results.length !== 1 && this.state === nextState) || nextProps.mapFormElemHeight !== this.props.mapFormElemHeight;
  }

  render() {
    return <>
      {/* #contentContainer needs the ref from #formContainer, so I can dynamically update the height by subtracting the static element height and the dynamic form area height. */ }
      <div id="contentContainer" style={ { height: `calc(100vh - ${(126 + this.props.mapFormElemHeight)}px)` } }>
        {/* Nav needs all state props */ }
        <Nav { ...this.state.nav } onHandleNavClick={ this.handleNavClick } />

        <Map show={ this.state.nav.mapShow } results={ this.props.results } callAPIs={ this.props.callAPIs } />
        <Weather show={ this.state.nav.weatherShow } results={ this.props.results } callAPIs={ this.props.callAPIs } onHandleTimeStampUpdate={this.handleTimeStampUpdate}/>
        <Movies show={ this.state.nav.movieShow } results={ this.props.results } callAPIs={ this.props.callAPIs } />
        <Food show={ this.state.nav.foodShow } results={ this.props.results } callAPIs={ this.props.callAPIs } />
      </div>
    </>
  }
}

export default Content;