// responsive nav with hamburger menu
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("nav--visible");
});

// check token
let token = localStorage.getItem("token");

if (!token) {
  location.href = "index.html";
}

// constants
const logout_btn = document.getElementById("logout_btn");

// event listeners
logout_btn.addEventListener("click", async function () {
  alert("logging out");
  localStorage.removeItem("token");

  await axios({
    method: "post",
    url: "http://127.0.0.1:8000/api/v1/auth/logout",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  location.reload();
});
