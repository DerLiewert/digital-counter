class DigitsCounter {
    constructor(counterItem) {
        console.log('counterItem', counterItem.dataset);
        this.options = {
            value: counterItem.dataset.counterValue ? counterItem.dataset.counterValue : 0,
            startVal: counterItem.dataset.counterStartValue ? +counterItem.dataset.counterStartValue : 0,
            duration: counterItem.dataset.counterDuration ? +counterItem.dataset.counterDuration * 1000 : 1000,
            useGrouping: !0,
            separator: counterItem.dataset.counterSeparator ? counterItem.dataset.counterSeparator : "",
            decimal: counterItem.dataset.counterDecimal ? counterItem.dataset.counterDecimal : ".",
            prefix: counterItem.dataset.counterPrefix ? counterItem.dataset.counterPrefix : "",
            suffix: counterItem.dataset.counterSuffix ? counterItem.dataset.counterSuffix : "",
            steps: counterItem.dataset.counterSteps ? counterItem.dataset.counterSteps : "",
            enableScrollSpy: !1,
            scrollSpyDelay: 200,
            scrollSpyOnce: !1
        };
        this.counterItem = counterItem;
    }

    startAnimation() {
        let stepValue = this.options.value / this.options.duration;
        let startTimestamp = null;

       
        const indexDecimal = this.options.value.lastIndexOf('.');
        const isInteger = indexDecimal === -1;
        console.log('indexDecimal', indexDecimal);
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            let progress = timestamp - startTimestamp;
            
            //let currentValue = Math.floor(stepValue * progress);
            let currentValue = isInteger ? Math.floor(stepValue * progress) : (stepValue * progress).toFixed(this.options.value.length - 1 - indexDecimal);
            this.counterItem.innerHTML = this.options.prefix + currentValue.toString().replace('\.',`${this.options.decimal}`).replace(/(\d)(?=(\d{3})+(\D|$))/g, `$1${this.options.separator}`) + this.options.suffix;
            if(progress < this.options.duration) {
                window.requestAnimationFrame(step);
            } else {
                this.counterItem.innerHTML = this.options.prefix + this.options.value.toString().replace('\.',`${this.options.decimal}`).replace(/(\d)(?=(\d{3})+(\D|$))/g, `$1${this.options.separator}`) + this.options.suffix;
            }
        }    
        window.requestAnimationFrame(step);    
    }

    valueDisplaySettings(value) {
    }
}

const counter = new DigitsCounter(document.querySelector('[data-counter]'), {prefix: "$"})
counter.startAnimation();
console.log('counter', counter);
