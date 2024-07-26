//-------- GLOBAL DATA / CONFIG -------- 
const q = (el)=> document.querySelector(el);
const ql = (el)=> document.querySelectorAll(el);


//-------- ELEMENTS -------- 

let btnAdd= q('.add-item')
let modal = q('.window');
let btnDelete = q('.delete-item');
let btnCancel = q('#btnCancel');
let btnCreate = q('#btnCreate');

let inpTitle = q('.input_title');
let inpDesc = q('.input_desc');

let rdbIcon1 = q('#iconChoice1');
let rdbIcon2 = q('#iconChoice2');
let rdbIcon3 = q('#iconChoice3');
let rdgIcon = ql('.radio_options input');
//-------- EVENTS -------- 

btnAdd.addEventListener('click', openModal);
btnCancel.addEventListener('click', closeWindow);
btnCreate.addEventListener('click', createButton);





btnDelete.addEventListener('click', deleteButton);


//-------- FUNCTIONS -------- 

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
//
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
function deleteButton() {
    console.log(deltado);
}

function clearInputs() {
    inpTitle.value = '';
    inpDesc.value = '';
    rdbIcon1.checked = false;
    rdbIcon2.checked = false;
    rdbIcon3.checked = false;
}
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

    q('#to-do__area').append(task);
    clearInputs();
}
function verifyRdG() {
    if (rdbIcon1.checked === false && rdbIcon2.checked === false  && rdbIcon3.checked === false ) {
        return false;
    } else {
        return true;
    }
}


