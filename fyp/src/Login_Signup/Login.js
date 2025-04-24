// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// import Button from "@mui/material/Button";
// import { FcGoogle } from "react-icons/fc";
// import { FaApple } from "react-icons/fa";

// const Login = () => {
//   const bag2 =
//     "https://assets.website-files.com/62cc07ca0720bd63152e1799/62cd16b4a5613c06cf9a0ff4_line-bg.svg";

//   return (
//     <div
//       style={{ backgroundImage: `url(${bag2})`, backgroundSize: "cover" }}
//       className="h-screen w-screen overflow-y-hidden flex items-center justify-between px-10"
//     >
//       <div className="w-[60%] flex flex-col items-center justify-center h-full">
//         {/* Add animations here later if needed */}
//       </div>

//       <motion.div
//         initial={{ x: 200, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="h-[90%] w-[40%] rounded-3xl bg-white flex flex-col item-center justify-center shadow-2xl"
//       >
//         <div className="w-full pt-4">
//           <a href="/" className="flex justify-center">
//             {/* <img src={logo} style={{ height: "auto", width: "40%" }} alt="logo" /> */}
//           </a>
//         </div>

//         <div className="flex flex-col item-center justify-center w-full px-8 pb-5 pt-2">
//           <div>
//             <h1 className="text-3xl mt-3 mb-3 font-semibold tracking-widest">
//               Login
//             </h1>

//             <h4 className="font-semibold text-[#c0c0c0] cursor-pointer">
//               Not Signed Up?{" "}
//               <span className="text-[#8D2FFF]">
//                 <Link to="/SignUp">SignUp</Link>
//               </span>
//             </h4>
//           </div>

//           <div className="w-[100%] mt-5">
//             <p className="font-medium">Email</p>
//             <div className="flex items-center border-b-2 border-ourmedpurp">
//               <input
//                 className="appearance-none bg-transparent border-none w-full text-subtext p-1 leading-tight focus:outline-none h-10"
//                 type="text"
//                 placeholder="Enter your email address"
//                 name="email"
//               />
//             </div>
//             <p className="font-medium mt-5">Password</p>
//             <div className="flex items-center border-b-2 border-ourmedpurp">
//               <input
//                 className="appearance-none bg-none border-none w-full text-subtext p-1 leading-tight focus:outline-none h-10"
//                 type="password"
//                 placeholder="Enter your password"
//                 name="password"
//               />
//             </div>

//             <div className="mt-8 mb-5">
//               <Link to="/Dashboard">
//                 <Button
//                   variant="contained"
//                   className="w-full rounded-full"
//                   style={{ padding: "10px", backgroundColor: "#51B555" }}
//                 >
//                   Login
//                 </Button>
//               </Link>
//             </div>

//             <div className="w-full flex items-center justify-center gap-4">
//               <hr className="border border-[#F0F1EB] w-[45%]" />
//               <p>OR</p>
//               <hr className="border border-[#F0F1EB] w-[45%]" />
//             </div>

//             <div className="flex flex-col gap-3 mt-2">
//               <button className="flex items-center justify-start gap-5 py-2 px-5 w-full border border-[#b7b8b2]">
//                 <FcGoogle size={25} /> Continue with Google
//               </button>
//               <button className="flex items-center justify-start gap-5 py-2 px-5 w-full border border-[#b7b8b2]">
//                 <FaApple size={25} /> Continue with Apple
//               </button>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

import Button from "@mui/material/Button";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      const { token } = res.data;

      // Save token to localStorage (or cookies if you prefer)
      localStorage.setItem("token", token);

      // Redirect to dashboard
      navigate("/Dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  const bag2 =
    "https://assets.website-files.com/62cc07ca0720bd63152e1799/62cd16b4a5613c06cf9a0ff4_line-bg.svg";

  return (
    <div
      style={{ backgroundImage: `url(${bag2})`, backgroundSize: "cover" }}
      className="h-screen w-screen overflow-y-hidden flex items-center justify-between px-10"
    >
      <div className="w-[60%] flex flex-col items-center justify-center h-full">
        {/* You can add animation or image here */}
      </div>

      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-[90%] w-[40%] rounded-3xl bg-white flex flex-col justify-center shadow-2xl"
      >
        <div className="flex flex-col px-8 pb-5 pt-2">
          <h1 className="text-3xl font-semibold tracking-widest mt-3 mb-3">
            Login
          </h1>
          <h4 className="font-semibold text-[#c0c0c0]">
            Not Signed Up?{" "}
            <span className="text-[#8D2FFF]">
              <Link to="/SignUp">SignUp</Link>
            </span>
          </h4>

          <div className="w-full mt-5">
            <p className="font-medium">Email</p>
            <input
              className="appearance-none border-b-2 w-full p-1 h-10 focus:outline-none"
              type="text"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />

            <p className="font-medium mt-5">Password</p>
            <input
              className="appearance-none border-b-2 w-full p-1 h-10 focus:outline-none"
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />

            {error && <p className="text-red-500 mt-3">{error}</p>}

            <div className="mt-8 mb-5">
              <Button
                variant="contained"
                fullWidth
                onClick={handleLogin}
                style={{ padding: "10px", backgroundColor: "#51B555" }}
              >
                Login
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
    </div>
  );
};

export default Login;
