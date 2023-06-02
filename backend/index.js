import express from "express";
import bodyParser from "body-parser";
import fs from 'fs';
import cors from "cors"; // Import the cors middleware

const app = express();
const port = 8800;

app.use(bodyParser.json());

// Enable CORS middleware
app.use(cors());

app.post('/api/data', (req, res) => { 
    const jsonData = req.body;

    // Read the existing data from the file
    let existingData = [];
    if (fs.existsSync('data.json')) {
        existingData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    }

    // Add the new data to the existing data array
    existingData.push(jsonData);

    // Write the updated data back to the file
    fs.writeFileSync('data.json', JSON.stringify(existingData));

    res.send('Data added successfully');
});

app.listen(port, () => {
    console.log(`Connected to backend! Listening on port ${port}`);
});
