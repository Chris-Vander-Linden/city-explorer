import React from 'react';
import axios from 'axios';
import APITable from './APITable.js';
import './Food.css'

class Food extends React.Component {

  constructor (props) {
    super(props);
    // add state
    this.state = {
      data: [],
      error: false
    };
  }

  updateData() {
    //http://localhost:3003/yelp
    //https://city-explorer-api-jqdk.onrender.com/yelp
    this.props?.results[0]?.lat && axios.get(`http://localhost:3003/yelp?lat=${this.props.results[0].lat}&lon=${this.props.results[0].lon}`).then(response => {
      // update results and make sure errors is set to false
      this.setState({
        data: response.data.data,
        timeStamp: response.data.timeStamp
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
    // display this somewhere.
    console.log(this.convertDate(this.state.timeStamp));

    const formattedData = this.state.data.map(obj => {

      obj = { name: obj.name, ...obj, image: <><img src={ obj.image } alt={ obj.name } /> </>, hours: <div className={ `hours ${obj.hours}` }>{ obj.hours }</div>, url: <div className='yelpLinkContainer'><a href={ obj.url } target='_blank' rel='noreferrer'>Yelp Review</a></div> };

      return obj;
    });

    return (
      <div id="food" style={ !this.props.show ? { visibility: 'hidden' } : {} }>
        <APITable arrayObj={ formattedData } error={ this.state.error } removeColumns={ [] } keyProp={ 'distance' } cityName={ this.props?.results[0]?.display_name } tableType='food' validTable={ this.props?.results.length === 1 } />
      </div>);
  }
}

export default Food;