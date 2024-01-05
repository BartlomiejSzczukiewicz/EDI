let myChart = null;
let currentChartType = 'bar'; 
let currentData = null;  //nie dotykac bo error

document.getElementById('loadData').addEventListener('click', function() {
    fetch('https://my.api.mockaroo.com/Whatever2.json', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': '98097d00'
        }
    })
    .then(response => response.json())
    .then(data => {
        currentData = data; 
        displayData(data);
        createChart(currentData, currentChartType);
    })
});

function displayData(data) {
    var html = '<table><tr><th>Name</th><th>Amount</th></tr>';
    data.forEach(row => {
        html += `<tr><td>${row.name}</td><td>${row.amount}</td></tr>`;
    });
    html += '</table>';
    document.getElementById('data').innerHTML = html;
}

function createChart(data, chartType) {
    var ctx = document.getElementById('myChart').getContext('2d');
    if (myChart) {
        myChart.destroy();
    }
    myChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: data.map(item => item.name),
            datasets: [{
                label: 'Amount',
                data: data.map(item => item.amount),
                backgroundColor: 'rgba(255, 255, 255, 0.247)',
                borderColor: 'rgba(255,255,255,0.247)',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

document.getElementById('switchChartType').addEventListener('click', function() {
    currentChartType = currentChartType === 'bar' ? 'line' : 'bar';
    if (currentData) {
        createChart(currentData, currentChartType);
    }
});
