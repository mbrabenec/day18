class ProgressBar {
    constructor(min, max, step) {
        this.level = min;
        this.min = min;
        this.max = max;
        this.step = step;
        
        this.bar = this._createBar()
    }

    _createBar() {
        const div = document.createElement("div");
        div.innerHTML = 
        `
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
        div.querySelector(".counter").textContent = this.min;
        div.querySelector(".maximum").textContent = this.max;
        div.querySelector(".knob").style.width = `${(this.min / this.max) * 100}%`

        div.querySelector('.btn-minus').addEventListener('click', () => {
          this.minus()
        })

        div.querySelector('.btn-plus').addEventListener('click', () => {
          this.plus()
        })
        return div
    }



    updateAll () {
        this.bar.querySelector(".knob").style.width = `${ (this.level - this.min) * 100/ (this.max - this.min) }%`
        this.bar.querySelector(".counter").textContent = this.level; 
    }


    minus () {
        if (this.level - this.step >= this.min) {
          this.level-= this.step;
          
        }
        this.updateAll()
      }
    
    plus () {
        if (this.level + this.step <= this.max) {
            this.level+= this.step;
            this.updateAll()
        }
        this.updateAll()
    }


  

    renderTo (element) {
        element.appendChild(this.bar);
    }


}


const bar1 = new ProgressBar(30, 165, 15);
bar1.renderTo(document.body);