import React from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = process.env.REACT_APP_LOCATION_KEY;

class App extends React.Component {
  // constructor
  constructor (props) {
    super(props);
    // add state
    this.state = {results: []};
  }

  // add instance methods. use arrow functions to maintain "this" context.
  handleSubmit = (event) => {
    event.preventDefault();

    axios.get('https://swapi.dev/api/people/?page=1').then(response => {
      console.log(response.data.results);
      this.setState({results: response.data.results}) 
      });
  }

  // render
  render() {
    // create list of results
    const resultList = this.state.results.map((result, indx) => <li key={indx}>{result.name}</li>)

    return (
      <div>
        <header>
          <h1>City Explorer</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
            <button type='submit'>Display Stuff</button>
        </form>
        <ul>{resultList}</ul>
      </div>
    );
  }
}

export default App;