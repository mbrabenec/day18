class ProgressBar {

  constructor(from, to, step, onchange) {
    this.current = from;
    this.from = from;
    this.to = to;
    this.step = step;
    this.interval;
    this.timeout;
    this.onchange = onchange;
    
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
    


    /// plus button
    const plus_button = div.querySelector('.btn-plus');

    plus_button.addEventListener('click', () => {
      this.increaseClick()
    })
    plus_button.addEventListener('mousedown', () => {
      this.increase()
    })
    plus_button.addEventListener('mouseup', () => {
      this.stop()
    })
    plus_button.addEventListener('mouseleave', () => {
      this.stop()
    })

    /// minus button
    const minus_button = div.querySelector('.btn-minus');

    minus_button.addEventListener('click', () => {
      this.decreaseClick()
    })
    minus_button.addEventListener('mousedown', () => {
      this.decrease()
    })
    minus_button.addEventListener('mouseup', () => {
      this.stop()
    })
    minus_button.addEventListener('mouseleave', () => {
      this.stop()
    })

    return div
  }
  
//////////////////////////////

  increaseClick() {

    if (this.current + this.step <= this.to) {
      this.current += this.step
      this.update();
    }
  }

  increase() {
  this.timeout = setTimeout(() => {
    this.interval = setInterval(() => {
      this.increaseClick();
    }, 10)
  }, 200)
  }

  stop () {
    clearInterval(this.interval);
    clearTimeout(this.timeout);
  }

  decreaseClick() {

      if (this.current - this.step >= this.from) {
        this.current -= this.step
        this.update();
      }
  }
  decrease() {
    this.timeout = setTimeout(() => {
      this.interval = setInterval(() => {
        this.decreaseClick();
      }, 10)
    }, 200)

}

  update() {
    this.bar.querySelector('.knob').style.width = `${(this.current / this.to) * 100}%`
    this.bar.querySelector('.counter').textContent = this.current;
    this.onchange(this.current);
  }

  
  renderTo(element) {
    element.appendChild(this.bar)
  }
}



/// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// 

function a (inp) {
  console.log(inp);
}


const p1 = new ProgressBar(0, 255, 1, r);
p1.renderTo(document.querySelector(".p1"))

const p2 = new ProgressBar(0, 255, 1, b)
p2.renderTo(document.querySelector(".p2"))

const p3 = new ProgressBar(0, 255, 1, g)
p3.renderTo(document.querySelector(".p3"))

// let button = document.getElementById("col__button")

// button.addEventListener("click", () => {

//   const r = p1.current;
//   const g = p2.current;
//   const b = p3.current;

//   

//   button.style.backgroundColor = newcol;

// })


let red = 0; 
let blue = 0;
let green = 0;

function r (inp) {
  red = inp;
  dispNew();
}

function b (inp) {
  blue = inp;
  dispNew();
}

function g (inp) {
  green = inp;
  dispNew();
}

function dispNew() {
  let newcol = `rgb(${red},${green},${blue})`;
  document.body.style.backgroundColor = newcol;
}
