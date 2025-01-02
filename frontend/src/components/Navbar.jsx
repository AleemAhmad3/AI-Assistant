import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post("https://ai-assistant-backend-m0ul.onrender.com/api/v1/auth/logout");
      localStorage.removeItem("authToken");
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      width="100%"
      backgroundColor={theme.palette.background.alt}
      p="1rem 6%"
      sx={{
        boxShadow: 3,
        mb: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Logo aligned to the left */}
      <Typography
        variant="h1"
        color="primary"
        fontWeight="bold"
        onClick={() => navigate("/")} // Navigate to home page when logo is clicked
        sx={{ cursor: "pointer" }}
      >
        AI Assistant
      </Typography>
      {/* Links aligned to the right */}
      <Box>
        {loggedIn ? (
          <>
            <NavLink to="/" style={{ padding: "0 1rem" }}>
              Home
            </NavLink>
            <NavLink
              to="/login"
              onClick={handleLogout}
              style={{ padding: "0 1rem" }}
            >
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/register" style={{ padding: "0 1rem" }}>
              Sign Up
            </NavLink>
            <NavLink to="/login" style={{ padding: "0 1rem" }}>
              Sign In
            </NavLink>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
