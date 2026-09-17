const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    // Parse body if received as string
    let body = req.body;
    if (typeof body === 'string') {
        try {
            body = JSON.parse(body);
        } catch (e) {
            body = {};
        }
    }

    const { name, phone, email, type, message } = body || {};

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Please provide Name, Email, and Message.' });
    }

    const sender = (process.env.SMTP_USER || '').trim();
    const receiver = (process.env.RECEIVER_EMAIL || sender).trim();
    const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');

    if (!sender || !pass) {
        console.error('Missing SMTP credentials in Vercel Environment Variables');
        return res.status(500).json({
            success: false,
            message: 'Email service error: Missing SMTP credentials in Vercel Environment Variables.'
        });
    }

    const isGmail = (process.env.SMTP_HOST || '').includes('gmail') || sender.endsWith('@gmail.com');
    const transporter = nodemailer.createTransport(
        isGmail && !process.env.SMTP_HOST
            ? {
                  service: 'gmail',
                  auth: { user: sender, pass: pass }
              }
            : {
                  host: process.env.SMTP_HOST || 'smtp.gmail.com',
                  port: parseInt(process.env.SMTP_PORT, 10) || 587,
                  secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
                  auth: { user: sender, pass: pass }
              }
    );

    try {
        await transporter.sendMail({
            from: `"ESTARA Website" <${sender}>`,
            replyTo: email,
            to: receiver,
            subject: `New Property Enquiry: ${type || 'General'} from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e5e0d6; border-radius: 8px;">
                    <h2 style="color: #17362b; border-bottom: 2px solid #b99352; padding-bottom: 8px;">New Property Enquiry</h2>
                    <p><strong>Full Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                    <p><strong>Interest:</strong> ${type || 'Not specified'}</p>
                    <p><strong>Message:</strong></p>
                    <div style="background-color: #fbfaf7; padding: 15px; border-left: 4px solid #b99352; font-style: italic;">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                    <hr style="border: none; border-top: 1px solid #e5e0d6; margin-top: 20px;">
                    <small style="color: #6c716c;">Sent from ESTARA website enquiry form.</small>
                </div>
            `
        });

        return res.status(200).json({ success: true, message: 'Enquiry sent successfully!' });
    } catch (err) {
        console.error('Error sending email:', err);
        return res.status(500).json({ success: false, message: 'Server error while sending email: ' + err.message });
    }
};
