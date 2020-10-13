import React, { useState, useEffect} from "react";
import Loader from '../loader';
import "./signup.css";
import {Link} from 'react-router-dom';


const Signup = () => {
  const [user, setUser] = useState({
    userValue: {
      email: "",
      password: "",
    },

    userErrors: {
      email: "",
      password: "",
    },
    userValidility: {
      email: false,
      password: false,
    },
  });

  const [loading, setLoader] = useState(false);

  // states off

  // promises to act as a collecter of user data

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
  }

  const wait = async (milliseconds = 10000) => {
    await sleep(milliseconds);
    setLoader(false)
  }

  // end promise 

  const handleInput = ({ target }) => {
    const newUser = { ...user };
    const { userValue } = newUser;
    userValue[target.name] = target.value;
    setUser(newUser);
    handleValidation(target);
  };

  const handleValidation = ({ name, value }) => {
    const validationErrors = user.userErrors;
    const validility = user.userValidility;
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    validility[name] = value.length > 0;

    if (validility[name]) {
      switch (name) {
        case "email":
          if (!emailTest.test(value)) {
            validationErrors[name] = "email must be a valid email";
          } else {
            validationErrors[name] = "";
          }
          break;
        case "password":
          if (user.userValue.password.length < 5) {
            validationErrors[name] =
              "password fields must be greater than 5 characters";
          } else {
            validationErrors[name] = "";
          }
          break;
        default:
          break;
      }
    } else {
      validationErrors[name] = "";
      setLoader(false)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { ...user };
    const validationErrors = { ...user.userErrors };
    let validility = user.userValidility;
    const { userValidility } = user;

    if (Object.values(userValidility).every(Boolean)) {
      setLoader(true)
    } else {
      if (!validility["email"]) {
        validationErrors["email"] = "field must be filled";
      }
      if (!validility["password"]) {
        validationErrors["password"] = "field must be filled";
      }
      newUser.userErrors = validationErrors;
    }
    e.target.reset();

    validility = {
      email:false,
      password:false,
    }
    newUser.userValidility = validility;
    setUser(newUser);

  };

  if(handleSubmit) {
    if(loading) return <Loader />;
    wait();
  }

  return (
    <div className="signup__form">
      <h1>singup</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="enter your email"
            onChange={handleInput}
          ></input>
          {user.userErrors.email ? (
            <div className="form__error">{user.userErrors.email}</div>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="enter your password"
            onChange={handleInput}
          ></input>
          {user.userErrors.password ? (
            <div className="form__error">{user.userErrors.password}</div>
          ) : (
            ""
          )}
        </div>
        <button className="btn">signup</button>
      </form>
      <div className="signup-links">
        <Link exact to ='/login'>already have an account?</Link>
      </div>
    </div>
  );
};

export default Signup;
