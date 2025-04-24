// src/app.js
const express = require('express');
const fileRoutes = require('./routes/fileRoutes');
const app = express();

app.use(express.json());
app.use('/api', fileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});