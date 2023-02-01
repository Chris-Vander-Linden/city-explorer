import React from 'react';
import axios from 'axios';
import createTable from './createTable.js';
import './Weather.css'

class Weather extends React.Component {
  constructor (props) {
    super(props);
    // add state
    this.state = {
      data: [],
      error: false
    };
  }

  updateData() {
    this.props?.results[0]?.lat && axios.get(`http://localhost:3003/weatherAPI?lat=${this.props.results[0].lat}&lon=${this.props.results[0].lon}`).then(response => {
      // update results and make sure errors is set to false

      this.setState({
        data: response.data
      });

    }).catch(error => {
      // update error message in state and log
      this.setState({ error: error.message });
      console.error(error.message);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // THE ONLY TIME YOU WANT TO CALL THE API IS WHEN THERE IS A CITY UPDATE!!!
    this.props.callAPIs && !prevProps.callAPIs && this.updateData();

  }

  render() {
    const formattedData = this.state.data.map(obj => {
      obj = { ...obj, icon: <><img src={ `https://www.weatherbit.io/static/img/icons/${obj.icon}.png` } alt='weather' /></> };

      return obj;
    });

    const table = createTable(formattedData, this.state.error);

    // rather than fetch the data every time the component renders, hide it, so it can fetch in the background and is ready to be displayed when active.
    return <div id="weather" style={ !this.props.show ? { visibility: 'hidden' } : {} }>
      { table ? table : <span>Please search for a city above...</span> }
    </div>;
  }
}

export default Weather;