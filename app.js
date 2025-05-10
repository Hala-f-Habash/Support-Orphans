
//Sets up Express, configures middleware, and loads routes.


console.log("hi from hopeconnect");
const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());
//means that Express is setting up a route handler for all requests that start with /api/auth.

app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
