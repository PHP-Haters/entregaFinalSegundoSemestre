const errorMessage = document.getElementById('error-message');
const loginForm = document.getElementById('login-form');
const sendLogin = document.getElementById('btn-login');
const form = document.querySelector('#login-form');

form.addEventListener('submit', sendFormData);
sendLogin.addEventListener('click', sendFormData);

async function sendFormData(event){
    event.preventDefault();
    var email = document.getElementById('login-email').value;

    var response = await loggin('https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/GetPersonByEmail?Email='+email);

    errorMessage.textContent = 'Erro: ' + response.Errors[0];
}

async function loggin(url) {
    try {
        var response = await fetch(url);

        if (response.status == 200) {
            var user = await response.json();

            localStorage.setItem("usuario_logado", JSON.stringify(user));
            window.location.href = 'boards.html';
        }
        else{
            return await response.json();
        }
    } catch (error) {
        return error;
    }
}
