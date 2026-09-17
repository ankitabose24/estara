const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so index.html can call this server
app.use(cors());
app.use(express.json());

// Configure Nodemailer SMTP Transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
    auth: {
        user: (process.env.SMTP_USER || '').trim(),
        pass: (process.env.SMTP_PASS || '').replace(/\s+/g, '')
    }
});

// Verify connection configuration
transporter.verify((error) => {
    if (error) {
        console.error('❌ SMTP Connection Error:', error.message);
    } else {
        console.log('✅ SMTP Transporter is ready to send emails.');
    }
});

// Enquiry endpoint
app.post('/api/enquiry', async (req, res) => {
    const { name, phone, email, type, message } = req.body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Please provide Name, Email, and Message.'
        });
    }

    try {
        const sender = (process.env.SMTP_USER || '').trim();
        const receiver = (process.env.RECEIVER_EMAIL || sender).trim();
        const mailOptions = {
            from: `"ESTARA Website" <${sender}>`,
            replyTo: email,
            to: receiver,
            subject: `New Property Enquiry: ${type || 'General'} from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e5e0d6; border-radius: 8px;">
                    <h2 style="color: #17362b; border-bottom: 2px solid #b99352; padding-bottom: 8px;">New Enquiry Received</h2>
                    <p><strong>Full Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                    <p><strong>Interest:</strong> ${type || 'Not specified'}</p>
                    <p><strong>Message:</strong></p>
                    <div style="background-color: #fbfaf7; padding: 15px; border-left: 4px solid #b99352; font-style: italic;">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                    <hr style="border: none; border-top: 1px solid #e5e0d6; margin-top: 20px;">
                    <small style="color: #6c716c;">This email was sent from the ESTARA enquiry form.</small>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            message: 'Enquiry sent successfully!'
        });
    } catch (err) {
        console.error('Error sending email:', err);
        return res.status(500).json({
            success: false,
            message: 'Server error while sending email. Please check SMTP settings.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 ESTARA backend running on http://localhost:${PORT}`);
});