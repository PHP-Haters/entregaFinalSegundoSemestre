// Pegar o nome do usuário e colocar no header
const userNameSection = document.querySelector('#username-section');
export const loggedUser = JSON.parse(localStorage.getItem("usuario_logado"));

userNameSection.innerText = loggedUser.Name;
pegarThemeId();
async function pegarThemeId(personId, themeId) {
 personId = 6;
 themeId = 2;
    const response = fetch(`https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/PersonConfigById?PersonId=${personId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    response.then(response => response.json());
    response.then(data => console.log(data));

   }
   

   
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
