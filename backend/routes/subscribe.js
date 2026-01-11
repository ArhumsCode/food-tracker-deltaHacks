const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { sendMail, generateEmailTemplate } = require('../utils/emailService');

// Subscription endpoint
router.post('/', async (req, res) => {
    try {
        const { email, name, awarenessScore, mostWastedCategory } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const subject = 'Welcome to Food Waste Tracker!';
        const emailContent = generateEmailTemplate(name, awarenessScore, mostWastedCategory);

        sendMail(email, subject, emailContent);
        res.json({ success: true, message: 'Subscription successful! Check your email.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

module.exports = router;
