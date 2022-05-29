import React, { useEffect, useState } from 'react';
import {Table, Form} from "react-bootstrap";
import {ModalWindow} from "../ModalWindow"
import './ContentTable.css';

const ContentTable = ({
  columns, rows
}) => {

  const [columnsState, setColumnsState] = useState(columns);
  const [menuState, setMenuState] = useState(columns)
  const [rowsState, setRowsState] = useState(rows);
  const [filters, setFilters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    const filteredRows = JSON.parse(JSON.stringify(rows));
    const filteredColumns = JSON.parse(JSON.stringify(columns));;
    if (filters.length > 0) {
      let filtered = filteredColumns.filter((el) => filters.indexOf(el.dataField) === -1);
      setColumnsState(filtered);
      let newRows = filteredRows.map(function (el) {
        Object.keys(el).forEach((k) => {
          if (filters.indexOf(k) !== -1) {
            delete el[k];
          }
        })
        return el;
      });
      setRowsState(newRows);
    } else {
      setRowsState(rows)
      setColumnsState(columns);
    }
  }, [filters])

  const changeSearchValue = (e, column) => {
    const target = e.target;
    if (!target.checked) {
      if (filters.length > 0) {
        setFilters(filters => [...filters, column])
      } else {
        setFilters([column])
      }    
    } else {
      if (filters.indexOf(column) !== -1) {
        setFilters(filters.filter((_, i) => i !== filters.indexOf(column)))
      }
    }
  }

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

  useEffect(()=> {
    setColumnsState(columns)
    setMenuState(columns)
  }, [columns])

  useEffect(()=> {
    setRowsState(rows)
  }, [rows])

  return (
    <div className='table-wrapper'>
      <ModalWindow 
        showModal={showModal} 
        setShowModal={setShowModal}
        user={selectedUser}
      />
      <div className='table-control'>
        {menuState.map((atribute) => {
            return <div className='checkboxes-list' key={atribute}>
            <Form.Check>
                <Form.Check.Input 
                  type="checkbox" 
                  onChange={(e)=>changeSearchValue(e, atribute.dataField)}
                  defaultChecked
                  />
                <Form.Check.Label>{atribute.dataField}</Form.Check.Label>
            </Form.Check>
            </div>
        })}
      </div>
      <Table className='content-table' striped bordered hover>
        <thead>
          <tr>
          {columnsState.map((column) => {
              return <th className='table-title'>
                  {column.dataField}
                  <i className='up' onClick={(e)=>sortTable(e, column.dataField)}/>
                  <i className='dowm' onClick={(e)=>sortTable(e, column.dataField)}/>
              </th>
          })}
          </tr>
        </thead>
        <tbody>
        {rowsState.map((row, i) => {         
          return <tr 
          className="table-row"
          onClick={(e)=>openModalWindow(e)} 
          id={i}>
            {Object.keys(row).map((el) => {
              return <td className='table-cell'>
              { row[el] ? row[el] : "0"}
            </td>
            })}
          </tr>
          })}
        </tbody>
      </Table>
    </div>
  );
};

export { ContentTable };