// responsive nav with hamburger menu
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("nav--visible");
});

// const getAllProducts = async () => {
//   try {
//     const res = await axios.get(`http://localhost:8000/api/v1/all_products`);
//     console.log(res.data);
//   } catch (e) {
//     console.log("Error ", e);
//   }
// };
//
// getAllProducts();
//linking with get_all_products api

// authenticating

//linking to profile api to display the user's name
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

const id = localStorage.getItem("id");

axios({
  method: "get",
  url: `http://127.0.0.1:8000/api/v1/get_favorites/${id}`,
}).then(function (res) {
  let favorites = res.data.data;
  for (let i = 0; i < favorites.length; i++) {
    let id = favorites[i]["id"];
    let name = favorites[i]["name"];
    let price = favorites[i]["price"];
    let category = favorites[i]["category"];
  }
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
