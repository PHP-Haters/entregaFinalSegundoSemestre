
const toggleThemeButton = document.getElementById('toggle-theme');
const body = document.body;

const showLoginButton = document.getElementById('show-login');
const errorMessage = document.getElementById('error-message');
const loginForm = document.getElementById('login-form');
const sendLogin = document.getElementById('btn-login');

toggleThemeButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});


function toggleForms(showForm, hideForm) {
    hideForm.classList.remove('active');
    showForm.classList.add('active');
}

function setActiveButton(activeButton, inactiveButton) {
    activeButton.classList.add('active');
    inactiveButton.classList.remove('active');
}

sendLogin.addEventListener('click', async function getUser(){
    var email = document.getElementById('login-email').value;

    var response = await loggin('https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/GetPersonByEmail?Email='+email);
    
    errorMessage.textContent = response.Errors[0];
});

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