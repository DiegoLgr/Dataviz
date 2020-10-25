class Visualization{
    constructor(){
        this.buttons = [];
        this.data = {};
        this.chart = {};
        this.svg = {};

}

    setSVG(svg){ this.svg = svg; return this; }
    setButtons(callbacks){
        callbacks.forEach(x => this.buttons.push(x));
        return this;
    }
    setData(data) {
        this.data = data;
        return this;
    }
    setChart(chart){
        this.chart = chart;
        return this;
    }
    setUi(ui){
        this.ui = ui;
        return this;
    }

    draw(){
        this.svg = SVG('#chart').size(width(this.ui), height(this.ui));
        this.barChart = new BarChart(
             22,
            520,
            ['#313962', '#5f6caf', '#95ce8e', '#e65a28'],
            100,
            10,
            this.svg,
        );
        this.barChart.enter(this.data);
        this.renderButtons()
        return this;
    }


    renderButtons(){
    let n = 0;
    this.buttons.forEach(fn => {
        this.svg.rect(60, 40)
            .fill('#999')
            .move(100 + n * 80, 20)
            .click(() => this.barChart.rearrange(fn));
        n++;
    });
}

    log(){ console.log("hola");
        console.log("data:", this.data);
        console.log("buttons:", this.buttons);
        return this;
    }

}

function height(ui){ return ui.height; }
function width(ui){ return maxn(ui) * (barw(ui) + barMarg(ui)) * barMarg(ui); }
function barw(ui){ return ui.barw; }
function margin(ui) { return ui.margin }
function barMarg(ui){ return barw(ui)/margin(UI); }
function maxn(ui){ return ui.n; }
