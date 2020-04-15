import { useState, useEffect } from "react";

import api from "./../../utils/api";
import { generateAcceptableAge } from "./Users-Utils"

const acceptableAge = generateAcceptableAge()

export function useUsersController() {
  const [users, setUsers] = useState([]);
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(100);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getUsers() {
    if (minAge === "") {
      setMinAge("0");
    }
    if (maxAge === "") {
      setMaxAge("100");
    }
    api
      .get("/users", {
        params: {
          minAge: minAge || "0",
          maxAge: maxAge || "100",
          address: address || "",
          email: email || ""
        }
      })
      .then(res => {
        if (res.status === 200) {
          setUsers(res.data.users);
        } else {
          console.log(res.error);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  function checkEmailIsValid(email) {
    api
      .post("/email", {
        email
      })
      .then(res => {
        if (res.status === 200) {
          const newUsers = users.map(x =>
            x.email === email ? { ...x, isEmailValid: res.data.isValid } : x
          );
          setUsers(newUsers);
        } else {
          console.log(res.error);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  function setMinAgeHandler({ target }) {
    const value = target.value;
    if (
      value === "" ||
      ((value === isNaN(value)) === false &&
        acceptableAge.includes(parseInt(value)))
    ) {
      setMinAge(target.value);
    }
  }

  function setMaxAgeHandler({ target }) {
    const value = target.value;
    if (
      value === "" ||
      ((value === isNaN(value)) === false &&
        acceptableAge.includes(parseInt(value)))
    ) {
      setMaxAge(target.value);
    }
  }

  function setAddressHandler({ target }) {
    setAddress(target.value);
  }

  function setEmailHandler({ target }) {
    setEmail(target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      getUsers();
    }
  }

  function resetFilters() {
    setMinAge("0");
    setMaxAge("100");
  }

  return {
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
  }
}
