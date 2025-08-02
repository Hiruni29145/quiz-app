function startQuiz() {
  const username = document.getElementById("username").value.trim();
  if (username === "") {
    alert("Please enter your name.");
    return;
  }

  localStorage.setItem("username", username); 
  window.location.href = "quiz.html"; // Redirect to quiz page
}
const username = localStorage.getItem("username") || "Guest";
document.getElementById("username-display").textContent = username;

function startQuiz() {
  const username = document.getElementById("username").value.trim();

  if (!username) {
    alert("Please enter your name.");
    return;
  }

  // Always reset timer and store fresh start
  localStorage.setItem("username", username);
  localStorage.setItem("quizStartTime", Date.now());

  //  Redirect to quiz
  window.location.href = "quiz.html";
}


