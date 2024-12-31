Take Home Assignment - AI-Powered Sentiment Analysis API Assignment

Objective:
Develop a FastAPI application that performs sentiment analysis on text data using a pre-trained model. Additionally, create a basic React portal for uploading reports and displaying sentiment analysis results in chart form.
Assignment Details:
API Development:
Build a RESTful API using FastAPI that includes endpoints for sentiment analysis.
Use a pre-trained sentiment analysis model (e.g., VADER, TextBlob, Open AI) to analyze text input.
Implement authentication to secure the API.
File Input Format:
The API should accept a CSV file with the following columns:
id: Unique identifier for each entry.
text: The text data for sentiment analysis.
timestamp (optional): Date and time of text creation.
Example:
csv
id,text,timestamp
1,"I love the new features of this product!",2024-12-13 10:00:00
2,"The service was okay, nothing special.",2024-12-13 11:30:00
3,"I am not happy with the recent changes.",2024-12-13 12:45:00
Data Visualization:
Create a simple React portal for users to upload CSV files and view sentiment analysis results.
Use a library to generate visual reports (e.g., bar chart, pie chart) showing sentiment distribution.
Deployment and Documentation:
Deploy the FastAPI application on a cloud platform (e.g., Heroku, AWS).
Provide clear documentation on API usage, setup instructions, and example requests/responses.
Video Demonstration:
Record a video demo showcasing the application's functionality, including API interaction and the React portal.
Ensure the video highlights key features and the deployment process.
Deadline:
Complete the assignment within 48 hours and submit via email itself.
Focus:
Prioritize functionality over aesthetics in the React portal.
Ensure robust API performance and clear documentation.
