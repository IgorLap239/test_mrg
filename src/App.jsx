import React, { useState, useEffect } from 'react';
import { ContentTable } from './components/ContentTable';
import { RequestForm } from './components/RequestForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  
  useEffect(()=> {
    if (users[0]) {
      setColumns(createColumns(users[0]))
      users.forEach((user) => {
        createRows(user);
      })
    }
  }, [users])

  const createRows = (obj) => {
    let newObj = {}
    let tmpRow = "";
    getProp(obj);
    setRows(rows => [...rows, newObj])

    function getProp (o) {
      for(let prop in o) {
        if(typeof(o[prop]) === 'object' && o[prop]) {
          tmpRow = prop;
          getProp(o[prop]);
        } else {
          if (tmpRow) {
            newObj[`${tmpRow}.${prop}`] = o[prop];
          } else {
            newObj[prop] = o[prop];
          }
        }
      }
    }
  }

  const createColumns = (obj) => {
    const columnArray = [];
    let tmpColumn = "";
    getProp(obj);
    return columnArray;

    function getProp (o) {
      for(let prop in o) {
        if(typeof(o[prop]) === 'object' && o[prop]) {
          tmpColumn = prop;
          getProp(o[prop]);
        } else {
          let newObj = {}
          if (tmpColumn) {
            newObj.dataField = `${tmpColumn}.${prop}`;
          } else {
            newObj.dataField = prop;
          }
          newObj.text = prop;     
          columnArray.push(newObj)
        }
      }
    }
  }

  return (
    <div className="app">
      <RequestForm
        users={users}
        setUsers={setUsers}
      />
      {columns && <ContentTable
        columns={columns}
        rows={rows}
      />}
    </div>
  );
}

export { App };
