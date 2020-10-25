function descendent(a, b){ return b.data.height - a.data.height }
function ascendent(a, b){ return a.data.height - b.data.height }

function rearrange(ui, chart, fn){
    chart = chart.sort(fn);
    chart.forEach((x, i) => {
        x.svg.animate()
            .dy(calcTranslation(ui, x, i))
            .after(() => update(ui, x, i))
    });
}

function calcTranslation(ui, d, j){
    // translate from position i to j
    return calcY(ui, j) - d.data.y;
}

function update(ui, x, i){
        x.data.i = i;
        x.data.y = calcY(ui, i);
}

function shuffle(a,b){ return 0.5 - Math.random(); }

function height(ui){ return ui.height; }
function width(ui){ return maxn(ui) * (barw(ui) + barMarg(ui)) * barMarg(ui); }
function offset(ui){ return ui.offset }
function maxn(ui){ return ui.n; }
function set(ui){ return ui.set; }
function barw(ui){ return ui.barw; }
function maxBarh(ui){ return ui.maxBarH; }
function barMarg(ui){ return barw(ui)/margin(UI); }
function margin(ui) { return ui.margin }
function addButton(ui, fn){ ui.buttons.push(fn) }
function buttons(ui) { return ui.buttons; }
function colorScale(ui, cat) { return ui.colorScale[cat]; }
function calcY(ui, i){ return offset(ui) + i * (barw(ui) + barMarg(ui)); }

function scale(minData, maxData, min, max){
    return (max - min) / (maxData - minData);
}

function max(data){
    let m = data[0];
    data.forEach(x => { if (x > m) m = x });
    return m;
}

function linearScale(ui, data){ return  maxBarh(ui)/max(data) }

function asBars(ui, data){
    const scale = linearScale(ui, data.map(x => x.height));
    function bar(x, i){
        return { name: x.name
               , i: i
               , width: barw(ui)
               , height: scale * x.height
               , y: calcY(ui, i)
               , color: colorScale(ui, x.cat) }
    }
    return data.map((x, i) => bar(x, i));
}
