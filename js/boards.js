import api from "./api.js";

document.addEventListener("DOMContentLoaded", getBoards);

async function getBoards() {
    try {
        const response = await fetch(api + 'Boards');
        const items = await response.json();

        updateScreen(items);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

function updateScreen(boards){
    const cardsContainer = document.getElementById('cards-container');
    boards.forEach(board => {
        const card = document.createElement('div');
        card.className = 'card';
        card.id = `${board.Id}`;
        card.innerHTML = `
            <h3>${board.Name}</h3>
            <hr />
            <p>${board.Description}</p>
        `;
        cardsContainer.appendChild(card);
        document.getElementById(`${board.Id}`).addEventListener('click', function(){
            localStorage.removeItem('boardId');
            localStorage.setItem('boardId', `${board.Id}`);
            window.location.href = 'columns.html';
        })
    });
}