import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import {
   Container,
   Paper,
   Typography,
   Button,
   TextField,
   Box,
   CircularProgress,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
} from "chart.js";

// Register ChartJS plugins
ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
);

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8001";

function App() {
   const [file, setFile] = useState(null);
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [token, setToken] = useState("");
   const [results, setResults] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   const { getRootProps, getInputProps } = useDropzone({
      accept: { "text/csv": [".csv"] },
      onDrop: (acceptedFiles) => {
         setFile(acceptedFiles[0]);
         setError("");
      },
   });

   // Helper function to handle loading and error
   const handleApiCall = async (promise, setErrorMsg) => {
      setLoading(true);
      try {
         const response = await promise;
         return response;
      } catch (err) {
         setError(setErrorMsg);
      } finally {
         setLoading(false);
      }
   };

   // Function to create chart data
   const getChartData = () => {
      if (!results) return null;

      const positiveCount = results.filter(
         (r) => r.sentiment_label === "positive"
      ).length;
      const neutralCount = results.filter(
         (r) => r.sentiment_label === "neutral"
      ).length;
      const negativeCount = results.filter(
         (r) => r.sentiment_label === "negative"
      ).length;

      return {
         labels: ["Positive", "Neutral", "Negative"],
         datasets: [
            {
               label: "Sentiment Distribution",
               data: [positiveCount, neutralCount, negativeCount],
               backgroundColor: [
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(255, 99, 132, 0.6)",
               ],
            },
         ],
      };
   };

   const handleLogin = () => {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      handleApiCall(
         axios.post(`${API_URL}/token`, formData),
         "Login failed. Please check your credentials."
      ).then((response) => setToken(response.data.access_token));
   };

   const handleAnalyze = () => {
      if (!file) {
         setError("Please select a CSV file first.");
         return;
      }

      const formData = new FormData();
      formData.append("file", file);

      handleApiCall(
         axios.post(`${API_URL}/analyze`, formData, {
            headers: { Authorization: `Bearer ${token}` },
         }),
         "Analysis failed. Please check your file format and try again."
      ).then((response) => setResults(response.data));
   };

   return (
      <Container maxWidth="md" sx={{ py: 4 }}>
         <Typography variant="h4" gutterBottom>
            Sentiment Analysis Dashboard
         </Typography>

         {/* Login Section */}
         {!token && (
            <Paper sx={{ p: 3, mb: 3 }}>
               <Typography variant="h6" gutterBottom>
                  Login
               </Typography>
               <TextField
                  fullWidth
                  label="Username"
                  margin="normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />
               <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
               <Button
                  variant="contained"
                  onClick={handleLogin}
                  disabled={loading}
                  sx={{ mt: 2 }}
               >
                  {loading ? <CircularProgress size={24} /> : "Login"}
               </Button>
            </Paper>
         )}

         {/* File Upload and Analysis Section */}
         {token && (
            <Paper {...getRootProps()} sx={{ p: 3, mb: 3, cursor: "pointer" }}>
               <input {...getInputProps()} />
               <Typography align="center">
                  Drag and drop a CSV file here, or click to select
               </Typography>
               {file && (
                  <Typography
                     align="center"
                     sx={{ mt: 2, color: "primary.main" }}
                  >
                     Selected: {file.name}
                  </Typography>
               )}
            </Paper>
         )}

         {token && (
            <Button
               fullWidth
               variant="contained"
               onClick={handleAnalyze}
               disabled={!file || loading}
               sx={{ mb: 3 }}
            >
               {loading ? <CircularProgress size={24} /> : "Analyze Sentiment"}
            </Button>
         )}

         {error && (
            <Typography color="error" sx={{ mb: 2 }}>
               {error}
            </Typography>
         )}

         {/* Analysis Results Section */}
         {results && (
            <Paper sx={{ p: 3 }}>
               <Typography variant="h6" gutterBottom>
                  Analysis Results
               </Typography>
               <Box sx={{ height: 300 }}>
                  <Bar
                     data={getChartData()}
                     options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                           legend: { position: "top" },
                           title: {
                              display: true,
                              text: "Sentiment Distribution",
                           },
                        },
                     }}
                  />
               </Box>
            </Paper>
         )}
      </Container>
   );
}

export default App;
