const darkModeBotao = document.getElementById('dark-mode-button');
const errorMessage = document.getElementById('error-message');
const body = document.body;


darkModeBotao.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

darkModeBotao.addEventListener('click', async function getUserId(){
    let themeType; 
    var buttonState = document.getElementById('dark-mode-button').checked;

//2 é dark-mode, 1 é light-mode. ELE TEM QUE SER 1 OU 2, N PODE SER 0. 
    if (buttonState == true) {
       themeType == 2;
    }
    if (buttonState == false) {
        themeType == 1;
     }


    var usuario = JSON.parse(localStorage.getItem("usuario_logado"));
    var response = await changeConfig(usuario.Id, themeType);
});


async function changeConfig(personId, themeType) {
    const response = fetch(`https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/ConfigPersonTheme?PersonId=${personId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "ThemeId": themeType
        }),
      });
    response.then(response => response.json());
    response.then(data => console.log(data));
}