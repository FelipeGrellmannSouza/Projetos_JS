//-------- GLOBAL DATA / CONFIG -------- 
const q = (el)=> document.querySelector(el);
const ql = (el)=> document.querySelectorAll(el);
//-------- ELEMENTS -------- 
// modal
let modal = q('.window');
// botões 
let btnAdd= q('.add-item')
let btnCancel = q('#btnCancel');
let btnCreate = q('#btnCreate');

let trash = q('.delete-item');

// inputs
let inpTitle = q('.input_title');
let inpDesc = q('.input_desc');
// icon Radios
let rdbIcon1 = q('#iconChoice1');
let rdbIcon2 = q('#iconChoice2');
let rdbIcon3 = q('#iconChoice3');
let rdgIcon = ql('.radio_options input');

//areas de arraste
document.querySelectorAll('.list__area').forEach(area => {
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop)
});

//-------- EVENTS -------- 

btnAdd.addEventListener('click', openModal);
btnCancel.addEventListener('click', closeWindow);
btnCreate.addEventListener('click', createButton);

trash.addEventListener('dragover', dragOverTrash);
trash.addEventListener('drop', dropTrash);

//-------- FUNCTIONS -------- 
//Funções de arrate
//seleciona os item assim que são criados
function selectItens() {
    let alltaks = document.querySelectorAll('#to-do__area .item');
    alltaks.forEach(item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
    });    
}
function dragStart(e) {
    e.currentTarget.classList.add('dragging');
}
function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');
}
function dragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}
function dragLeave(e) {
    e.currentTarget.classList.remove('hover');
}
function drop(e) {
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging');
    e.currentTarget.appendChild(dragItem);
}
//Funções de criação
//abre o modal
function openModal() {
    modal.style.display = 'flex';
}
//fecha o modal
function closeWindow(e) {
    e.preventDefault();
    clearInputs();
    modal.style.display = 'none';
}
// função do botão criar
function createButton(e) {
    e.preventDefault();
    let rdbMarcked = verifyRdG()
    if (inpTitle.value == '' || inpDesc.value == '' ||  rdbMarcked == false ) {
        alert("Preencha todos os campos");
    } else {
        createTask();
        modal.style.display = 'none';
    }
}
// clona e completa o modelo e exibe na tela
function createTask () {
    rdgIcon.forEach((radio)=>{
        if (radio.checked === true) {
            icon = radio.value;
        }
    });
    //clonando
    let task = q('.models .item').cloneNode(true);
    //preenchendo com as informações
    task.querySelector('.item__icon').innerHTML = icon;
    task.querySelector('.item__title').innerHTML = inpTitle.value;
    task.querySelector('.item__desc').innerHTML = inpDesc.value;
    //exibindo
    q('#to-do__area').append(task);
    clearInputs();
    selectItens();
}
function verifyRdG() {
    if (rdbIcon1.checked === false && rdbIcon2.checked === false  && rdbIcon3.checked === false ) {
        return false;
    } else {
        return true;
    }
}

//limpa os campos
function clearInputs() {
    inpTitle.value = '';
    inpDesc.value = '';
    rdbIcon1.checked = false;
    rdbIcon2.checked = false;
    rdbIcon3.checked = false;
}

//delete 
function dragOverTrash(e){
    e.preventDefault();
}
function dropTrash(e) {
    let dragItem = document.querySelector('.item.dragging');
    if (dragItem.parentNode) {
        dragItem.parentNode.removeChild(dragItem);
    }
}

