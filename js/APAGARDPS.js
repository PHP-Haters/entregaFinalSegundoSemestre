async function changeConfig(personId, themeId) {
 
 const response = fetch(`https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/ConfigPersonTheme?PersonId=${personId}`, {
     method: 'PATCH',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
         "ThemeId": themeId
     }),
   });
 response.then(response => response.json());
 response.then(data => console.log(data));
}

