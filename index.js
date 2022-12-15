const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/openai', require('./routes/openAiRoutes'));

app.listen(port, () => console.log(`Server running on port ${port}`));
