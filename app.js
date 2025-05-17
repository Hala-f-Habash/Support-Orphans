
console.log("hi from hopeconnect");
const express = require('express');
const app = express();
require('dotenv').config();
const logoutRoutes = require('./routes/logoutRoutes');
const loginSigniup= require('./routes/authRoutes');
const testLogOut= require('./routes/userRoutes');
const orphans= require('./routes/orphanRoutes');
const donation = require("./routes/donationRoutes");
const volunteers= require('./routes/volunteerRoutes');
const orphanageRequestRoutes = require('./routes/orphanageRequestRoutes');
const volunteerMatchRoutes = require('./routes/volunteerMatchRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const revenueFees=require('./routes/financeRoutes');
const partners=require('./routes/partnersRoutes');

const donationDirect = require('./controllers/donationController');
const reviewRoutes = require('./routes/reviewRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');

const driverRoute = require('./routes/driverRoute');

app.use(express.json());
//means that Express is setting up a route handler for all requests that start with /api/auth.


app.use('/api/auth',loginSigniup);
app.use('/api/auth', logoutRoutes);
app.use('/api/user',testLogOut );
app.use('/uploads', express.static('uploads'));
app.use('/api/orphans',orphans);
app.use('/api/donations/type_summary',donationDirect.getAllDonationsByType);
app.use('/api/donations',donation);
app.use('/api/donations', donation);

app.use('/api/volunteers',volunteers);
app.use('/api/requests', orphanageRequestRoutes);
app.use('/api/orphanage', orphanageRequestRoutes);
app.use('/api/match', volunteerMatchRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/finance', revenueFees);
app.use('/api/reviews', reviewRoutes);
app.use('/api/partners', partners);

app.use('/api/delivery', deliveryRoutes);

app.use('/api/drivers',driverRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
