export class Visualization {
// This class shold be resposible of drawing all elements in the visualization,
  constructor (height, barchart) {
    this.height = height
    this.barChart = barchart

    this.buttons = []
    this.svg = {}
  }

  setButtons (callbacks) {
    callbacks.forEach(x => this.buttons.push(x))
    return this
  }

  draw () {
    this.svg = SVG('#chart')
    this.barChart.setSVG(this.svg)
    this.svg.size(this.barChart.getWidth(), this.height)
    this.barChart.draw()
    this.renderButtons()
    return this
  }

  renderButtons () {
    let n = 0
    this.buttons.forEach(fn => {
      this.svg.rect(60, 40)
        .fill('#999')
        .move(100 + n * 80, 20)
        .click(() => this.barChart.rearrange(fn))
      n++
    })
  }

  log () {
    console.log('hola')
    console.log('data:', this.data)
    console.log('buttons:', this.buttons)
    return this
  }
}
