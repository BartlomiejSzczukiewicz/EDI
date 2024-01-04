let myChart = null; //ustala ze na poczatku tabelka nie istnieje (potrzebne, wczesniej byl error)

document.getElementById('loadData').addEventListener('click', function() {
    fetch('https://my.api.mockaroo.com/Whatever2.json', {  // fetch api method
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', //nie jestem tego pewien
            'X-API-Key': '98097d00'  //  mockaroo API Key
        }
    })
        .then(response => response.json()) //odpowiedz serwera tzn ten plik json
        .then(data => {
            displayData(data); //odpalamy funkcje z tym plikiem jako argumentem
            createChart(data);
        })
});

function displayData(data) {
    var html = '<table><tr><th>Name</th><th>Value</th></tr>';   //trzeba to ladniej zrobic (bootstrap)
    data.forEach(row => {
        html += `<tr><td>${row.name}</td><td>${row.value}</td></tr>`; //bylo na ostatnim projekcie tzw dynamiczne zapelnianie tabeli czyli for loop                 // html to zmienna ktorza przechowuje tworzaca sie tabelke, tak jakby
    });                                                                                                                                                             // po prostu tworzy stringa <tr><td>tu content co sie zmienia</td<td>sss</td></tr>
    html += '</table>'; // zamyka tworzona tabelke po skonczeniu petli                                                                                              // i tu kolejna iteracja <tr><td>tu content co sie zmienia2</td<td>sss2</td></tr>       
    document.getElementById('data').innerHTML = html; //ostatni krok to wrzucenie tej tabelki utworzonej na strone                                                  // <tr><td>tu content co sie zmienia3</td<td>sss3</td></tr>
}

function createChart(data) {
    var ctx = document.getElementById('myChart').getContext('2d');
    
    // usuwa poprzedni wykres
    if (myChart) {
        myChart.destroy();
    }

    // i tworzy nowy
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(item => item.name), //https://www.chartjs.org/docs/latest/getting-started/
            datasets: [{
                label: 'Dataset',
                data: data.map(item => item.value), // ten caly kod maja w poradniku na ich stronie jak to implementowac
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}