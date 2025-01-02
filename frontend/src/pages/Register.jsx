import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
} from "@mui/material";

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  // States
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/v1/auth/register", { username, email, password });
      toast.success("User Registered Successfully");
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err);
      setError(err.response?.data?.error || "Something went wrong");
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <Box
      height="80vh" // Full height for vertical centering
      display="flex" // Flexbox for centering content
      justifyContent="center" // Horizontally center content
      alignItems="center" // Vertically center content
    >
      <Box
        width={isNotMobile ? "40%" : "80%"} // Adjust width for mobile vs desktop
        p={"2rem"}
        borderRadius={5}
        sx={{ boxShadow: 5 }}
        backgroundColor={theme.palette.background.alt}
      >
        <Collapse in={!!error}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Collapse>
        <form onSubmit={handleSubmit}>
          <Typography variant="h3" gutterBottom textAlign="center">
            Sign Up
          </Typography>
          <TextField
            label="Username"
            required
            margin="normal"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            required
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            required
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ color: "white", mt: 2 }}
          >
            Sign Up
          </Button>
          <Typography mt={2} textAlign="center">
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
