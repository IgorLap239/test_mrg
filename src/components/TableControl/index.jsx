import React, { useEffect, useState } from 'react';
import { Form } from "react-bootstrap";
import './TableControl.css';

const TableControl = ({
  rows, columns, setColumnsState, setRowsState
}) => {
  const [menuState, setMenuState] = useState(columns)
  const [filters, setFilters] = useState([]);

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

  useEffect(()=> {
    setColumnsState(columns)
    setMenuState(columns)
  }, [columns])

  useEffect(()=> {
    setRowsState(rows)
  }, [rows])

  return (
    <div className='table-control'>
      <h2 className='table-control-title'>Select user attributes to display</h2>
      <div className='checkboxes-list'>
        {menuState.map((atribute, i) => {
          return <div key={i}>
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
    </div>
  );
};

export { TableControl };