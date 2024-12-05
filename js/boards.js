document.addEventListener("DOMContentLoaded", function() {
    fetchData();
});

async function fetchData() {
    try {
        const response = await fetch('https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Boards'); // Substitua com a URL da API
        const items = await response.json();

        const cardsContainer = document.getElementById('cards-container');
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.id = `${item.Id}`;
            card.innerHTML = `
                <h3>${item.Name}</h3>
                <hr />
                <p>${item.Description}</p>
            `;
            cardsContainer.appendChild(card);
            document.getElementById(`${item.Id}`).addEventListener('click', function(){
                localStorage.removeItem('boardId');
                localStorage.setItem('boardId', `${item.Id}`);
                window.location.href = 'columns.html';
            })
        });
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}
