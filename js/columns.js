import api from "./api.js";

document.addEventListener("DOMContentLoaded", async() => {
    const currentBoard = await getBoardById(localStorage.getItem('boardId'));
    const pageTitle = document.querySelector('.page-title');

    pageTitle.innerText += ` em "${currentBoard.Name}"`;

    console.log(currentBoard);
    document.title = currentBoard.Name;

    getColumns().then(() => {
        // geraItensPorColuna();
    });
});

async function getBoardById(id){
    try {
        let response = await fetch(api + 'Board?BoardId=' + id);
        const board = await response.json();

        return board;
    } catch (error) {
        return error;
    }
}
document.getElementById('col-form').addEventListener('submit', (event) => {
    event.preventDefault()
})
document.getElementById('submit-col').addEventListener('click', (event)=>{
    event.preventDefault();
    createCol();
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

async function delColumn(id){
    try {
        let response = await fetch(api + 'Column?ColumnId=' + id, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log(`Coluna ${id} deletado com sucesso.`);
            
            getColumns(); //Pega os boards novamente e atualiza a tela
        } else {
            console.error(`Erro ao deletar a coluna ${id}:`, response.statusText);
            alert(`Erro ao deletar a coluna: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Erro na requisição DELETE:', error);
        alert('Ocorreu um erro ao deletar a coluna. Tente novamente mais tarde.');
    }
}

async function getColumns() {
    try {
        const boardId = localStorage.getItem('boardId');
        const response = await fetch(api + 'ColumnByBoardId?BoardId=' + boardId); // Substitua com a URL da API
        const items = await response.json();

        const orderedColumns = items.sort((a, b) => b.Id - a.Id);

        updateScreen(orderedColumns);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

function updateScreen(columns){
    const colsContainer = document.getElementById('columns-container');
    colsContainer.innerHTML = '';

        columns.forEach(column => {
            const col = document.createElement('div');
            col.className = 'column';
            col.id = `${column.Id}`;
            col.innerHTML = `
                <div class="column-head">
                    <h3>${column.Name}</h3>
                </div>
                
                <hr class="divisive"/>
                <div class="tasks-holder"></div>
            `;

            // Criando o botão "Deletar"
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-btn';
            deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

            // Associando a função deleteBoard ao botão
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Evita que o clique afete o evento do card
                delColumn(column.Id);
            });

            // Criando o botão "Editar"
            const editButton = document.createElement('button');
            editButton.className = 'edit-btn';
            editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';

            // Associando a função editBoard ao botão
            editButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Evita que o clique afete o evento do card

            });

            col.querySelector('.column-head').appendChild(editButton);
            col.querySelector('.column-head').appendChild(deleteButton);

            colsContainer.appendChild(col);
        });
}

async function createCol() {
    var boardId = localStorage.getItem('boardId');
    var userId = JSON.parse(localStorage.getItem('usuario_logado')).Id;
    let colName = document.querySelector('#column-name').value;
    
    try {
        const response = await fetch(api + 'Column', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "BoardId": boardId,
                "Name": colName,
                "Position": 1,
                "IsActive": "true",
                "CreatedBy": userId,
                "UpdatedBy": userId
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json(); // Assumindo que a API retorna dados em formato JSON
        
        getColumns();
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
    }
}
