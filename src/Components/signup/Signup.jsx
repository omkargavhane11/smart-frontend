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

  const handleSignup = async (e) => {
    e.preventDefault();

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
          "https://s-mart-77.herokuapp.com/user/register",
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
      <form className="login_wrapper">
        <h1 className="website-logo" onClick={() => navigate("/")}>
          smartbuy
        </h1>
        <div className="input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
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
            placeholder="johndoe@example.com"
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
            length="10"
            placeholder="9191919191"
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

        <button className="signupBtn" onClick={handleSignup}>
          {loading === true ? (
            <CircularProgress color="inherit" className="login_loader" />
          ) : (
            "Sign up"
          )}
        </button>
        <button
          className="loginBtn"
          onClick={() => navigate("/login")}
          disabled={loading}
          id="login_btn"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Signup;
