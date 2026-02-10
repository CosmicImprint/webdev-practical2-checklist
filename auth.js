function checkPassword() {
  const input = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (input === "practical2") {
    document.getElementById("login").style.display = "none";
    document.getElementById("content").hidden = false;
  } else {
    error.textContent = "Incorrect password";
  }
}
