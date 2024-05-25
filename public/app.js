// Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyDdNRIob2Dc3BkX7IexZHTZyRsyGIZX-qo",
    authDomain: "portfoliobuilder-554bb.firebaseapp.com",
    projectId: "portfoliobuilder-554bb",
    storageBucket: "portfoliobuilder-554bb.appspot.com",
    messagingSenderId: "735743958460",
    appId: "1:735743958460:web:b46252c1354b8706cb5fb9"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  const auth = firebase.auth();
  
  // Login Functionality
  document.getElementById('login-btn').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then((result) => {
        window.location = 'form.html';
      })
      .catch((error) => {
        console.error("Error during login", error);
      });
  });
  

  // Handle form submission
document.getElementById('portfolioForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
  
    // Save data to Firestore
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
  
    await db.collection('portfolios').doc(user.uid).set(data);
  
    // Redirect to preview page
    window.location = 'preview.html';
  });
  
  // Load data for preview
  if (window.location.pathname === '/preview.html') {
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
  
    db.collection('portfolios').doc(user.uid).get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        // Render data in preview
      } else {
        console.error("No such document!");
      }
    }).catch((error) => {
      console.error("Error getting document:", error);
    });
  }
  