// Test script to verify email functionality after deployment
// Run this with: node test-email-deployment.js

const testEmailAPI = async () => {
  const testData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'coevoetlionel@gmail.com', // Use your email for testing
    subject: 'Test Email from Deployment',
    message: 'This is a test email to verify the contact form is working after deployment.'
  };

  try {
    console.log('Testing email API...');
    console.log('Test data:', testData);
    
    const response = await fetch('https://your-deployed-url.vercel.app/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Email sent successfully!');
      console.log('Response:', result);
    } else {
      console.log('❌ Email failed to send');
      console.log('Status:', response.status);
      console.log('Error:', result);
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
};

// Run the test
testEmailAPI();
