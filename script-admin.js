function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login index.html";
  });
}