import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import './RequestForm.css';

const RequestForm = ({ 
    setUsers
    }) => {

    const [usersNumber, setUsersNumber] = useState(1);

    const handleOnSubmit = () => {
        const url = `https://randomuser.me/api/?results=${usersNumber}`;
        fetch(url)
            .then((resp) => resp.json())
            .then(data => {
                setUsers(data.results);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
  
    return (
      <Form className="request-form ">
        <Form.Group className="request-input">
          <Form.Label>Number of users</Form.Label>
          <Form.Control type="number"
           min="1"
           value = { usersNumber }
           onChange={(e)=>setUsersNumber(e.target.value)}/>
        </Form.Group>
        <Button 
        className="request-button"
        variant="primary" 
        onClick={()=>handleOnSubmit()}>
          Request users data
        </Button>
      </Form>
    );
  };
  
  export { RequestForm };