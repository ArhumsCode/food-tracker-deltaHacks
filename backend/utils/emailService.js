const nodemailer = require('nodemailer');
require('dotenv').config();

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
});

function sendMail(to, subject, msg) {
    return transporter.sendMail({
        from: "arhumfaysal07@gmail.com",
        to: to,
        subject: subject,
        html: msg
    }, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            throw error;
        } else {
            console.log('Email sent:', info.response);
            return info;
        }
    });
}

function generateEmailTemplate(name, awarenessScore, mostWastedCategory) {
    const greetingName = name || 'there';
    
    // Calculate average population score (assuming average person tracks 2-3 entries)
    const averageScore = 25; // 2-3 entries × 10 + 1-2 categories × 5
    const scoreComparison = awarenessScore >= averageScore 
        ? `Your awareness score of ${awarenessScore} is ${awarenessScore - averageScore} points above the average population score of ${averageScore}. Great job on tracking your food waste!`
        : `Your awareness score of ${awarenessScore} is ${averageScore - awarenessScore} points below the average population score of ${averageScore}. Keep tracking to improve your awareness!`;
    
    const mostWastedTip = mostWastedCategory 
        ? `<p style="font-size: 16px; color: #d32f2f; font-weight: 600; margin-top: 20px;">💡 Tip: Consider cutting down on buying <strong>${mostWastedCategory}</strong> - this is the category you waste the most. Try buying smaller quantities or planning meals better to reduce waste!</p>`
        : '';

    return `
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
}

module.exports = {
    sendMail,
    generateEmailTemplate
};
