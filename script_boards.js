
document.addEventListener("DOMContentLoaded", function() {
    fetchData();
});

async function fetchData() {
    try {
        const response = await fetch('https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Boards'); // Substitua com a URL da API
        const tasks = await response.json();

        const taskList = document.getElementById('task-list');
        tasks.forEach(task => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${task.Id}</td>
                <td>${task.Name}</td>
                <td>${task.Description}</td>
                <td>${task.CreatedBy}</td>
            `;
            taskList.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}