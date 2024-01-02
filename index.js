const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const port = process.env.PORT || 3000;

const apiData = require("./data.json");

app.get("/", (req, res) => {
    res.send("Home");
});

app.get("/color", (req, res) => {
    res.send(apiData);
});

// Endpoint to get color value by name
app.get('/color/:name', (req, res) => {
    const colorName = req.params.name.toLowerCase(); // Get the color name from request params
    const colorInfo = apiData.find(color => color.color.toLowerCase() === colorName); // Find the color info

    if (colorInfo) {
        res.json({ value: colorInfo.value }); // Send the color value in response
    } else {
        res.status(404).json({ error: 'Color not found' }); // Color not found
    }
});

app.get("/service/:colorname", (req, res) => {
    res.send(apiData);
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});