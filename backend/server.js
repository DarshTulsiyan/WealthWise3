// const express = require('express');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const userRoutes = require('./routes/userRoutes');
// const billRoutes = require('./routes/billRoutes');
// const authRoutes = require('./routes/authRoutes');
// const goalRoutes = require('./routes/goalRoutes');
// const expenseRoutes = require('./routes/expenseRoutes');
// const session = require('express-session');
// const passport = require('passport');
// require('./passport');

// dotenv.config();
// connectDB();

// const cors = require('cors');

// const app = express();
// app.use(bodyParser.json());

// app.use(cors({
//     origin: 'http://localhost:3000', // Allowed HTTP methods
//     credentials: true,
// }));
// app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// app.use('/api/user', userRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/expenses', expenseRoutes);
// app.use('/api/bills', billRoutes);
// app.use('/api/goals', goalRoutes);





// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const billRoutes = require('./routes/billRoutes');
const authRoutes = require('./routes/authRoutes');
const goalRoutes = require('./routes/goalRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const session = require('express-session');
const passport = require('passport');  // Import passport

// Load passport configuration
require('./passport');  // Make sure passport is configured

dotenv.config();
connectDB();

const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// Initialize session
app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/goals', goalRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app