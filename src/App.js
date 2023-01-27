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
      error: false,
      preventMapSearch: true,
      mapFormElem: null,
      mapFormElemHeight: null
    };
  }

  // set map form element ref, so I can check for height changes
  setFormElem = (elem) => {
    this.setState({mapFormElem: elem})
  }

  refreshMapFormHeight = () => {
    // compare old height in state with present ref height
    if (this.state?.mapFormElem?.current?.clientHeight !== this.state?.mapFormElemHeight) {
      this.setState({mapFormElemHeight: this.state?.mapFormElem?.current?.clientHeight})
    }
  }

  handleFormChange = (event) => {
    // if the search value contains '...', then the placeholder is still selected.
    let preventMapSearch = event.target.value.includes('...') || event.target.value === '';

    this.setState({city: event.target.value,
      error: false,
      preventMapSearch}) ;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // if there is already a result, then the form resets on submit
    this.state.results.length === 1 ? this.setState({results: [], city: ''}) : 
    
    // else if filter for city
    this.state.results.length > 1 ? this.setState({results: this.state.results.filter(result => result.display_name === this.state.city)}) :

    // else fetch data from API
    axios.get(`https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.city}&format=json`).then(response => {
        // update results and make sure errors is set to false
        this.setState({results: response.data,
                      error: false, 
                      preventMapSearch: true}); 
      }).catch(error => {
        // update error message in state and log
        this.setState({error: error.message, 
                      preventMapSearch: true,
                      city: ''
                    }); 
        console.error(error.message);
      });
  }

  componentDidUpdate () {
    this.refreshMapFormHeight();
  }

  componentDidMount ()  {
    // potentially update mapFormHeight state on resize.
    window.addEventListener("resize",this.refreshMapFormHeight);
  }

  render() {
    return (
      <div id='container'>
        <Header />
        <MapForm results={this.state.results} error={this.state.error} city={this.state.city} onHandleFormChange={this.handleFormChange} onHandleSubmit={this.handleSubmit} preventMapSearch={this.state.preventMapSearch} onSetFormHeight={this.setFormElem}/>
        <Map results={this.state.results} mapFormElemHeight={this.state.mapFormElemHeight}/>
        <footer>&copy; Chris Vander Linden {new Date().getFullYear()}</footer>
      </div>
    );
  }
}

export default App;