// dados iniciais
let gameGrid = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}

let vez = '';
let msg = '';
let playing = false;

reset();

//eventos 
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemCLick);
});

//funções
function itemCLick(event) {
    let item = event.target.getAttribute('data-item');
    if(playing && gameGrid[item] === ''){
        gameGrid[item] = player;
        renderGrid();
        changeTurn()
    }
}

function randomInitialPlayer() {
    randomNuber = ((Math.random()*10)+1).toFixed(0);
    if (randomNuber%2 === 0){
        return 'x';
    } else {
        return 'o';
    }
}

function reset() {
    msg = '';
    player = randomInitialPlayer();

    for (let i in gameGrid) {
        gameGrid[i] = '';
    }

    playing = true;
    renderGrid(); 
    renderInfo();
}

function renderGrid() {
    for (let i in gameGrid) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = gameGrid[i];
    }
    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = msg;
}

function changeTurn() {
    if (player === 'x') {
        player = 'o';
    } else { 
        player = 'x';
    }
    renderInfo();
}

function checkGame() {
    if(checkWinnerFor('x')) {
        msg = 'o "X" ganhou';
        playing = false;
    } else if (checkWinnerFor('o')){
        msg = 'o "O" ganhou';
        playing = false;
    } else if (isFull()) {
        msg = 'Deu empate';
        playing = false;
    }
}

function checkWinnerFor(player) {
    let wPos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ]

    for (let w in wPos) {
        let pArray = wPos[w].split(',');
        let hasWon = pArray.every(option => gameGrid[option] === player);
        if(hasWon) {
            return true;
        }
    }

    return false;
}

function isFull() {
    for(let i in gameGrid){
        if(gameGrid[i] === '') {
            return false;
        }
    }
    return true;
}