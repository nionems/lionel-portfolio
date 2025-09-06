import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

// Initialize Firebase Admin
admin.initializeApp();

// Create a nodemailer transporter
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: functions.config().gmail.user,
    pass: functions.config().gmail.password
  }
});

// Function to send email when a new contact message is created
export const sendContactEmail = functions.firestore
  .document('contactMessages/{messageId}')
  .onCreate(async (snap, context) => {
    const messageData = snap.data();
    const messageId = context.params.messageId;

    // Email content
    const mailOptions = {
      from: functions.config().gmail.user,
      to: 'coevoetlionel@gmail.com', // Your email address
      subject: `New Contact Form Submission - ${messageData.firstName} ${messageData.lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${messageData.firstName} ${messageData.lastName}</p>
        <p><strong>Email:</strong> ${messageData.email}</p>
        <p><strong>Subject:</strong> ${messageData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${messageData.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This message was sent from your portfolio contact form.</em></p>
        <p><em>Message ID: ${messageId}</em></p>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully for message:', messageId);
      return null;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  });

// Function to send auto-reply to the person who submitted the form
export const sendAutoReply = functions.firestore
  .document('contactMessages/{messageId}')
  .onCreate(async (snap, context) => {
    const messageData = snap.data();

    // Auto-reply email content
    const autoReplyOptions = {
      from: functions.config().gmail.user,
      to: messageData.email,
      subject: 'Thank you for contacting Lionel Coevoet',
      html: `
        <h2>Thank you for your message!</h2>
        <p>Hi ${messageData.firstName},</p>
        <p>Thank you for reaching out through my portfolio contact form. I have received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message:</strong></p>
        <p><em>"${messageData.message}"</em></p>
        <hr>
        <p>Best regards,<br>Lionel Coevoet</p>
        <p><em>This is an automated response. Please do not reply to this email.</em></p>
      `
    };

    try {
      await transporter.sendMail(autoReplyOptions);
      console.log('Auto-reply sent successfully to:', messageData.email);
      return null;
    } catch (error) {
      console.error('Error sending auto-reply:', error);
      // Don't throw error for auto-reply failures
      return null;
    }
  });
