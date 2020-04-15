import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Table, Button, Form, Col } from "react-bootstrap";

import {useUsersController} from "./Users-Controller";

import styles from "./Users.module.css";

function Users() {
  const {
    minAge,
    maxAge,
    address,
    email,
    users,
    setMinAgeHandler,
    setMaxAgeHandler,
    setAddressHandler,
    setEmailHandler,
    handleKeyDown,
    resetFilters,
    getUsers,
    checkEmailIsValid
  } = useUsersController()

  function getEmailValidationIcon(user) {
    return (
      <span className={styles.emailValidIcon}>
        {user.isEmailValid !== undefined &&
          (!!user.isEmailValid ? (
            <FaCheck color={"green"} />
          ) : (
            <FaTimes color={"red"} />
          ))}
      </span>
    )
  }

  return (
    <div className={styles.component}>
      <div className={styles.filter}>
        <Form>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Minimum age</Form.Label>
              <Form.Control
                type={"number"}
                value={minAge}
                onChange={setMinAgeHandler}
                onKeyDown={handleKeyDown}
                placeholder="Enter minimum age" 
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Maximum age</Form.Label>
              <Form.Control
                type={"number"}
                value={maxAge}
                onChange={setMaxAgeHandler}
                onKeyDown={handleKeyDown}
                placeholder="Enter maximum age"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type={"text"}
                value={address}
                onChange={setAddressHandler}
                onKeyDown={handleKeyDown}
                placeholder="Enter address" 
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type={"text"}
                value={email}
                onChange={setEmailHandler}
                onKeyDown={handleKeyDown}
                placeholder="Enter email" 
              />
            </Form.Group>
          </Form.Row>
          <Button variant="warning" type="submit" size="sm" onClick={() => resetFilters()}>
            Reset
          </Button>
          {' '}
          <Button variant="primary" type="submit" size="sm" onClick={() => getUsers()}>
            Filter
          </Button>
        </Form>
      </div>
      <div className={styles.usersSection}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Age</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.address && (`${user.address.road}, ${user.address.city}`)}</td>
              <td>{user.age}</td>
              <td>
                {user.email}
                {getEmailValidationIcon(user)}  
              </td>
              <td>
                <Button variant="success" size="sm"
                  onClick={() => checkEmailIsValid(user.email)}
                  disabled={user.isEmailValid !== undefined}
                >
                  Check email validity
                </Button>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Users;
