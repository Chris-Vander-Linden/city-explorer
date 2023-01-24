import React from 'react';
import './App.css';

class App extends React.Component {
  // constructor
  constructor (props) {
    super(props);
    // add state
    this.state = [];
  }

  // add instance methods. use arrow functions to maintain "this" context.
  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submit!')
  }


  // render
  render() {
    return (
      <div>
        <header>
          <h1>City Explorer</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
            <button type='submit'>Display Stuff</button>
        </form>
      </div>
    );
  }
}

export default App;