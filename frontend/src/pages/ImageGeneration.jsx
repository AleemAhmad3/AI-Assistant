import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Grid,
} from "@mui/material";

const ScifiImage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  // states
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://ai-assistant-backend-m0ul.onrender.com/api/v1/openai/scifi-image",
        { text }
      );
      setImage(data);
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <Box
      height="80vh" // Make sure it takes the full height of the screen
      display="flex" // Flexbox for centering content
      justifyContent="center" // Horizontally center content
      alignItems="center" // Vertically center content
    >
      <Box
        width={isNotMobile ? "80%" : "90%"}
        p={isNotMobile ? "3rem" : "2rem"}
        m="auto"
        borderRadius={5}
        sx={{ boxShadow: 5 }}
        backgroundColor={theme.palette.background.alt}
      >
        <Collapse in={!!error}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Collapse>

        <Grid container spacing={3}>
          {/* Left side: Form */}
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit}>
              <Typography variant="h3" mb={3} textAlign="center">
                Sci-Fi Image Generator
              </Typography>

              <TextField
                placeholder="Add your text to generate an image"
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
                Generate Image
              </Button>

              <Typography mt={2} textAlign="center">
                Want to go back? <Link to="/">Go Back</Link>
              </Typography>
            </form>
          </Grid>

          {/* Right side: Image */}
          <Grid item xs={12} md={6}>
            {image ? (
              <Card
                sx={{
                  height: "100%",
                  border: 1,
                  boxShadow: 0,
                  borderRadius: 5,
                  borderColor: theme.palette.grey[400],
                  bgcolor: theme.palette.background.default,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
                  <img
                    src={image}
                    alt="Sci-Fi Image"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </Box>
              </Card>
            ) : (
              <Card
                sx={{
                  height: "100%",
                  border: 1,
                  boxShadow: 0,
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
                  Your Sci-Fi Image Will Appear Here
                </Typography>
              </Card>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ScifiImage;
