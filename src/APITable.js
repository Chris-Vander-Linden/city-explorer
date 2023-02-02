import React from 'react';
import Table from 'react-bootstrap/Table';
import AlertPopup from './AlertPopup.js';
import './APITable.css'
;
class APITable extends React.Component {

  render(){

  return this.props.error ? <AlertPopup heading={ this.props.error } /> : !this.props.arrayObj.length > 0 ? '' : <div className='tableContainer'><Table responsive hover striped>
    <thead>
      <tr>
        <th>#</th>
        { Object.keys(this.props.arrayObj[0] ?? {}).map((title, idx) => <th key={ idx + title }>{ title.toLocaleUpperCase() }</th>) }
      </tr>
    </thead>
    <tbody>{ this.props.arrayObj.map((obj, idx) => {
      return (
        <tr key={ idx + obj }>
          <td>{ idx + 1 }</td>
          { Object.values(obj).map((value, idx) => <td key={ idx + value }>{ value }</td>) }
        </tr>)
    }) }
    </tbody>
  </Table>
  </div>
  };
}

export default APITable;