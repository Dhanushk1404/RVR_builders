import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function testMail() {
  const subject= "Hiiii";
  const text = "Helooo";

  const transporter = nodemailer.createTransport({
         host: 'smtp.gmail.com',
         port: 465,  // Use 465 for SSL
         secure: true, // Set to true for SSL
         auth: {
             user: "arun261104@gmail.com", // Your Gmail address
             pass: "cpob fruc vhwa ksta", // Your Gmail app password
         },
     });    
         const mailOptions = {
             from: "arun261104@gmail.com",
             to: "arunkarthiks.22cse@kongu.edu", // Make sure to store and use the user's email in the reminder
             subject,
             text,
         };
     
         try {
             await transporter.sendMail(mailOptions);
             console.log('Email sent successfully');
         } catch (error) {
             console.error('Error sending email:', error);
         }
     };

testMail();
