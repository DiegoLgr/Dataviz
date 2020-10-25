class Visualization{
    constructor(){
        this.buttons = [];
        this.data = {};
        this.chart = {};
    }

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

    rearrange(fn){
        chart = this.chart.sort(fn);
        chart.forEach((x, i) => {
            x.svg.animate()
                .dy(calcTranslation(this.ui, x, i))
                .after(() => update(this.ui, x, i))
        });
    }

    draw(){
        this.chart = this.data.map(d => drawBar(d));
        this.renderButtons()
        return this;
    }

    renderButtons(){
    let n = 0;
    this.buttons.forEach(fn => {
        svg.rect(60, 40)
            .fill('#999')
            .move(100 + n * 80, 20)
            .click(() => this.rearrange(fn));
        n++;
    });
}

    log(){ console.log("hola");
        console.log("data:", this.data);
        console.log("buttons:", this.buttons);
        return this;
    }
}
