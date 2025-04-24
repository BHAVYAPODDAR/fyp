import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const bag2 =
    "https://assets.website-files.com/62cc07ca0720bd63152e1799/62cd16b4a5613c06cf9a0ff4_line-bg.svg";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = async () => {
  //   try {
  //     const res = await fetch("http://localhost:5000/api/users/register", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       localStorage.setItem("token", data.token);
  //       navigate("/Dashboard");
  //     } else {
  //       alert(data.msg);
  //     }
  //   } catch (err) {
  //     alert("Error signing up");
  //     console.error(err);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      alert("✅ Registered successfully!");
    } catch (error) {
      console.error(
        "❌ Registration failed:",
        error.response?.data || error.message
      );
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${bag2})`, backgroundSize: "cover" }}
      className="h-screen w-screen overflow-y-hidden flex items-center justify-between px-10"
    >
      <motion.div
        initial={{ x: 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-[90%] w-[40%] rounded-3xl bg-white flex flex-col item-center justify-center shadow-2xl"
      >
        <div className="flex flex-col item-center justify-center w-full px-8 pb-5 pt-2">
          <div>
            <h1 className="text-3xl mt-3 mb-3 font-semibold tracking-widest ">
              Sign Up
            </h1>

            <h4 className="font-semibold text-[#c0c0c0] cursor-pointer">
              Already Signed Up?{" "}
              <span className="text-[#8D2FFF]">
                <Link to="/Login">Login</Link>
              </span>
            </h4>
          </div>

          <div className="w-[100%] mt-5">
            <p className="font-medium">Email</p>
            <div className="flex items-center border-b-2 border-ourmedpurp">
              <input
                className="appearance-none bg-transparent border-none w-full text-subtext p-1 leading-tight focus:outline-none h-10"
                type="text"
                placeholder="Enter your email address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <p className="font-medium mt-5">Password</p>
            <div className="flex items-center border-b-2 border-ourmedpurp">
              <input
                className="appearance-none bg-none border-none w-full text-subtext p-1 leading-tight focus:outline-none h-10"
                type="password"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mt-8 mb-5">
              <Button
                variant="contained"
                className="w-full rounded-full"
                style={{ padding: "10px", backgroundColor: "#51B555" }}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
            </div>

            <div className="w-full flex items-center justify-center gap-4">
              <hr className="border border-[#F0F1EB] w-[45%]" />
              <p>OR</p>
              <hr className="border border-[#F0F1EB] w-[45%]" />
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <button className="flex items-center justify-start gap-5 py-2 px-5 w-full border border-[#b7b8b2]">
                <FcGoogle size={25} /> Continue with Google
              </button>
              <button className="flex items-center justify-start gap-5 py-2 px-5 w-full border border-[#b7b8b2]">
                <FaApple size={25} /> Continue with Apple
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="w-[60%] flex flex-col items-center justify-center h-full"></div>
    </div>
  );
};

export default Signup;
