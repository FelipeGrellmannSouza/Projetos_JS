let digitalEl = document.querySelector('.digital');
let secEl = document.querySelector('.p_s');
let minEl = document.querySelector('.p_m');
let hourEl = document.querySelector('.p_h');

function updateClock(){
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    digitalEl.innerHTML = `${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`;

    let secDeg = ((360 / 60) * second) - 90;
    let minDeg = (360 / 60) * minute + (second / 10) - 90;
    let hourdeg = ((360 / 12) * hour + (minute / 2) + (second / 120)) - 90;

    secEl.style.transform = `rotate(${secDeg}deg)`;
    minEl.style.transform = `rotate(${minDeg}deg)`;    
    hourEl.style.transform = `rotate(${hourdeg}deg)`;
}
function fixZero(time) {
    return time < 10 ? `0${time}` : time;
}

setInterval(updateClock, 1000);
updateClock();