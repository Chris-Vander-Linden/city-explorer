import React from 'react';
import Table from 'react-bootstrap/Table';
import AlertPopup from './AlertPopup.js';

export default function createTable(arrayObj, error) {

  return error ? <AlertPopup heading={ error } /> : !arrayObj.length > 0 ? '' : <Table responsive hover>
    <thead>
      <tr>
        <th>#</th>
        { Object.keys(arrayObj[0] ?? {}).map((title, idx) => <th key={ idx + title }>{ title.toLocaleUpperCase() }</th>) }
      </tr>
    </thead>
    <tbody>{ arrayObj.map((obj, idx) => {
      return (
        <tr key={ idx + obj }>
          <td>{ idx + 1 }</td>
          { Object.values(obj).map((value, idx) => <td key={ idx + value }>{ value }</td>) }
        </tr>)
    }) }
    </tbody>
  </Table>
} 