const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const productsRouter = require('./routes/products');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// MongoDB Connection with detailed error logging
mongoose.connect(process.env.MONGODB_URI + '/breeze', {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000
})
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas');
    // Test the connection
    mongoose.connection.db.admin().ping()
      .then(() => console.log('MongoDB server responding'))
      .catch(err => console.error('MongoDB server not responding:', err));
  })
  .catch(err => {
    console.error('MongoDB Atlas connection error details:', {
      name: err.name,
      message: err.message,
      code: err.code
    });
  });

// User Schema
// Remove this duplicate schema definition
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// Import User model correctly
const User = require('./models/User');

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('Received signup request:', { name, email });

    // Check if user already exists - with better error handling
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Duplicate email attempted:', email);
      return res.status(409).json({ 
        message: 'Email already registered. Please use a different email or try logging in.',
        code: 'EMAIL_EXISTS'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    const savedUser = await user.save();
    console.log('User saved successfully:', savedUser._id);
    res.status(201).json({ 
      message: 'User created successfully',
      userId: savedUser._id 
    });
  } catch (error) {
    console.error('Signup error:', error);
    if (error.code === 11000) { // MongoDB duplicate key error
      return res.status(409).json({ 
        message: 'This email is already registered',
        code: 'EMAIL_EXISTS'
      });
    }
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Add login route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Send success response (we'll add JWT later)
    res.json({ 
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Routes
app.use('/api/products', productsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Update user cart
app.post('/api/user/cart', async (req, res) => {
  try {
    const { userId, cartItems } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { cart: cartItems },
      { new: true }
    ).select('cart'); // Only return the cart field
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ success: true, cart: user.cart });
  } catch (error) {
    console.error('Cart update error:', error);
    res.status(500).json({ message: 'Error updating cart' });
  }
});

mongoose.connection.on('connected', () => {
  console.log('Connected to database:', mongoose.connection.db.databaseName);
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});