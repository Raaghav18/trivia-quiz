// Firebase Configuration Test Utility
import { auth } from '../config/firebase';
import { signInAnonymously, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export const testFirebaseConnection = async () => {
  console.log('Testing Firebase connection...');
  
  try {
    // Test 1: Check if auth object exists
    if (!auth) {
      console.error('❌ Firebase auth object is not initialized');
      return false;
    }
    console.log('✅ Firebase auth object is initialized');
    
    // Test 2: Check if we can access auth methods
    if (typeof auth.signInAnonymously !== 'function') {
      console.error('❌ Firebase auth methods are not available');
      return false;
    }
    console.log('✅ Firebase auth methods are available');
    
    // Test 3: Try to sign in anonymously (this will fail if config is wrong)
    try {
      const result = await signInAnonymously(auth);
      console.log('✅ Anonymous sign-in successful:', result.user.uid);
      
      // Sign out immediately
      await auth.signOut();
      console.log('✅ Sign-out successful');
      
      return true;
    } catch (error) {
      console.error('❌ Anonymous sign-in failed:', error.message);
      console.error('This usually means your Firebase configuration is incorrect');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Firebase test failed:', error);
    return false;
  }
};

export const testGoogleSignIn = async () => {
  console.log('Testing Google sign-in...');
  
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log('✅ Google sign-in successful:', result.user.displayName);
    
    // Sign out immediately
    await auth.signOut();
    console.log('✅ Google sign-out successful');
    
    return true;
  } catch (error) {
    console.error('❌ Google sign-in failed:', error.message);
    
    if (error.code === 'auth/popup-closed-by-user') {
      console.log('ℹ️ User closed the popup - this is normal during testing');
      return true;
    }
    
    return false;
  }
};

// Run tests when this file is imported
export const runFirebaseTests = async () => {
  console.log('🧪 Running Firebase configuration tests...');
  
  const connectionTest = await testFirebaseConnection();
  
  if (connectionTest) {
    console.log('🎉 Firebase configuration is working correctly!');
    return true;
  } else {
    console.log('💥 Firebase configuration has issues. Please check FIREBASE_SETUP.md');
    return false;
  }
}; 