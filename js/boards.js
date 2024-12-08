import api from "./api.js";
import { loggedUser } from './global.js';

const boardForm = document.getElementById("board-form");
const boardFormSubmit = document.getElementById("submit-board");

boardForm.addEventListener('submit', postBoard);
boardFormSubmit.addEventListener('click', postBoard);

async function postBoard(event){
    event.preventDefault();

    let boardName = document.getElementById("board-name");
    let boardDesc = document.getElementById("board-desc");

    try {
        const response = await fetch(api + 'Board', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "Name": boardName.value,
                "Description": boardDesc.value,
                "CreatedBy": loggedUser.Id,
            })
        });

        const res = await response.json();
        if(res.Errors){
            console.log(res.Errors[0])
            throw new Error(res.Errors[0]);
        } else if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        boardName.value = '';
        boardDesc.value = '';

        getBoards();
    } catch (error) {
        window.alert('Erro ao enviar dados: ' + error.message);
    }
}

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

        // Criando o botão "Deletar"
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

        // Associando a função deleteBoard ao botão
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Evita que o clique afete o evento do card
            deleteBoard(board.Id);
        });

        // Criando o botão "Editar"
        const editButton = document.createElement('button');
        editButton.className = 'edit-btn';
        editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';

        // Associando a função editBoard ao botão
        editButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Evita que o clique afete o evento do card
        });

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