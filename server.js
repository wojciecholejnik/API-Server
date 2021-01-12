const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.use('/api/', testimonialsRoutes);
app.use('/api/', concertsRoutes);
app.use('/api/', seatsRoutes);


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
