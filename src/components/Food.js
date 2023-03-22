import React from 'react';
import axios from 'axios';
import APITable from './APITable.js';
import './Food.css';
import { config } from '../Constants.js'

class Food extends React.Component {

  constructor (props) {
    super(props);
    // add state
    this.state = {
      data: [],
      error: false,
      timeStamp: null
    };
  }

  updateData() {
    this.props?.results[0]?.lat && axios.get(`${config.url.API_URL}/yelp?lat=${this.props.results[0].lat}&lon=${this.props.results[0].lon}`).then(response => {
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

  convertDate(dateObj) {
    const date = new Date(dateObj)
    return date.toLocaleTimeString('en-US') + ', ' + date.toLocaleString("default", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  componentDidUpdate(prevProps, prevState) {
    // THE ONLY TIME YOU WANT TO CALL THE API IS WHEN THERE IS A CITY UPDATE!!!
    this.props.callAPIs && !prevProps.callAPIs && this.updateData();
  }

  render() {
    const formattedData = this.state.data.data?.map(obj => {

      obj = { name: obj.name, ...obj, image: <><img src={ obj.image } alt={ obj.name } /> </>, hours: <div className={ `hours ${obj.hours}` }>{ obj.hours }</div>, url: <div className='yelpLinkContainer'><a href={ obj.url } target='_blank' rel='noreferrer'>Yelp Review</a></div> };

      return obj;
    });

    return (
      <div id="food" style={ !this.props.show ? { visibility: 'hidden' } : {} }>
        <APITable arrayObj={ formattedData } error={ this.state.error } removeColumns={ [] } keyProp={ 'distance' } cityName={ this.props?.results[0]?.display_name } tableType='food' validTable={ this.props?.results.length === 1 } />
        <div id='timeStamp'>
          UPDATED: { this.state.data.timeStamp ? this.convertDate(this.state.data.timeStamp) : '-' }
        </div>
      </div>);
  }
}

export default Food;