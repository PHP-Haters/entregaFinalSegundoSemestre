import api from "./api.js";

document.addEventListener("DOMContentLoaded", function () {
    fetchData().then(() => {
        geraItensPorColuna();
    });
});

async function geraItensPorColuna() {
    try {
        const colunas = document.querySelectorAll('.column'); // Seleciona todos os elementos com a classe 'column'
        console.log(colunas);

        for (const coluna of colunas) {
            const response = await fetch(api + 'TasksByColumnId?ColumnId=' + `${coluna.id}`);
            const tasks = await response.json(); // Adiciona await para esperar a conversão para JSON

            const p = document.getElementById(`${coluna.id}`);

            tasks.forEach(task => {
                const item = document.createElement('p');
                item.className = '';
                item.id = `${task.Id}`;
                item.innerHTML = `
                    <h3>${task.Name}</h3>
                    <hr />
                `;
                p.appendChild(item);
            });
        }

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

async function fetchData() {
    try {
        const boardId = localStorage.getItem('boardId');
        const response = await fetch(api + 'ColumnByBoardId?BoardId=' + boardId); // Substitua com a URL da API
        const items = await response.json();

        const cardsContainer = document.getElementById('cards-container');
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card column';
            card.id = `${item.Id}`;
            card.innerHTML = `
                <h3>${item.Name}</h3>
                <hr />
            `;
            cardsContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

async function criaNovaColuna() {
    var boardId = localStorage.getItem('boardId');
    var userId = JSON.parse(localStorage.getItem('usuario_logado')).Id;
    
    try {
        const response = await fetch(api + 'Column', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "BoardId": boardId,
                "Name": "teste",
                "Position": "0",
                "IsActive": "true",
                "CreatedBy": userId,
                "UpdatedBy": userId
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json(); // Assumindo que a API retorna dados em formato JSON

        return result;
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
    }
}
