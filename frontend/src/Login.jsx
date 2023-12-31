import "./css/LoginAndSignUp.css";
import logo from "./assets/TryShirt_logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Validation from "./LoginValidation";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Navigate after submit
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    axios
      .post("http://localhost:5000/login", values)
      .then((res) => {
        if (res.data === "Login successful") {
          navigate("/tshirts");
        } else {
          setErrors({
            ...errors,
            password: "Email or password is incorrect",
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleInput = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.id]: event.target.value,
    }));
  };

  return (
    <>
      <section className="sign-in">
        <article className="sign-in__details">
          <h1 className="text-2xl font-bold">Welcome to TryShirt System</h1>
          <p>Login to your account</p>
          <form action="" className="sign-in__form" onSubmit={handleSubmit}>
            <div className="form__control">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={values.email}
                onChange={handleInput}
              />
              {errors.email && (
                <p className="text-red-500 flex items-center">
                  <span className="text-lg material-symbols-sharp">error</span>
                  {errors.email}
                </p>
              )}
            </div>
            <div className="form__control">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleInput}
              />
              {errors.password && (
                <p className="text-red-500 flex items-center">
                  <span className="text-lg material-symbols-sharp">
                    {" "}
                    error{" "}
                  </span>
                  {errors.password}
                </p>
              )}
            </div>
            <div className="sign-in__extras">
              {/* <div>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Keep me signed in</label>
              </div> */}
              {/* <Link to="/forgot-password">Forgot password?</Link> */}
            </div>
            <button className="btn primary mb-5" type="submit">
              Login
            </button>
          </form>
          <small className="next__page">
            Dont have an account? <Link to="/signup">Sign up</Link>
          </small>
        </article>
        <article className="sign-in__logo">
          <div>
            <img src={logo} alt="ReVendo Logo" />
          </div>
        </article>
      </section>
    </>
  );
}

export default Login;
