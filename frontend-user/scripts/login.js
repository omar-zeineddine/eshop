const container = document.querySelector(".container"),
  pwShowHide = document.querySelectorAll(".showHidePw"),
  pwFields = document.querySelectorAll(".password"),
  signUp = document.querySelector(".signup-link"),
  login_link = document.querySelector(".login-link");

//  show/hide password and change icon
pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    pwFields.forEach((pwField) => {
      if (pwField.type === "password") {
        pwField.type = "text";

        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye-slash", "uil-eye");
        });
      } else {
        pwField.type = "password";

        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye", "uil-eye-slash");
        });
      }
    });
  });
});

// reveal signup or login form accordingly
signUp.addEventListener("click", () => {
  container.classList.add("active");
});
login_link.addEventListener("click", () => {
  container.classList.remove("active");
});

let login_btn = document.getElementById("login_btn");
let register_btn = document.getElementById("register_btn");

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

      window.location.href = "./browse.html";
    })
    .catch(function (error) {
      console.log("did not pass");
    });
};

// sign up
let register = (e) => {
  e.preventDefault();
  let data = new FormData();

  data.append("name", document.getElementById("name").value);
  data.append("email", document.getElementById("email").value);
  data.append("password", document.getElementById("password").value);
  data.append(
    "password_confirmation",
    document.getElementById("password_confirmation").value
  );

  //linking with sign up api
  axios({
    method: "post",
    url: "http://127.0.0.1:8000/api/v1/auth/register",
    data: data,
  })
    .then(function (response) {
      console.log(response.data);
      alert(
        response.data.user.name +
          " has successfully registered! \nPlease login to proceed"
      );
    })
    .catch(function (error) {
      console.log("did not pass");
    });
};

// event listeners
login_btn.addEventListener("click", login);
register_btn.addEventListener("click", register);
