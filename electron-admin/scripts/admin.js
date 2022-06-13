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
const add_btn = document.getElementById("add_btn");

add_btn.addEventListener("submit", function (e) {
  e.preventDefault();
  const product_name = document.getElementById("product_name");
  const product_price = document.getElementById("product_price");
  const product_stock = document.getElementById("product_stock");
  const product_category = document.getElementById("product_category");

  let reader = new FileReader();
  reader.addEventListener("loadend", function () {
    let data = new FormData();
    data.append("name", product_name.value);
    data.append("price", product_price.value);
    data.append("stock", product_stock.value);
    data.append("category_id", product_category.value);
    axios({
      method: "post",
      url: "http//127.0.0.1:8000/api/v1/admin/add_product",
      headers: { Authorization: `Bearer ${token}` },
      data: data,
    }).then(function (res) {
      window.location.reload();
    });
  });
});

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
