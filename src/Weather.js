import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import AlertPopup from './AlertPopup.js';
import './Weather.css'

class Weather extends React.Component {
  constructor (props) {
    super(props);
    // add state
    this.state = {
      forecasts: [],
      error: false
    };
  }

  updateWeather(){

    axios.get(`https://city-explorer-api-jqdk.onrender.com/weather?lon=-122.33207&lat=47.60621`).then(response => {
        // update results and make sure errors is set to false
        this.setState({forecasts: response.data}); 
      }).catch(error => {
        // update error message in state and log
        this.setState({error: error.message}); 
        console.error(error.message);
      });
  }

  createTable(arrayObj){
    return arrayObj?.length < 1 ? <AlertPopup heading={ this.state.error} /> : <Table responsive hover>
      <thead>
        <tr>
          <th>#</th>
            {Object.keys(arrayObj[0] ?? {}).map(title => <th>{title.toLocaleUpperCase()}</th>)}
        </tr>
      </thead>
      <tbody>{arrayObj.map((obj, idx) => { return(
        <tr key={idx}>
          <td>{idx + 1}</td>
          {Object.values(arrayObj[idx] ?? {}).map(value => <td>{value}</td>)}
        </tr>)})}
      </tbody>
    </Table>
  }

  componentDidMount(){
    // call this in this lifecyle method to prevent infinite loop.  
    // If you don't, the updated state will trigger another render.
    this.updateWeather(); 
  }
        
  render() {
    const forecastTable = this.createTable(this.state.forecasts)

    // rather than fetch the data every time the component renders, hide it, so it can fetch in the background and is ready to be displayed when active.
    return <div id="weather" style={ !this.props.show ? {visibility: 'hidden'} : {}}>
      {forecastTable}
    </div>;
  }
}

export default Weather;