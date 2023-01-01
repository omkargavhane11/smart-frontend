import "./loginMerchant.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/user";
import { useToast } from "@chakra-ui/react";
import { CircularProgress } from "@mui/material";
import { API } from "../../api";

const LoginMerchant = () => {
  const toast = useToast();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPass, setIsPass] = useState(false);

  const handleLogin = async () => {
    const payload = {
      email,
      password,
    };

    if (email === "" || password === "") {
      toast({
        title: "Error.",
        description: "Please fill all fields to login",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      try {
        dispatch(loginStart);
        setLoading(true);
        const { data } = await axios.post(
          `${API}/login/merchant`,
          payload
        );

        if (data.msg === "success") {
          setLoading(false);
          dispatch(loginSuccess(data.user));

          data.user.userType === "Merchant" ? navigate("/store") : navigate("/deliverypartner");

          
        } else {
          dispatch(loginFailure);
          setLoading(false);
          toast({
            title: "Error.",
            description: "Invalid credentials.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleEnter = (e) => {
    const button = document.getElementById("login_btn");
      if (e.key === "Enter") {
          button.click();
      }
  }

  return (
    <div className="login">
      <div className="login_wrapper">
        <h1 className="website-logo" onClick={() => navigate("/")}>
          smartbuy
        </h1>
        <h3 className="login_page_heading">
          Merchant Login
        </h3>
        <div className="input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="someone@example.com"
            onChange={handleEmailChange}
            className="login_input"
            onKeyPress={handleEnter}
          />
        </div>
        <div className="input">
          <label htmlFor="password">Password</label>
          <input
            type={!isPass ? "password" : "text"}
            id="password"
            name="password"
            placeholder="pass@123"
            onChange={handlePasswordChange}
            className="login_input"
            onKeyPress={handleEnter}
          />
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            name="showpassword"
            id="showpassword"
            onChange={(e) => setIsPass(!isPass)}
          />
          <label htmlFor="showpassword" className="checkbox_show">
            Show Password
          </label>
        </div>
        <button
          className="loginBtn"
          onClick={handleLogin}
          disabled={loading}
          id="login_btn"
        >
          {loading === true ? (
            <CircularProgress color="inherit" className="login_loader" />
          ) : (
            "Login"
          )}
        </button>
        <button className="signupBtn" onClick={() => navigate("/register-merchant")}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default LoginMerchant;
