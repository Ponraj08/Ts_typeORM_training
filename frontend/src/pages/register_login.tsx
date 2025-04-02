import { FormEvent, useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("login");
  const [nameReg, setNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [errormessage, setErrormessage] = useState("");

  const register = async (e: FormEvent) => {
    try {
      e.preventDefault();
      console.log(nameReg, emailReg, passwordReg);
      const response = axios.post("http://localhost:5002/user", {
        name: nameReg,
        email: emailReg,
        password: passwordReg,
        role: "user",
      });
      console.log(response);
      setAction("login");
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (e: FormEvent) => {
    console.log("inside the login");

    try {
      e.preventDefault();
      console.log(nameReg, emailReg, passwordReg);
      const response = await axios.post("http://localhost:5002/user/login", {
        name: nameReg,
        password: passwordReg,
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("jwtToken", token);
        const getToken = localStorage.getItem("jwtToken");
        console.log("token from login ", getToken);

        if (token) {
          navigate("/Home");
        }
      }
    } catch (err) {
      console.log(err);
      setErrormessage("password/name not matches");
    }
  };

  return (
    <>
      <div className="login-cointner">
        <form className="login-continer-form" method="post">
          <center>
            <h1>{action}</h1>
          </center>
          <div className="login-continer-form-inputfields">
            <input
              type="text"
              placeholder="name"
              required
              onChange={(e) => {
                setNameReg(e.target.value);
              }}
            />
          </div>

          <div className="login-continer-form-inputfields">
            {action === "login" ? (
              <div> </div>
            ) : (
              <input
                type="email"
                placeholder="name@example.com"
                required
                onChange={(e) => {
                  setEmailReg(e.target.value);
                }}
              />
            )}
          </div>

          <div className="login-continer-form-inputfields">
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => {
                setPasswordReg(e.target.value);
              }}
            />
          </div>

          {action === "Register" ? (
            <>
              {" "}
              <button
                type="submit"
                className="login-continer-form-button"
                onClick={(e) => {
                  register(e);
                }}
              >
                register
              </button>
              <p className="login-continer-form-paragraph">
                I already have a account{" "}
                <a
                  className="login-continer-form-paragraph-link"
                  onClick={() => {
                    setAction("login");
                  }}
                >
                  login
                </a>
              </p>
            </>
          ) : (
            <>
              <button
                type="submit"
                className="login-continer-form-button"
                onClick={(e) => {
                  login(e);
                }}
              >
                Login
              </button>
              <p className="login-continer-form-paragraph">
                I already have a account{" "}
                <a
                  className="login-continer-form-paragraph-link"
                  onClick={() => {
                    setAction("Register");
                  }}
                >
                  Register
                </a>
              </p>
            </>
          )}

          {errormessage && <p>{errormessage}</p>}
        </form>
      </div>
    </>
  );
};

export default Register;
