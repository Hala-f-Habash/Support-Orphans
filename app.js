
console.log("hi from hopeconnect");
const express = require('express');
const app = express();
require('dotenv').config();
const logoutRoutes = require('./routes/logoutRoutes');
const loginSigniup= require('./routes/authRoutes');
const testLogOut= require('./routes/userRoutes');
const orphans= require('./routes/orphanRoutes');
const donation = require("./routes/donationRoutes")
app.use(express.json());
//means that Express is setting up a route handler for all requests that start with /api/auth.


app.use('/api/auth',loginSigniup);
app.use('/api/auth', logoutRoutes);
app.use('/api/user',testLogOut );
app.use('/uploads', express.static('uploads'));
app.use('/api/orphans',orphans);
app.use('/api/donations',donation);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
