import React from 'react';
import Table from 'react-bootstrap/Table';
import AlertPopup from './AlertPopup.js';
import './APITable.css'
  ;
class APITable extends React.Component {

  render() {

    return <div className='tableContainer'> { this.props.error ? <AlertPopup heading={ this.props.error } /> : !this.props.arrayObj.length > 0 ? <span>Please search for a city in the searchbar above...</span> : <Table responsive hover striped>
      <thead>
        <tr>
          <th>#</th>
          { Object.keys(this.props.arrayObj[0] ?? {}).map((title, idx) => <th key={ idx + title }>{ title.toLocaleUpperCase().replace('_',' ') }</th>) }
        </tr>
      </thead>
      <tbody>{ this.props.arrayObj.map((obj, idx) => {
        return (
          <tr key={ idx + 'tr' }>
            <td>{ idx + 1 }</td>
            { Object.values(obj).map((value, idx) => <td key={ idx + value }>{ value }</td>) }
          </tr>)
      }) }
      </tbody>
    </Table>
    } </div>;
  }
}

export default APITable;