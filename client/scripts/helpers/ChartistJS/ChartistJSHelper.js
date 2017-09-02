let size = 100;
let horizontal = new Array(size);

let series;
series = new Array(0);

for(let i = 0; i <= size; i++){
    horizontal[i] = i;
}

function repaintChart() {
    series.length = 0;

    for (var i = 0; i < terms.length; i++){
        let serial = getSeriesByTerm(terms[i].term(),100);
        series.push(serial);
    }

    chart.update();
}

var data = {
        labels: horizontal,
        series: series
    };

let plotOptions = {
    showPoint: false,
    lineSmooth: false,
        
    axisX: {
        showGrid: false,
        showLabel: false
    },

    axisY: {
        offset: size,
        labelInterpolationFnc: function (value) {
            return value;
        }
    }
};