
class Scaler {
    scalingObject;
    handleEl;
    currentScaleX;
    currentScaleY;
    height;
    width;


    constructor(scalingObject, initScale = {x: 0.5, y: 0.5}) {
        //init values
        this.scalingObject = scalingObject;
        this.currentScaleX = initScale.x;
        this.currentScaleY = initScale.y;

        const rect = scalingObject.getBoundingClientRect();
        this.height = rect.height;
        this.width = rect.width;

        this.handleEl = this.createElement();

        //adding styles and element
        this.scalingObject.style.cssText = 'transform-origin: right top;';
        this.scalingObject.style.transform = `
                    scaleX(${this.currentScaleX})
                    scaleY(${this.currentScaleY})`

        scalingObject.appendChild(this.handleEl)
    }

    createElement() {
        const el = document.createElement('div');
        el.style.cssText = `
            position: absolute;
            left: 0;
            bottom: 0;
            height: 100px;
            width: 100px;
            background-color: red;
            z-index: 1;
        `
        let mousedown = false

        let startX = 0;
        let offsetX = 0;

        let startY = 0;
        let offsetY = 0;

        el.addEventListener('mousedown', (e) => {
            mousedown = true
            startX = e.clientX;
            startY = e.clientY;
        });

        document.addEventListener('mousemove', (e) => {
            if(mousedown) {
                offsetX = startX - e.clientX;
                offsetY = startY - e.clientY;

                this.scalingObject.style.transform = `
                    scaleX(${this.currentScaleX + (offsetX / this.width)})
                    scaleY(${this.currentScaleY - (offsetY / this.height)})`
            }
        })

        document.addEventListener('mouseup', (e) => {
            if(mousedown) {

                this.currentScaleX = this.currentScaleX + (offsetX / this.width);
                this.currentScaleY = this.currentScaleY - (offsetY / this.height);
            }
            mousedown = false

        })
        return el
    }

    scale() {
        return {
            x:this.currentScaleX,
            y:this.currentScaleY
        }
    }



   

    
}