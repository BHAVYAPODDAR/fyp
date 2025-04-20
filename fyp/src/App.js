import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./Login_Signup/Login";
import Signup from "./Login_Signup/Signup";
import StepWrapper from "./components/questionnaire/StepWrapper";
import "./App.css";

function App() {
  return (
    <div className="h-full w-full">
      <Routes>
        {/* <Route path='/' element={<Landing/>} /> */}
        <Route path="/questions" element={<StepWrapper />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
