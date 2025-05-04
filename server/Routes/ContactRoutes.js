import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/send-mail', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    console.log('Received contact form data:', { name, email, message });

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'arun261104@gmail.com',
        pass: 'cpobfrucvhwaksta' // App password (no spaces for safety)
      }
    });

    const mailOptions = {
      from: 'arun261104@gmail.com',
      to: `arun261104@gmail.com, ${email}`, // Send to yourself
      replyTo: email, // reply to user's email
      subject: `New Contact Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    res.status(200).json({ success: true, message: 'Email sent successfully' });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send email',
      details: error.message
    });
  }
});

export default router;
