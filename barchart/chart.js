function createChart(data){
    // Bar chart.
    let chart = data.map(d => drawBar(d));
    // Sorting button.
    addButton(UI, ascendent);
    addButton(UI, descendent);
    addButton(UI, by_continent);
    addButton(UI, shuffle);
    renderButtons(UI, chart);
    return chart;
}


/* --------------- Chart -------------------*/
// Creation and manipulation of the chart

function drawBar(data){
    let rect = svg.rect(data.height, data.width)
        .x(190)

    let lable = svg.text(data.name)
        .font({ anchor: 'end' })
        .dx(170)
        .addClass('lable');


    let bar = svg.group()
        .add(rect)
        .add(lable)
        .attr({ fill: data.color })
        .y(data.y)
        .addClass('bar');

    return { data: data, svg: bar };
}


function renderButtons(ui, chart){
    let n = 0;
    buttons(ui).forEach(fn => {
        svg.rect(60, 40)
            .fill('#999')
            .move(100 + n * 80, 20)
            .click(() => rearrange(ui, chart, fn));
        n++;
    });
}

