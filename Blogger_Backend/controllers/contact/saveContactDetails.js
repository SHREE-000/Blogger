import { ContactUs } from "../../models";
import nodemailer from 'nodemailer';

export const saveContactDetails = async(req, res) => {
    try {
        const {
            username,
            email,
            phoneNum,
            message,
        } = req.body;

        const response = await ContactUs.create({
            username,
            email,
            phoneNum,
            message,
        });

        const emailContent = `
  <html>
    <head>
      <style>
        /* Inline CSS styles for formatting */
        body {
          font-family: Arial, sans-serif;
        }
        h2 {
          color: #333;
        }
        p {
          margin-bottom: 10px;
        }
      </style>
    </head>
    <body>
      <h2>Contact Us Inquiry</h2>
      <p><strong>Name:</strong> ${username}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Email:</strong> ${phoneNum}</p>
      <p><strong>Message:</strong> ${message}</p>
      
      <p>Thank you for contacting us.</p>
      <p>Best regards,</p>
      <p>Sameera MP</p>
    </body>
  </html>
`;

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            service: 'gmail',
            auth: {
              user: process.env.SENDER_EMAIL,
              pass: process.env.GMAIL_APP_PASSWORD
            }
          });

          const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: process.env.TO_EMAIL,
            cc: `${process.env.CC_EMAIL1}, ${process.env.CC_EMAIL2}`,
            subject: 'Enquiry from customer',
            html: emailContent,
          };
          
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Error sending email:', error);
            } else {
              console.log('Email sent:', info.response);
            }
          });
          
          

        return res.status(201).json(response);
    } catch (error) {
        throw new Error(error)
    }
};