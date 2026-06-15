# 📧 EmailJS Setup Instructions

Follow these steps to connect your contact form to your email:

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a FREE account
3. Verify your email address

## Step 2: Add Email Service
1. Go to "Email Services" in your EmailJS dashboard
2. Click "Add New Service"
3. Choose "Gmail" (or your email provider)
4. Connect your email account
5. Copy the **Service ID**

## Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```
Subject: New Contact Form Message - {{subject}}

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save and copy the **Template ID**

## Step 4: Get Your Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

## Step 5: Update Your Portfolio
Open `script.js` and replace:

```javascript
// Replace these with your actual values:
emailjs.init("YOUR_PUBLIC_KEY");          // Your Public Key
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
//           ↑ Service ID      ↑ Template ID
```

## Step 6: Test Your Form
1. Open your portfolio
2. Fill out the contact form
3. Check your email inbox!

## 🎯 What You'll Receive
When someone submits the form, you'll get an email with:
- Their name and email
- Subject they selected
- Their message
- Sent directly to your inbox!

## 📝 Notes
- Free plan: 200 emails/month
- Messages are sent instantly
- No server required
- Works on any hosting platform

---
**Need Help?** Check EmailJS documentation: https://www.emailjs.com/docs/