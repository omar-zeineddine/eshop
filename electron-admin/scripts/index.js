let login_btn = document.getElementById("login_btn");

// login on click
let login = (e) => {
  e.preventDefault();
  let data = new FormData();

  data.append("email", document.getElementById("login_email").value);
  data.append("password", document.getElementById("login_password").value);

  axios({
    method: "post",
    url: "http://127.0.0.1:8000/api/v1/auth/login",
    data: data,
  })
    .then(function (response) {
      //storing the token in local storage
      let token = response.data.access_token;
      localStorage.setItem("token", token);

      window.location.href = "./admin.html";
    })
    .catch(function (error) {
      console.log("did not pass");
    });
};

// event listeners
login_btn.addEventListener("click", login);
