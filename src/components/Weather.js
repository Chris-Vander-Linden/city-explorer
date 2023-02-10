import React from 'react';
import axios from 'axios';
import APITable from './APITable.js';
import './Weather.css'

class Weather extends React.Component {
  constructor (props) {
    super(props);
    // add state
    this.state = {
      data: {},
      error: false,
    };
  }

  convertDate(dateObj) {
    const date = new Date(dateObj)
    return date.toLocaleTimeString('en-US') + ', ' + date.toLocaleString("default", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  updateData() {
    //http://localhost:3003/weatherAPI
    //https://city-explorer-api-jqdk.onrender.com/weatherAPI
    this.props?.results[0]?.lat && axios.get(`http://localhost:3003/weatherAPI?lat=${this.props.results[0].lat}&lon=${this.props.results[0].lon}`).then(response => {
      // update results and make sure errors is set to false
      this.setState({
        data: response.data,
        error: false
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
    const formattedData = this.state.data.data?.map(obj => {
      // I could have sent the entire url from the server but wanted to simulate having incomplete data.
      obj = { ...obj, icon: <><img src={ `https://www.weatherbit.io/static/img/icons/${obj.icon}.png` } alt='weather' /></> };

      return obj;
    });

    // rather than fetch the data every time the component renders, hide it, so it can fetch in the background and is ready to be displayed when active.
    return (
      <div id="weather" style={ !this.props.show ? { visibility: 'hidden' } : {} }>
        <APITable arrayObj={ formattedData } error={ this.state.error } cityName={ this.props?.results[0]?.display_name } tableType='weather' validTable={ this.props?.results.length === 1 } />
        <div id='timeStamp'>
          UPDATED: { this.convertDate(this.state.data.timeStamp) }
        </div>
      </div>
    );
  }
}

export default Weather;