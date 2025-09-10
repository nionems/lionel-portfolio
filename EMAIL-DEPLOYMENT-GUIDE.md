# Email Deployment Fix Guide

## 🚨 Problem
Email functionality works locally but fails when deployed to production.

## 🔍 Root Cause
Environment variables (`GMAIL_USER` and `GMAIL_APP_PASSWORD`) are not configured in your deployment platform.

## ✅ Solution Steps

### Step 1: Configure Environment Variables in Vercel

1. **Go to Vercel Dashboard**:
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your portfolio project

2. **Add Environment Variables**:
   - Go to **Settings** → **Environment Variables**
   - Click **Add New**
   - Add these variables:

   ```
   Name: GMAIL_USER
   Value: coevoetlionel@gmail.com
   Environment: Production, Preview, Development
   ```

   ```
   Name: GMAIL_APP_PASSWORD
   Value: vnwg dtty ohpf gzgd
   Environment: Production, Preview, Development
   ```

3. **Redeploy**:
   - After adding variables, go to **Deployments**
   - Click **Redeploy** on your latest deployment
   - Or push a new commit to trigger automatic deployment

### Step 2: Verify Gmail App Password

1. **Check Gmail Settings**:
   - Go to [myaccount.google.com](https://myaccount.google.com)
   - Security → 2-Step Verification → App passwords
   - Make sure you have an app password for "Mail"

2. **App Password Format**:
   - Should be 16 characters: `vnwg dtty ohpf gzgd`
   - No spaces in the actual password (spaces are just for readability)

### Step 3: Test Email Functionality

1. **Use the Test Script**:
   ```bash
   # Update the URL in test-email-deployment.js with your actual domain
   node test-email-deployment.js
   ```

2. **Test via Contact Form**:
   - Go to your deployed portfolio
   - Navigate to Contact page
   - Submit a test message
   - Check your email for notifications

### Step 4: Check Deployment Logs

1. **Vercel Function Logs**:
   - Go to Vercel Dashboard → Functions
   - Click on your deployment
   - Check the logs for any errors

2. **Common Error Messages**:
   - `Missing Gmail environment variables` → Environment variables not set
   - `Authentication failed` → Wrong app password
   - `Connection timeout` → Network/firewall issues

## 🔧 Code Improvements Made

### Enhanced Error Handling
- Added environment variable validation
- Improved error logging
- Better error messages for debugging

### Production-Ready Configuration
- Added explicit SMTP settings
- TLS configuration for production
- Connection verification

### Security Improvements
- Environment variable validation
- Proper error handling without exposing sensitive data

## 🚀 Alternative Solutions

If Gmail continues to have issues in production, consider:

1. **SendGrid** (Recommended):
   ```bash
   npm install @sendgrid/mail
   ```

2. **Mailgun**:
   ```bash
   npm install mailgun-js
   ```

3. **Amazon SES**:
   ```bash
   npm install aws-sdk
   ```

## 📋 Checklist

- [ ] Environment variables added to Vercel
- [ ] Gmail app password is correct
- [ ] Project redeployed after adding variables
- [ ] Email functionality tested
- [ ] Check deployment logs for errors
- [ ] Verify both notification and auto-reply emails work

## 🆘 Troubleshooting

### Still Not Working?

1. **Check Vercel Function Logs**:
   - Look for specific error messages
   - Verify environment variables are loaded

2. **Test Environment Variables**:
   ```javascript
   console.log('GMAIL_USER:', process.env.GMAIL_USER ? 'Set' : 'Not set');
   console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? 'Set' : 'Not set');
   ```

3. **Try Different SMTP Settings**:
   - Port 465 with `secure: true`
   - Port 587 with `secure: false`

4. **Contact Support**:
   - Vercel support for deployment issues
   - Gmail support for authentication issues

## 📞 Need Help?

If you're still having issues, check:
1. Vercel deployment logs
2. Gmail app password validity
3. Network connectivity from Vercel to Gmail
4. Consider switching to a dedicated email service
