// Le Quang Nhat - CE190875 - Assignment 2 - Bug Report Management

const express = require('express')
const reportsRoutes = require('./src/routes/reportRoutes')
const usersRoutes = require('./src/routes/userRoutes')
const connectDB = require('./src/config/db')
const path = require('path')
const dotenv = require('dotenv');
dotenv.config();
const app = express();

//middleware
app.use(express.json());
//parse from-urlendcode (form html)
app.use(express.urlencoded({ extended: true }))


//set ejs as the  template engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

//connect to the database
connectDB();

app.use('/reports', reportsRoutes);
app.use('/users', usersRoutes);

// Redirect localhost:8000 to /reports
app.get('/', (req, res) => {
    res.redirect('/reports');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});