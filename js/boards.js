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

async function deleteBoard(id) {
    try {
        const response = await fetch(api + 'Board?BoardId=' + id, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log(`Board ${id} deletado com sucesso.`);
            
            getBoards(); //Pega os boards novamente e atualiza a tela
        } else {
            console.error(`Erro ao deletar o board ${id}:`, response.statusText);
            alert(`Erro ao deletar o board: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Erro na requisição DELETE:', error);
        alert('Ocorreu um erro ao deletar o board. Tente novamente mais tarde.');
    }
}

function updateScreen(boards){
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = ''; //Limpa a tela

    boards.forEach(board => {
        const card = document.createElement('div');
        card.className = 'card';
        card.id = `${board.Id}`;
        card.innerHTML = `
            <h3>${board.Name}</h3>
            <hr />
            <p>${board.Description}</p>
            <div class="board-btns">
                
            </div>
        `;

        // Adicionando o botão "Deletar"
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

        // Associando a função deleteBoard ao botão
        deleteButton.addEventListener('click', function (event) {
            event.stopPropagation(); // Evita que o clique afete o evento do card
            deleteBoard(board.Id);
        });

        // Adicionando o botão "Deletar"
        const editButton = document.createElement('button');
        editButton.className = 'edit-btn';
        editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';

        // Adiciona o botão dentro do div.board-btns
        card.querySelector('.board-btns').appendChild(editButton);
        card.querySelector('.board-btns').appendChild(deleteButton);

        cardsContainer.appendChild(card);
        document.getElementById(`${board.Id}`).addEventListener('click', function(){
            localStorage.removeItem('boardId');
            localStorage.setItem('boardId', `${board.Id}`);
            window.location.href = 'columns.html';
        })
    });
}