const button = document.querySelector('.addtask');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-task');
let listadeitens = [];

function nova_tarefa() {
    if (input.value.trim() === '') {
        alert('Por favor, escreva uma tarefa.');
        return;
    }
    listadeitens.push({
        tarefa: input.value,
        concluida: false
    });
    input.value = '';
    mostrartarefa();
}

function mostrartarefa() {
    let novaLi = '';
    listadeitens.forEach((item, index) => {
        novaLi += `
            <li class="task ${item.concluida && "done"}">
                <img src="./img/trash.png" alt="trash-na-tarefa" onclick="deletarItem(${index})">
                <p>${item.tarefa}</p>
                <img src="./img/checked.png" alt="checked-na-tarefa" onclick="checkNaTarefa(${index})">
            </li>
        `;
    });
    listaCompleta.innerHTML = novaLi;
    localStorage.setItem('lista', JSON.stringify(listadeitens));
}

function checkNaTarefa(index) {
    listadeitens[index].concluida = !listadeitens[index].concluida;
    mostrartarefa();
}

function deletarItem(index) {
    listadeitens.splice(index, 1);
    mostrartarefa();
}

function recarregaritem() {
    const tarefasDoLocalS = localStorage.getItem('lista');
    if (tarefasDoLocalS) {
        listadeitens = JSON.parse(tarefasDoLocalS);
        mostrartarefa();
    }
}

button.addEventListener('click', nova_tarefa);
input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        nova_tarefa();
    }
});

recarregaritem();
