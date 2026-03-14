const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());

// --- THE SECRET SAUCE ---
// This tells Express to serve all your files (html, css, js) from the current folder
app.use(express.static(__dirname)); 

// This tells Express: When someone goes to "/", show index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Your upload route stays the same
app.post('/upload', (req, res) => {
    console.log("Upload request received from the UI!");
    res.json({ message: "Image received successfully!" });
});

app.listen(5000, () => {
    console.log("🔥 Website is live at: http://localhost:5000");
});