import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar className="flex justify-between">
        <Typography
          variant="h6"
          className="cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          Testament
        </Typography>
        {isLoggedIn ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/signup")}>
              Signup
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
