import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import Loader from '../loader'
import {Link} from 'react-router-dom';


const Login = () => {

  const { register, handleSubmit, errors } = useForm();

  // just a way to make preloaders work without a live server and an Api using promises
  
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
  }

  const [loading, setLoader ] = useState(false);

  const wait = async (milliseconds = 3000) => {
    await sleep(milliseconds);
    setLoader(false)
  }

  function onSubmit(data, e) {
    console.log(data);
    e.target.reset();
    setLoader(true)
    return true;
  }

  if(onSubmit){
    if(loading) return <Loader />;
    wait();
  }

  // just a way to make preloaders work without a live server and an Api using promises

  const handleEmail = (value) => {
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (emailTest.test(value)) return true;

    return false;
  };

  return (
    <div className="signup__form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="enter your email"
            ref={register({
              required: true,
              validate: handleEmail,
              minLength: 3,
            })}
          ></input>
          {errors.email && errors.email.type === "minLength" && (
            <div className="form__error">field must not be short</div>
          )}
          {errors.email && (
            <div className="form__error">field must be valid</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="enter your password"
            ref={register({ minLength: 4 })}
          ></input>
          {errors.password && (
            <div className="form__error">field must be long</div>
          )}
        </div>
        <button>Login</button>
      </form>
      <div className="signup-links">
        <Link exact='true' to='/signup'>create new Account?</Link>
      </div>
    </div>
  );
};

export default Login;
