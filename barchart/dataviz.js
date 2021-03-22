/* --------------- Chart ------------------- */
class BarChart {
  constructor (barw, maxBarh, colorScale, offset, barMargin, maxn) {
    this.barw = barw
    this.maxBarh = maxBarh
    this.colorScale = colorScale
    this.offset = offset
    this.barMarg = barMargin
    this.maxn = maxn

    this.chart = undefined
    this.svg = undefined
    this.bars = undefined
  }

  getWidth () {
    return this.maxn * (this.barw + this.barMarg) * this.barMarg
  }

  setSVG (svg) { this.svg = svg }

  enter (data) {
    this.bars = this.asBars(data)
    return this
  }

  draw () {
    this.chart = this.bars.map(x => this.drawBar(x))
    return this
  }

  drawBar (data) {
    const rect = this.svg.rect(data.height, data.width)
      .x(190)

    const lable = this.svg.text(data.name)
      .font({ anchor: 'end' })
      .dx(170)
      .addClass('lable')

    const bar = this.svg.group()
      .add(rect)
      .add(lable)
      .attr({ fill: data.color })
      .y(data.y)
      .addClass('bar')

    return { data: data, svg: bar }
  }

  rearrange (fn) {
    chart = this.chart.sort(fn)
    chart.forEach((x, i) => {
      x.svg.animate()
        .dy(this.calcTranslation(x, i))
        .after(() => this.update(x, i))
    })
  }

  calcTranslation (d, j) {
    // translate from position i to j
    return this.calcY(j) - d.data.y
  }

  update (x, i) {
    x.data.i = i
    x.data.y = this.calcY(i)
  }

  calcY (i) { return this.offset + i * (this.barw + this.barMarg) }

  asBars (data) {
    const scale = this.scaleLinear(data.map(x => x.height))
    const bar = (x, i) => {
      return {
        name: x.name,
        i: i,
        width: this.barw,
        height: scale * x.height,
        y: this.calcY(i),
        color: this.scaleColor(x.cat)
      }
    }
    return data.map((x, i) => bar(x, i))
  }

  scaleLinear (data) { return this.maxBarh / max(data) }
  scaleColor (cat) { return this.colorScale[cat] }

  log () { console.log(this) }
}

function scale (minData, maxData, min, max) {
  return (max - min) / (maxData - minData)
}
function max (data) {
  let m = data[0]
  data.forEach(x => { if (x > m) m = x })
  return m
}

function descendent (a, b) { return b.data.height - a.data.height }

function ascendent (a, b) { return a.data.height - b.data.height }
function shuffle (a, b) { return 0.5 - Math.random() }
