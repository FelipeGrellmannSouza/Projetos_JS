//------INITIAL DATA------
let currentColor = 'black'; //corInicial Ativa
let canDrawn = false;
let mouseX = 0;
let mouseY = 0;

let screen = document.querySelector('#tela'); //seleciona a tela
let context = screen.getContext('2d');// contexto da tela

//------EVENTS------
//seleciona todos os color e add neles uma função click chamando colorClickEvent
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);     
});

screen.addEventListener('mousedown', mouseDownEvent);//apertar o mouse
screen.addEventListener('mousemove', mouseMoveEvent);//mover o mause
screen.addEventListener('mouseup', mouseUpEvent);//soltar o mouse

document.querySelector('.clear').addEventListener('click', clearScreen);

//------FUNCTIONS------
//colorClickEvent recebe o e que é o evento da cor clickada
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color'); //mostra a data color da cor clicada
    currentColor = color;// define a cor clicada como a cor atual
    document.querySelector('.color.active').classList.remove('active');//remove o active das cores
    e.target.classList.add('active');//adiciona a active na cor clickada que é o evento e
}

function mouseDownEvent(e) {
    canDrawn = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}
function mouseMoveEvent(e) {
    if(canDrawn){
        drawn(e.pageX, e.pageY);
    }
}
function mouseUpEvent() {
    canDrawn = false;
}
function drawn(x, y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    context.beginPath(); 
    context.lineWidth = 5;
    context.lineJoin = "round";
    context.moveTo(mouseX, mouseY);
    context.lineTo(pointX, pointY);
    context.closePath();
    context.strokeStyle = currentColor;
    context.stroke();

    mouseX = pointX;
    mouseY = pointY;
}

function clearScreen() {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

