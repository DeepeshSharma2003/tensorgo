
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const planRoutes = require('./routes/planRoutes');
const organisationRoutes = require('./routes/organisationRoutes');
const userRoutes = require('./routes/userRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const billingRoutes = require('./routes/billingRoutes');
const sequelize = require('./config/connection');

const app = express();


app.use(cors({ origin: 'http://localhost:5173' })); 


app.use(bodyParser.json());


app.use('/plans', planRoutes);
app.use('/organisations', organisationRoutes);
app.use('/users', userRoutes);
app.use('/subscriptions', subscriptionRoutes);
app.use('/billings', billingRoutes);


sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
