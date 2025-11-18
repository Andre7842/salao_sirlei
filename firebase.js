<!-- firebase.js -->
<!-- Inclua este script antes de script.js e script-admin.js em cada página -->
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore-compat.js"></script>

<script>
  // Config do Firebase que você enviou
  const firebaseConfig = {
    apiKey: "AIzaSyB8zRbSH1nB8NmqeEFj7iDBZB9RqfufflE",
    authDomain: "sirlei-studios.firebaseapp.com",
    projectId: "sirlei-studios",
    storageBucket: "sirlei-studios.firebasestorage.app",
    messagingSenderId: "107743588118",
    appId: "1:107743588118:web:bc5da05f327ef094412a37",
    measurementId: "G-53YWDTQ1JL"
  };

  // Inicializa
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();

  // Disponibiliza globalmente
  window.firebaseApp = firebase;
  window.auth = auth;
  window.db = db;
</script>