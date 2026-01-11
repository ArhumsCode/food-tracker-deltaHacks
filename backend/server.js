const express = require('express');
const cors = require('cors');
require('dotenv').config();
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const User = require('./models/User');

const subscribeRoutes = require('./routes/subscribe');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json())


// Middleware
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: "arhumfaysal07@gmail.com",
        pass: process.env.GOOGLE_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})

function sendMail(to, subject, msg) {
    transporter.sendMail({
        from: "arhumfaysal07@gmail.com",
        to: to,
        subject: subject,
        html: msg
    }, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    })
}

// Connect to MongoDB Atlas
const uri = process.env.MONGODB_URI;
console.log("URI:", uri);
// Replace 'your_mongodb_atlas_connection_string' with your actual connection string from MongoDB Atlas.
// You can find this in your MongoDB Atlas dashboard under the 'Connect' section.

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the schema for waste entries




// Subscription endpoint
app.post('/api/subscribe', (req, res) => {
    const { email, name, awarenessScore, mostWastedCategory } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const subject = 'Welcome to Food Waste Tracker!';
    const greetingName = name || 'there';
    
    // Calculate average population score (assuming average person tracks 2-3 entries)
    const averageScore = 25; // 2-3 entries × 10 + 1-2 categories × 5
    const scoreComparison = awarenessScore >= averageScore 
        ? `Your awareness score of ${awarenessScore} is ${awarenessScore - averageScore} points above the average population score of ${averageScore}. Great job on tracking your food waste!`
        : `Your awareness score of ${awarenessScore} is ${averageScore - awarenessScore} points below the average population score of ${averageScore}. Keep tracking to improve your awareness!`;
    
    const mostWastedTip = mostWastedCategory 
        ? `<p style="font-size: 16px; color: #d32f2f; font-weight: 600; margin-top: 20px;">💡 Tip: Consider cutting down on buying <strong>${mostWastedCategory}</strong> - this is the category you waste the most. Try buying smaller quantities or planning meals better to reduce waste!</p>`
        : '';

    const msg = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #667eea; text-align: center;">Hello ${greetingName}!</h1>
            <h2 style="color: #667eea; text-align: center;">Thank you for subscribing to Food Waste Tracker!</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h2 style="color: #333; margin-top: 0;">Your Awareness Score: <span style="color: #667eea; font-size: 32px;">${awarenessScore}</span></h2>
                <p style="font-size: 16px; color: #666; line-height: 1.6;">${scoreComparison}</p>
            </div>
            ${mostWastedTip}
            <p style="font-size: 14px; color: #888; margin-top: 30px; text-align: center;">Keep tracking your food waste to make a positive impact on the environment!</p>
        </div>
    `;

    try {
        sendMail(email, subject, msg);
        res.json({ success: true, message: 'Subscription successful! Check your email.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email required' });

    const user = new User({ name, email });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/users/:id/waste', async (req, res) => {
  try {
    const { type, amount, date, location } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.wasteEntries.push({ type, amount, date, location });
    await user.save();
    console.log("Successfully added waste entry:", { type, amount, date, location });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

