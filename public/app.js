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
const db = firebase.firestore();
const storage = firebase.storage();

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
  if (window.location.pathname === '/form.html') {
    document.getElementById('portfolioForm').addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
  
      const user = auth.currentUser;
      const uid = user.uid;
  
      const photoFile = formData.get('photo');
      const resumeFile = formData.get('resume');
  
      if (photoFile) {
        const photoRef = storage.ref().child(`photos/${uid}/${photoFile.name}`);
        await photoRef.put(photoFile);
        data.photoURL = await photoRef.getDownloadURL();
      }
  
      if (resumeFile) {
        const resumeRef = storage.ref().child(`resumes/${uid}/${resumeFile.name}`);
        await resumeRef.put(resumeFile);
        data.resumeURL = await resumeRef.getDownloadURL();
      }
  
      await db.collection('portfolios').doc(uid).set(data);
      window.location = 'preview.html';
    });
  }
  

  if (window.location.pathname === '/preview.html') {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
  
        db.collection('portfolios').doc(uid).get().then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            // Render data in preview
            const previewDiv = document.getElementById('portfolioPreview');
            previewDiv.innerHTML = `
              <h1>${data.name}</h1>
              <p>${data.profession}</p>
              <img src="${data.photoURL}" alt="Profile Photo">
              <p>${data.bio}</p>
              <p>${data.education}</p>
              <p>${data.skills}</p>
              <p>${data.research}</p>
              <p>${data.interests}</p>
              <p>${data.awards}</p>
              <p>${data.email}</p>
              <p>${data.phone}</p>
              <p>${data.address}</p>
              <p>${data.social_media}</p>
              <a href="${data.resumeURL}">Download Resume</a>
            `;
          } else {
            console.error("No such document!");
          }
        }).catch((error) => {
          console.error("Error getting document:", error);
        });
      }
    });
  
    document.getElementById('download-btn').addEventListener('click', async () => {
      const user = auth.currentUser;
      const uid = user.uid;
      const doc = await db.collection('portfolios').doc(uid).get();
      const data = doc.data();
  
      const zip = new JSZip();
      zip.file('portfolio.html', `
        <h1>${data.name}</h1>
        <p>${data.profession}</p>
        <img src="${data.photoURL}" alt="Profile Photo">
        <p>${data.bio}</p>
        <p>${data.education}</p>
        <p>${data.skills}</p>
        <p>${data.research}</p>
        <p>${data.interests}</p>
        <p>${data.awards}</p>
        <p>${data.email}</p>
        <p>${data.phone}</p>
        <p>${data.address}</p>
        <p>${data.social_media}</p>
        <a href="${data.resumeURL}">Download Resume</a>
      `);
  
      const blob = await zip.generateAsync({type:"blob"});
      saveAs(blob, "portfolio.zip");
    });
  }
  
  