document.addEventListener("DOMContentLoaded", function () {
    fetchData().then(() => {
        geraItensPorColuna();
    });
});

async function geraItensPorColuna() {
    try {
        const colunas = document.querySelectorAll('.column'); // Seleciona todos os elementos com a classe 'column'

        for (const coluna of colunas) {
            const response = await fetch('https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/TasksByColumnId?ColumnId=' + `${coluna.id}`);
            const tasks = await response.json(); // Adiciona await para esperar a conversão para JSON

            const columnContainer = document.getElementById(`${coluna.id}`);

            tasks.forEach(task => {
                const item = document.createElement('p');
                item.className = 'card column';
                item.id = `${task.Id}`;
                item.innerHTML = `
                    <h3>${task.Name}</h3>
                    <hr />
                `;
                columnContainer.appendChild(item);
            });
        }

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

async function fetchData() {
    try {
        const boardId = localStorage.getItem('boardId');
        const response = await fetch('https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/ColumnByBoardId?BoardId=' + boardId); // Substitua com a URL da API
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
        const response = await fetch('https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Column', {
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
