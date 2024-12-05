const userNameSection = document.querySelector('#username-section');
const loggedUser = JSON.parse(localStorage.getItem("usuario_logado"));

userNameSection.innerText = loggedUser.Name;

