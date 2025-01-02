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
  Card,
} from "@mui/material";

const ChatBot = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  // states
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://ai-assistant-backend-m0ul.onrender.com/api/v1/openai/chatbot", { text });
      setResponse(data); // Assuming the response comes back correctly from the backend
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);  // More generic error handling
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
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
        width={isNotMobile ? "70%" : "90%"} // Adjusted for better responsiveness
        display="flex"
        justifyContent="space-between"
        p={isNotMobile ? "3rem" : "2rem"}
        m="auto"
        borderRadius={5}
        sx={{ boxShadow: 5 }}
        backgroundColor={theme.palette.background.alt}
      >
        <Box width="45%" p="1rem">
          <Collapse in={!!error}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </Collapse>
          <form onSubmit={handleSubmit}>
            <Typography variant="h3" mb={3} textAlign="center">
              Ask with Chatbot
            </Typography>

            <TextField
              placeholder="Add your text"
              type="text"
              multiline
              required
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ color: "white", mb: 3 }}
            >
              Chat
            </Button>

            <Typography mt={2} textAlign="center">
              Not this tool? <Link to="/">Go Back</Link>
            </Typography>
          </form>
        </Box>

        {/* Response Card on the right */}
        <Box width="45%" p="1rem">
          {response ? (
            <Card
              sx={{
                height: "400px",
                borderRadius: 5,
                borderColor: theme.palette.grey[400],
                bgcolor: theme.palette.background.default,
              }}
            >
              <Typography p={2}>{response}</Typography>
            </Card>
          ) : (
            <Card
              sx={{
                height: "400px",
                borderRadius: 5,
                borderColor: theme.palette.grey[400],
                bgcolor: theme.palette.background.default,
              }}
            >
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontWeight: "bold",
                }}
              >
                Bot Response Will Appear Here
              </Typography>
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBot;
