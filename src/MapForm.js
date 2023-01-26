import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './MapForm.css';

class MapForm extends React.Component {
 
  render() {
    // create list of results.
    const resultList = this.props.results.map(result => <option key={ result.place_id
    }>{ result.display_name }</option>);

    return <>
        <div id="formContainer">
        { this.props.results.length === 1 && <div id="resultsContainer">
          Name: { this.props.results[0]?.display_name }
          { ` (Latitude:  ${this.props?.results[0]?.lat}, Longitude: ${ this.props?.results[0]?.lon })`} </div> }
        <Form onSubmit={ this.props.onHandleSubmit}>

            {/* search for city by zip or name */}
            {this.props.results.length === 0 && <Form.Group className="mb-3" controlId="formSearchCity">
              <Form.Label>City: </Form.Label>
              <Form.Control type="text" placeholder="Type city or zip code..." name='city' value={this.props.city} onChange={this.props.onHandleFormChange}/>
            </Form.Group>}

            {/* if more than 1 city, then create select to narrow result to just 1 */}
            {this.props.results.length > 1 && <Form.Group className="mb-3" controlId="formSelectCity">
            <Form.Label>Which City? </Form.Label>
            <Form.Select aria-label="Select City" value={ this.props.city } onChange={ this.props.onHandleFormChange}>
                <option key="-">Select city from dropdown...</option>
                {resultList}
              </Form.Select>
            </Form.Group>}

            {/* change button text based on condition of form */}
            <Button variant="primary" type="submit">{this.props.results.length === 1 ? 'Search Again?' : this.props.results.length === 0 ? 'Explore!' : 'Select City'}</Button>
          </Form>
        </div>
    </>
  };
};

export default MapForm;