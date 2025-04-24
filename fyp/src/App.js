// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import Login from "./Login_Signup/Login";
// import Signup from "./Login_Signup/Signup";
// import StepWrapper from "./components/questionnaire/StepWrapper";
// import Dashboard from "./Dashboard/Dasboard";
// import "./App.css";

// function App() {
//   return (
//     <div className="h-full w-full">
//       <Routes>
//         {/* <Route path='/' element={<Landing/>} /> */}
//         <Route path="/questions" element={<StepWrapper />} />
//         <Route path="/Login" element={<Login />} />
//         <Route path="/SignUp" element={<Signup />} />
//         <Route path="/Dashboard" element={<Dashboard />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";

import theme from "./theme"; // ✅ import the theme
import Navbar from "./components/shared/Navbar";
import Login from "./Login_Signup/Login";
import Signup from "./Login_Signup/Signup";
import StepWrapper from "./components/questionnaire/StepWrapper";
import Dashboard from "./Dashboard/Dasboard";
import "./App.css";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
            }
          />
          <Route
            path="/questions"
            element={
              isAuthenticated ? <StepWrapper /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          {/* You can add a 404 Page Not Found route if needed */}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
