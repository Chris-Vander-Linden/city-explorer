import React from 'react';
import Table from 'react-bootstrap/Table';
import AlertPopup from './AlertPopup.js';
import './APITable.css'
  ;
class APITable extends React.Component {
  render() {

    // this.props.arrayObj -> the object used to populate the table.
    // this.props.error -> the error object used for the popup alert.
    // this.props.removeColumns -> the array containing the columns to be removed from table.

    return (
      <div className='tableContainer'> { this.props.error ? <AlertPopup heading={ this.props.error } /> : !this.props.arrayObj.length > 0 ? <span>Please search for a city in the searchbar above...</span> : <Table responsive hover striped>
        <thead>
          <tr>
            { Object.keys(this.props.arrayObj[0]).filter((_th, idx) => {

              let validTH = true;

              for (let i = 0; i < this.props.removeColumns?.length; i++) {
                if (idx === this.props.removeColumns[i]) {
                  validTH = false;
                  break;
                }
              }

              return validTH;
            }).map((title, idx) => <th key={ idx + title }>{ title.toLocaleUpperCase().replace('_', ' ') }</th>) }
          </tr>
        </thead>
        <tbody>{ this.props.arrayObj.map((obj, idx) => {
          return (
            <tr key={ idx + 'tr' }>
              { Object.values(obj).filter((_td, idx) => {

                let validTD = true;

                for (let i = 0; i < this.props.removeColumns?.length; i++) {
                  if (idx === this.props.removeColumns[i]) {
                    validTD = false;
                    break;
                  }
                }

                return validTD;
              }).map((value, idx) => <td key={ idx + value }>{ value }</td>) }
            </tr>)
        }) }
        </tbody>
      </Table> }
      </div>
    );
  }
}


export default APITable;