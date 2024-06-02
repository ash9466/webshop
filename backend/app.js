const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/products', productRoutes);

// Connect to MongoDB Atlas
const dbURI = 'mongodb+srv://ashraf:ashraf@tp-note.fc7ggft.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=TP-note';
mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected to Atlas'))
    .catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
