import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { GoAlert } from 'react-icons/go';
import './AlertPopup.css'

class AlertPopup extends React.Component {
  constructor (props) {
    super(props);
    this.state = { show: true }
  }

  render() {
    return <Alert variant="danger" onClick={ () => this.setState({ show: false }) } style={ !this.state.show ? { display: 'none' } : {} } dismissible>
      <Alert.Heading id='alertMessage'><GoAlert /> { this.props.heading }!</Alert.Heading>
      <hr />
      <p className="mb-0">
        { this.props.content ? this.props.content : 'Please try again...' }
      </p>
    </Alert>
  }
}

export default AlertPopup;