// Pegar o nome do usuário e colocar no header
const userNameSection = document.querySelector('#username-section');
const loggedUser = JSON.parse(localStorage.getItem("usuario_logado"));

userNameSection.innerText = loggedUser.Name;

//Permitir que o usuário faça logout
const logoutBtn = document.querySelector('#loggout-btn');

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('usuario_logado');
    location.href = '/index.html';
});

//Redireciona para a página do usuário
const userSection = document.querySelector('.user-section');

userSection.addEventListener('click', () => {
    location.href = '/user.html';
});