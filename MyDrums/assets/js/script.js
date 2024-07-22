document.body.addEventListener('keyup' , (event) => {
    playSound(event.code.toLowerCase());
});

document.querySelector('.composer button').addEventListener('click', () => {
    let inpEl = document.querySelector('#input').value;
    songArray = inpEl.split('');
    if(songArray != ''){
        console.log(songArray)
        playComposition(songArray);
    }

});

function playSound(key) { 
    let soundEl = document.querySelector(`#s_${key}`);
    let keyEl = document.querySelector(`div[data-key="${key}"]`)

    if(soundEl) {
        soundEl.currentTime = 0;
        soundEl.play();
    }

    if(keyEl) {
        keyEl.classList.add('active')
        setTimeout(()=> {
            keyEl.classList.remove('active');
        }, 300);
    }
}

function playComposition(songArray){ 
    let wait = 0; 

    for(let songItem of songArray) {
        setTimeout(() => {
            playSound(`key${songItem}`);
        }, wait);
        wait += 200;
    }
}


