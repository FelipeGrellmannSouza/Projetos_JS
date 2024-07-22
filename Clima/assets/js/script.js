document.querySelector('.search').addEventListener('submit', (event) => {
    event.preventDefault(); //Evita o comportamento padrão do formulário
    let input = document.querySelector('#searchInput').value;    

    if (input !== '') {
        clearInfo();
        showWarning('carregando...');
        readWeather(input);
    } else {
        clearInfo();
    }
});

async function readWeather(city) { 
    const apiKey = '3fd497cdc740c44e5401404a328ddf42'; 
    city = encodeURI(city);
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`);
    let json = await response.json();

    if (json.cod === 200) {
        showWeather({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            weather: json.weather[0].icon,
            windSpeed: json.wind.speed,
            windAngle: json.wind.deg
        });
    } else {
        clearInfo();
        showWarning('localização não encontrada');
    } 
}

function showWeather(info){
    showWarning('');
    document.querySelector('.title').innerHTML = `${info.name} | ${info.country}`;
    document.querySelector('.tempInfo').innerHTML = `${info.temp}<sup>ºC</sup>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${info.weather}@2x.png`)
    document.querySelector('.windInfo').innerHTML = `${info.windSpeed}<span>km/h</span>`;
    document.querySelector('.windDot').style.transform = `rotate(${info.windAngle - 90}deg)`;
    document.querySelector('.result').style.display = 'block';
}

function showWarning(msg) {
    document.querySelector('.warning').innerHTML = msg; 
}

function clearInfo() { 
    showWarning('');
    document.querySelector('.result').style.display = 'none';
}
