# Firebase Authentication Setup Guide

## Current Error
You're seeing: `Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.)`

This means your Firebase project configuration needs to be updated.

## Step-by-Step Fix

### 1. Go to Firebase Console
1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Sign in with your Google account
3. Select your project (or create a new one if needed)

### 2. Get Your Project Configuration
1. Click the **gear icon** (⚙️) next to "Project Overview" to open Project Settings
2. Scroll down to the **"Your apps"** section
3. If you don't see a web app, click **"Add app"** and select the web icon (</>)
4. Register your app with a nickname (e.g., "trivia-quiz-web")
5. Copy the configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### 3. Update Your Firebase Configuration
Replace the values in `src/config/firebase.js` with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

### 4. Enable Authentication
1. In Firebase Console, go to **Authentication** in the left sidebar
2. Click **"Get started"**
3. Go to the **"Sign-in method"** tab
4. Enable **"Google"** as a sign-in provider:
   - Click on **"Google"**
   - Toggle the switch to **"Enable"**
   - Add your support email
   - Click **"Save"**

### 5. Set Up Firestore Database (for scores)
1. In Firebase Console, go to **Firestore Database** in the left sidebar
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select a location close to your users
5. Click **"Done"**

### 6. Set Up Security Rules (Optional but Recommended)
In Firestore Database → Rules, update the rules to:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /scores/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 7. Test Your Setup
1. Restart your development server:
   ```bash
   npm run dev
   ```
2. Try to sign in with Google
3. Check the browser console for any errors

## Common Issues and Solutions

### Issue: "API key not valid"
**Solution**: Make sure you copied the entire API key correctly from Firebase Console

### Issue: "Project not found"
**Solution**: Verify your project ID matches exactly what's in Firebase Console

### Issue: "Authentication domain not authorized"
**Solution**: 
1. Go to Authentication → Settings → Authorized domains
2. Add `localhost` for development
3. Add your production domain when deploying

### Issue: "Firestore permission denied"
**Solution**: 
1. Check your Firestore security rules
2. Make sure you're signed in before trying to save scores

## Environment Variables (Optional)
For better security, you can use environment variables:

1. Create a `.env` file in your project root:
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

2. Update `src/config/firebase.js` to use environment variables:
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## Need Help?
If you're still having issues:
1. Check the browser console for specific error messages
2. Verify your Firebase project is active and not suspended
3. Make sure you have the correct permissions for the Firebase project
4. Try creating a new Firebase project if the current one has issues 