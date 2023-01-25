import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './App.css';

const API_KEY = process.env.REACT_APP_LOCATION_KEY;

class App extends React.Component {
  // constructor
  constructor (props) {
    super(props);
    // add state
    this.state = {
      city: '',
      results: [],
      error: false
    };
  }

  handleFormChange = (event) => {
    this.setState({city: event.target.value}) 
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // if there is already a result, then the form resets on submit
    this.state.results.length === 1 ? this.setState({results: [], city: ''}) : 
    
    // else if filter for city
    this.state.results.length > 1 ? this.setState({results: this.state.results.filter(result => result.display_name === this.state.city)}) :

    // else fetch data from API
    axios.get(`https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.city}&format=json`).then(response => {
      console.log(response.data);
      this.setState({results: response.data}); 
      }).catch(error => {
        console.log('city error')
        console.error(error);
      });
  }

  render() {
    // create list of results.
    const resultList = this.state.results.map(result => <option key={result.place_id
}>{result.display_name}</option>);

    return (
      <div id='container'>
        <header>
          <h1>City Explorer</h1>
        </header>
      <br />
    <Form onSubmit={this.handleSubmit}>

      {/* search for city by zip or name */}
      {this.state.results.length === 0 && <Form.Group className="mb-3" controlId="formSearchCity">
        <Form.Label>City: </Form.Label>
        <Form.Control type="text" placeholder="Type city or zip code..." name='city' value={this.state.city} onChange={this.handleFormChange}/>
      </Form.Group>}

      {/* if more than 1 city, then create select to narrow result to just 1 */}
      {this.state.results.length > 1 && <Form.Group className="mb-3" controlId="formSelectCity">
        <Form.Label>Which City? </Form.Label>
        <Form.Select aria-label="Select City" value={this.state.city} onChange={this.handleFormChange}>
          <option key="-">Select City...</option>
          {resultList}
        </Form.Select>
      </Form.Group>}

      {/* change button text based on condition of form */}
      <Button variant="primary" type="submit">{this.state.results.length === 1 ? 'Search Again?' : this.state.results.length === 0 ? 'Explore!' : 'Search Cities.'}</Button>

    </Form>

      {/* display single city result */}
      {this.state.results.length === 1 && <><h2>Results:</h2>
      Name: {this.state.results[0]?.display_name} <br />
      Lat: {this.state.results[0]?.lat}<br />
      Lon: {this.state.results[0]?.lon}<br /></>}

      {/* display map */}
      {this.state.results.length === 1 && <img src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${this.state.results[0]?.lat},${this.state.results[0]?.lon}&zoom= 1-18`} alt={this.state.results[0]?.display_name} />}


      </div>
    );
  }
}

export default App;