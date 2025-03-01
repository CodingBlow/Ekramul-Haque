// Shared Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAFYjRPxNwtOVCT7neOs3q41CbaNAxlNzc",
    authDomain: "my-clinic-1476c.firebaseapp.com",
    databaseURL: "https://my-clinic-1476c-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "my-clinic-1476c",
    storageBucket: "my-clinic-1476c.appspot.com",
    messagingSenderId: "690474104591",
    appId: "1:690474104591:web:f567dc6a6c29123ff7707a",
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Expose database globally (optional, or you can access it directly in other scripts)
  const database = firebase.database();