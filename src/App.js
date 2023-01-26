import React from 'react';
import axios from 'axios';
import Header from './Header.js';
import Map from './Map.js';
import MapForm from './MapForm.js';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    return (
      <div id='container'>
        <Header />
        <MapForm results={this.state.results} onHandleFormChange={this.handleFormChange} onHandleSubmit={this.handleSubmit}/>
        <Map results={this.state.results}/>
        <footer>&copy; Chris Vander Linden {new Date().getFullYear()}</footer>
      </div>
    );
  }
}

export default App;