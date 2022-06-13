// responsive nav
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("nav--visible");
});

// authentication functions
const token = localStorage.getItem("token");

axios({
  method: "get",
  url: "http://127.0.0.1:8000/api/v1/auth/profile",
  headers: {
    Authorization: "Bearer " + token,
  },
})
  .then(function (res) {
    let username = res.data.name;
    document.getElementById("username").innerHTML = username;
  })
  .catch(function (e) {
    console.log("Error ", e);
  });

const logout_btn = document.getElementById("logout_btn");
const logout = (e) => {
  e.preventDefault();

  //linking to logout api
  axios({
    method: "post",
    url: "http://127.0.0.1:8000/api/v1/auth/logout",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then(function (res) {
    console.log(res.data.message);
    localStorage.clear();
    window.location.href = "./login.html";
  });
};

logout_btn.addEventListener("click", logout);
