import "./signup.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { CircularProgress } from "@mui/material";

const Signup = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");

  const [loading, setLoading] = useState(false);
  const [isPass, setIsPass] = useState(false);

  const handleSignup = async () => {
    const payload = {
      name,
      email,
      password,
      address,
      contactNo,
    };

    if (
      email === "" ||
      password === "" ||
      address === "" ||
      name === "" ||
      contactNo === ""
    ) {
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
        setLoading(true);
        const { data } = await axios.post(
          "http://localhost:8080/user/register",
          payload
        );

        if (data.msg === "success") {
          setLoading(false);
          navigate("/login");
        } else {
          setLoading(false);
          toast({
            title: "Error.",
            description: "Failed to sign up.",
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

  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="someone@example.com"
            onChange={(e) => setName(e.target.value)}
            className="login_input"
          />
        </div>
        <div className="input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="someone@example.com"
            onChange={(e) => setEmail(e.target.value)}
            className="login_input"
          />
        </div>
        <div className="input">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="101, South block, Washington DC "
            onChange={(e) => setAddress(e.target.value)}
            className="login_input"
          />
        </div>
        <div className="input">
          <label htmlFor="contactNo">Contact No</label>
          <input
            type="number"
            id="contactNo"
            name="contactNo"
            placeholder="someone@example.com"
            onChange={(e) => setContactNo(e.target.value)}
            className="login_input"
          />
        </div>
        <div className="input">
          <label htmlFor="password">Password</label>
          <input
            type={!isPass ? "password" : "text"}
            id="password"
            name="password"
            placeholder="pass@123"
            onChange={(e) => setPassword(e.target.value)}
            className="login_input"
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

        <button className="signupBtn loginBox_btn" onClick={handleSignup}>
          {loading === true ? (
            <CircularProgress color="inherit" className="login_loader" />
          ) : (
            "Sign up"
          )}
        </button>
        <button
          className="loginBtn loginBox_btn"
          onClick={() => navigate("/login")}
          disabled={loading}
          id="login_btn"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Signup;
