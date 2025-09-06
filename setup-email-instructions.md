# Email Setup Instructions for Contact Form

## Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

## Step 2: Login to Firebase
```bash
firebase login
```

## Step 3: Initialize Firebase Functions
```bash
firebase init functions
```
- Select your existing project: `lionel-portfolio-b8f25`
- Choose TypeScript
- Install dependencies: Yes

## Step 4: Set up Gmail App Password
1. Go to your Google Account settings
2. Enable 2-Factor Authentication if not already enabled
3. Go to "App passwords" section
4. Generate a new app password for "Mail"
5. Copy the 16-character password

## Step 5: Configure Firebase Functions
```bash
firebase functions:config:set gmail.user="coevoetlionel@gmail.com"
firebase functions:config:set gmail.password="your-16-character-app-password"
```

## Step 6: Deploy Functions
```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

## Step 7: Test the Contact Form
1. Go to your portfolio contact page
2. Submit a test message
3. Check your email for the notification
4. Check the sender's email for the auto-reply

## Troubleshooting
- If emails don't send, check Firebase Functions logs:
  ```bash
  firebase functions:log
  ```
- Make sure your Gmail app password is correct
- Ensure 2FA is enabled on your Google account
- Check that the functions deployed successfully

## Security Notes
- The app password is stored securely in Firebase Functions config
- Only you will receive the contact form notifications
- Auto-replies are sent to the person who submitted the form
- All email content is sanitized to prevent XSS attacks
