# Sentiment Analysis Project

This project consists of a FastAPI backend for sentiment analysis and a React frontend for visualization.

## Project Structure

```
.
├── main.py              # FastAPI backend
├── requirements.txt     # Python dependencies
├── frontend/           # React frontend
    ├── package.json    # Node.js dependencies
    └── src/
        └── App.js      # Main React component
```

## Backend Setup

1. Create a virtual environment (recommended):

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

# Create conda environment

conda create -n sentiment python=3.9
conda activate sentiment

# Install packages

conda install pandas 2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run the FastAPI server:

```bash
python main.py
```

The API will be available at http://localhost:8000. You can access the API documentation at http://localhost:8000/docs.

## Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The frontend will be available at http://localhost:3000.

## Usage

1. Login using the following credentials:

   -  Username: testuser
   -  Password: testpassword

2. Upload a CSV file with the following format:

```csv
id,text,timestamp
1,"I love the new features of this product!",2024-12-13 10:00:00
2,"The service was okay, nothing special.",2024-12-13 11:30:00
3,"I am not happy with the recent changes.",2024-12-13 12:45:00
```

3. Click "Analyze Sentiment" to process the file.

4. View the sentiment distribution in the bar chart.

## API Endpoints

-  POST `/token`: Get authentication token
-  POST `/analyze`: Analyze sentiment from CSV file (requires authentication)
-  GET `/`: API information

## Technologies Used

-  Backend:

   -  FastAPI
   -  TextBlob (for sentiment analysis)
   -  Python-Jose (for JWT authentication)
   -  Pandas (for CSV processing)

-  Frontend:
   -  React
   -  Material-UI
   -  Chart.js
   -  Axios
   -  React-Dropzone

## Security Notes

-  The secret key in the backend is for demonstration purposes only. In production, use environment variables.
-  CORS is currently configured to accept all origins. In production, specify your frontend domain.
-  The user database is mocked for demonstration. In production, use a proper database.
