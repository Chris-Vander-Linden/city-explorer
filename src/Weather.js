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
      error: false,
      lon: 0
    };
  }

  updateWeather() {
    // `https://city-explorer-api-jqdk.onrender.com/weather?lon=-122.33207&lat=47.60621`

    //http://localhost:3003/weatherAPI?lat=35.775&lon=-78.638

    // http://localhost:3003/weatherAPI?lat=${this.props.results[0].lat}&lon=${this.props.results[0].lon}
    console.log(this.props?.results[0]?.lon);
    this.props?.results[0]?.lat && axios.get(`http://localhost:3003/weatherAPI?lat=35.775&lon=-78.638`).then(response => {
      // update results and make sure errors is set to false
      this.setState({
        forecasts: response.data,
        lon: this.props?.results[0]?.lon
      });

      // test response
      console.log(response.data);
    }).catch(error => {
      // update error message in state and log
      this.setState({ error: error.message });
      console.error(error.message);
    });
  }

  createTable(arrayObj) {
    return this.props.results.length !== 1 ? "Please use the searchbar..." : this.state.error ? <AlertPopup heading={ this.state.error } /> : <Table responsive hover>
      <thead>
        <tr>
          <th>#</th>
          { Object.keys(arrayObj[0] ?? {}).map(title => <th>{ title.toLocaleUpperCase() }</th>) }
        </tr>
      </thead>
      <tbody>{ arrayObj.map((obj, idx) => {
        return (
          <tr key={ idx }>
            <td>{ idx + 1 }</td>
            { Object.values(arrayObj[idx] ?? {}).map(value => <td>{ value }</td>) }
          </tr>)
      }) }
      </tbody>
    </Table>
  }

  componentDidUpdate() {
    if (this.props?.results[0]?.lon !== this.state.lon && this.props?.results?.length === 1) {
      this.setState({ lon: this.props?.results[0]?.lon });
      this.updateWeather();
    }
  }

  render() {

    // const forecastTable = this.createTable(this.state.forecasts)

    // rather than fetch the data every time the component renders, hide it, so it can fetch in the background and is ready to be displayed when active.
    return <div id="weather" style={ !this.props.show ? { visibility: 'hidden' } : {} }>
      {/* forecastTable */}
    </div>;
  }
}

export default Weather;