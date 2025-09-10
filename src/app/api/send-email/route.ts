import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, subject, message } = await request.json();

    // Validate environment variables
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Missing Gmail environment variables');
      return NextResponse.json(
        { success: false, error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Create transporter with production-ready configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    });

    // Verify transporter configuration
    await transporter.verify();

    // Email to you (notification)
    const notificationMailOptions = {
      from: process.env.GMAIL_USER,
      to: 'coevoetlionel@gmail.com',
      subject: `New Contact Form Submission - ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This message was sent from your portfolio contact form.</em></p>
      `,
    };

    // Auto-reply to the sender
    const autoReplyOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Lionel Coevoet',
      html: `
        <h2>Thank you for your message!</h2>
        <p>Hi ${firstName},</p>
        <p>Thank you for reaching out through my portfolio contact form. I have received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message:</strong></p>
        <p><em>"${message}"</em></p>
        <hr>
        <p>Best regards,<br>Lionel Coevoet</p>
        <p><em>This is an automated response. Please do not reply to this email.</em></p>
      `,
    };

    // Send both emails with proper error handling
    try {
      await Promise.all([
        transporter.sendMail(notificationMailOptions),
        transporter.sendMail(autoReplyOptions),
      ]);
      
      console.log('Emails sent successfully');
      return NextResponse.json({ success: true });
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in email API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
