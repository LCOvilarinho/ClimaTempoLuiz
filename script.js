const cidades = [
    { nome: 'São Paulo', lat: -23.5505 , lon: -46.6333},
    { nome: 'Rio de Janeiro', lat: -22.9068, lon: -43.1729},
    { nome: 'Belo Horizonte', lat: -19.9167, lon: -43.9345},
    { nome: 'Brasília', lat: -15.7801, lon: -47.9292},
    { nome: 'Salvador', lat: -12.9711, lon: -38.5108},
    { nome: 'Fortaleza', lat: -3.7319, lon: -38.5267},
];

const apiKey = 'YOUR_API_KEY';

async function getTemperatura(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly`;
    const response = await fetch(url, { headers: { 'Authorization': apiKey }});
    const data = await response.json();
    return data.hourly.temperature_2m[0].value;
}

async function atualizarTemperaturas() {
    for (const cidade of cidades) {
        const div = document.getElementById(cidade.nome.toLowerCase().replace(' ', '-'));
        const temperatura = await getTemperatura(cidade.lat, cidade.lon);
        div.querySelector('.data').textContent = new Date().toLocaleDateString();
        div.querySelector('.temperatura').textContent = temperatura.toFixed(1);
    }
}

atualizarTemperaturas();
setInterval(atualizarTemperaturas, 600000);


  




