import React from 'react';
import axios from 'axios';
import APITable from './APITable.js';
import { TbMovieOff } from "react-icons/tb";
import './Movies.css'

class Movies extends React.Component {
  constructor (props) {
    super(props);
    // add state
    this.state = {
      data: [],
      error: false
    };
  }

  updateData() {
    const cityName = this.props?.results[0]?.display_name?.match(/^[\w\s-]+\b/)[0];
    //http://localhost:3003/movieAPI
    //https://city-explorer-api-jqdk.onrender.com/movieAPI
    this.props?.results[0]?.lat && axios.get(`http://localhost:3003/movieAPI?cityName=${cityName}}`).then(response => {
      // update results and make sure errors is set to false
      this.setState({
        data: response.data
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
    const formattedData = this.state.data.map(obj => {
      obj = { ...obj, cover: <>{!obj.cover.includes('null') ? <img src={ obj.cover } alt={ obj.title } /> : <TbMovieOff /> }</> };

      return obj;
    });

    // rather than fetch the data every time the component renders, hide it, so it can fetch in the background and is ready to be displayed when active.
    // pass in an array of column #s that need to be deleted from table.  I might use this data later for a modal, so I still need it.
    return <div id="movies" style={ !this.props.show ? { visibility: 'hidden' } : {} }>
      <APITable arrayObj={ formattedData } error={ this.state.error } removeColumns={ [0, 3, 4] } />
    </div>;
  }
}

export default Movies;