import React, { useState } from 'react';
import { Table } from "react-bootstrap";
import { ModalWindow } from "../ModalWindow"
import './ContentTable.css';

const ContentTable = ({
  rows,
  columnsState,
  rowsState,
  setRowsState
}) => {

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const openModalWindow = (e) => {
    setShowModal(true);
    setSelectedUser(rows[e.target.closest("tr").id])
  }

  const sortTable = (e, column) => {
    if (e.target.classList.contains("down")) {
      setRowsState([...rowsState].sort((a, b) => a[column] < b[column] ? 1 : -1));
    } else {
      setRowsState([...rowsState].sort((a, b) => a[column] > b[column] ? 1 : -1));
    }
  }

  return (
    <div className='table-wrapper'>
      <ModalWindow 
        showModal={showModal} 
        setShowModal={setShowModal}
        user={selectedUser}
      />
      <h2 className='table-header'>Users data</h2>
      <div className="table-container">
        <Table className='content-table' striped bordered hover>
          <thead>
            <tr>
            {columnsState.map((column) => {
                return <th className='table-title' key={column.dataField}>
                    {column.dataField}
                    <i className='up' onClick={(e)=>sortTable(e, column.dataField)}/>
                    <i className='down' onClick={(e)=>sortTable(e, column.dataField)}/>
                </th>
            })}
            </tr>
          </thead>
          <tbody>
          {rowsState.map((row, i) => {         
            return <tr
            key={i}
            className="table-row"
            onClick={(e)=>openModalWindow(e)} 
            id={i}>
              {Object.keys(row).map((el) => {
                return <td key={el} className='table-cell'>
                { row[el] ? row[el] : "0"}
              </td>
              })}
            </tr>
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export { ContentTable };