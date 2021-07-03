function parsearDecimales(numeroString) {
    return parseFloat(parseFloat(numeroString).toFixed(3))
}

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function generarTabla(h, To, Y1, Y2, Tf, idTabla, cantDecimales) {
    let $bodyTabla = $(`#${idTabla} tbody`);
    $bodyTabla.empty();
    rungeKutta = new RungeKutta(h, To, Y1, Y2);


    let paso = h;

    for (let proxT = parseFloat(To); proxT <= Tf; paso++) {
        //calculo los Ki y Li
        rungeKutta.calcularKiLi();
        //calculo el Y1(i+1)
        rungeKutta.calcularProxY1();
        //calculo el Y2(i+1)
        rungeKutta.calcularProxY2();


        //completo la rabla con los datos obtenidos
        $bodyTabla.append(
            $('<tr>').append(
                $('<td>').text(rungeKutta.getT().toFixed(cantDecimales)),
                $('<td>').text(rungeKutta.getY1().toFixed(cantDecimales)),
                $('<td>').text(rungeKutta.getY2().toFixed(cantDecimales)),
                $('<td>').text(rungeKutta.getK1().toFixed(cantDecimales)),
                $('<td>').text(rungeKutta.getK2().toFixed(cantDecimales)),
                $('<td>').text(rungeKutta.getK3().toFixed(cantDecimales)),
                $('<td>').text(rungeKutta.getK4().toFixed(cantDecimales)),
                $('<td>').text(rungeKutta.getL1().toFixed(cantDecimales)),
                $('<td>').text(rungeKutta.getL2().toFixed(cantDecimales)),
                $('<td>').text(rungeKutta.getL3().toFixed(cantDecimales)),
                $('<td>').text(rungeKutta.getL4().toFixed(cantDecimales)),
                $('<td>').text(rungeKutta.getProxY1().toFixed(cantDecimales)),
                $('<td>').text(rungeKutta.getProxY2().toFixed(cantDecimales))
            )
        );

        proxT = parsearDecimales(rungeKutta.getT() + rungeKutta.getH());
        let proxY1 = rungeKutta.getProxY1();
        let proxY2 = rungeKutta.getProxY2();

        rungeKutta.setT(proxT);
        rungeKutta.setY1(proxY1);
        rungeKutta.setY2(proxY2);
    }
}

function generarGrafico(h, To, Y1, Y2, Tf, idGrafico, cantDecimales) {
    let $grafico = $(`#${idGrafico}`);
    $grafico.empty();

    var arrayTiempo = new Array();
    var arrayY1 = new Array();
    var arrayY2 = new Array();

    rungeKutta = new RungeKutta(h, To, Y1, Y2);


    let paso = h;

    for (let proxT = parseFloat(To); proxT <= Tf; paso++) {
        //calculo los Ki y Li
        rungeKutta.calcularKiLi();
        //calculo el Y1(i+1)
        rungeKutta.calcularProxY1();
        //calculo el Y2(i+1)
        rungeKutta.calcularProxY2();


        // guardo datos en arrays
        arrayTiempo.push(rungeKutta.getT());
        arrayY1.push(parseFloat(rungeKutta.getY1().toFixed(cantDecimales)));
        arrayY2.push(parseFloat(rungeKutta.getY2().toFixed(cantDecimales)));


        proxT = parsearDecimales(rungeKutta.getT() + rungeKutta.getH());
        let proxY1 = rungeKutta.getProxY1();
        let proxY2 = rungeKutta.getProxY2();

        rungeKutta.setT(proxT);
        rungeKutta.setY1(proxY1);
        rungeKutta.setY2(proxY2);
    }

    $grafico.highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: `Variacion Y1 en el Tiempo con h= ${ rungeKutta.getH()}`
        },

        xAxis: {
            categories: arrayTiempo
        },
        yAxis: {
            title: {
                text: 'Y1'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                /*  enableMouseTracking: false */
            }
        },
        series: [{
            name: 'Y1',
            data: arrayY1
        }]
    });


}
