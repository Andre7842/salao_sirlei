document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      window.location.href = "admin index.html";
    })
    .catch(error => {
      alert("Falha ao entrar: " + error.message);
    });
});