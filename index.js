const express = require('express');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/users');


const app = express();
const port = 3000;
app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);




app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
