class ProgressBar {
  constructor(from, to, step) {
    this.current = from
    this.from = from
    this.to = to
    this.step = step
    
    this.bar = this._createBar()
  }
  
  _createBar() {
    const div = document.createElement('div')
    div.innerHTML = `
      <div class="label">
        <span class="counter"></span>/<span class="maximum"></span>
      </div>
      <div class="progress">
        <div class="btn-minus"></div>
        <div class="bar">
          <div class="knob"></div>
        </div>
        <div class="btn-plus"></div>
      </div>
    `
    
    div.querySelector('.counter').textContent = this.from
    div.querySelector('.maximum').textContent = this.to
    div.querySelector('.knob').style.width = `${(this.from / this.to) * 100}%`
    div.querySelector('.btn-minus').addEventListener('click', () => {
      this.decrease()
    })
    div.querySelector('.btn-plus').addEventListener('click', () => {
      this.increase()
    })
    return div
  }
  
  decrease() {
    if (this.current - this.step >= this.from) {
      this.current -= this.step
    }
    this.update()
  }
  
  increase() {
    if (this.current + this.step <= this.to) {
      this.current += this.step
    }
    this.update()
  }
  
  update() {
    this.bar.querySelector('.knob').style.width = `${(this.current / this.to) * 100}%`
    this.bar.querySelector('.counter').textContent = this.current
  }
  
  renderTo(element) {
    element.appendChild(this.bar)
  }
}

const bar = new ProgressBar(0, 200, 50)
bar.renderTo(document.body)

const bar2 = new ProgressBar(0, 50, 13)