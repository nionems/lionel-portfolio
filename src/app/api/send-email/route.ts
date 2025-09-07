import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, subject, message } = await request.json();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

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

    // Send both emails
    await Promise.all([
      transporter.sendMail(notificationMailOptions),
      transporter.sendMail(autoReplyOptions),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
