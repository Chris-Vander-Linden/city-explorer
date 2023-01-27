import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './MapForm.css';

class MapForm extends React.Component {
  constructor (props) {
    super(props);
    this.myRef = React.createRef();
  }

  // send form ref to App.js, so I can later check for height changes.
  componentDidMount() {
    this.props.onSetFormHeight(this.myRef);
  }

  render() {
    // create list of results.
    const resultList = this.props.results.map(result => <option key={ result.place_id
    }>{ result.display_name }</option>);

    return <>
      <div id="formContainer" ref={ this.myRef }>
        { this.props.results.length === 1 && <div id="resultsContainer">
          <span>{ `Name: ${this.props.results[0]?.display_name}` }</span><br />{ `(Latitude:  ${this.props?.results[0]?.lat}, Longitude: ${this.props?.results[0]?.lon})` } </div> }
        <Form onSubmit={ this.props.onHandleSubmit }>

          {/* search for city by zip or name */ }
          { this.props.results.length === 0 && <Form.Group className="mb-3" controlId="formSearchCity">
            <Form.Label>City: </Form.Label>
            <Form.Control isInvalid={ this.props.error } isValid={ this.props.city !== '' && !this.props.city.includes('...') && !this.props.error && this.props.city } type="text" placeholder={ !this.props.error ? "Type a location..." : `${this.props.error}!  Try again.` } name='city' value={ this.props.city} onChange={ this.props.onHandleFormChange } />
          </Form.Group> }

          {/* if more than 1 city, then create select to narrow result to just 1 */ }
          { this.props.results.length > 1 && <Form.Group className="mb-3" controlId="formSelectCity">
            <Form.Label>Which City? </Form.Label>
            <Form.Select aria-label="Select City" name='city' value={ this.props.city } onChange={ this.props.onHandleFormChange } isInvalid={ this.props.city.includes('...') } isValid={ !this.props.error && !this.props.preventMapSearch }>
              <option key="-">Select city from dropdown...</option>
              { resultList }
            </Form.Select>
          </Form.Group> }

          {/* change button text based on condition of form */ }
          <Button disabled={ this.props.preventMapSearch && this.props.results.length !== 1 ? true : false } type="submit">{ this.props.results.length === 1 ? 'Search Again?' : this.props.results.length === 0 ? 'Explore!' : (this.props.preventMapSearch && this.props.results.length !== 1 ? true : false) ? 'Select city from the list above.' : 'Explore!' }</Button>
        </Form>
      </div>
    </>
  };
};

export default MapForm;