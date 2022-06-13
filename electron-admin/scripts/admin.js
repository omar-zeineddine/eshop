// responsive nav with hamburger menu
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("nav--visible");
});

// check token
const token = localStorage.getItem("token");

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

const add_cat_btn = document.getElementById("add_category_btn");
let category_name = document.getElementById("category_name");

add_cat_btn.addEventListener("click", async function () {
  if (category_name.value == "") {
    alert("enter a category name");
  } else {
    let category_data = new FormData();
    category_data.append("name", category_name.value);

    await axios({
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      method: "post",
      url: "http://127.0.0.1:8000/api/v1/admin/add_category",
      data: category_data,
    }).then(function (res) {
      if (res.data["success"]) {
        console.log(res);
      } else {
        alert("Something went wrong");
      }
    });
  }
});

const getAllCategories = async () => {
  const config = {
    header: { Accept: "application/json", Authorization: `Bearer ${token}` },
  };
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/v1/admin/all_categories`,
      config
    );
    console.log(res.data);
  } catch (e) {
    console.log("Error ", e);
  }
};

getAllCategories();
