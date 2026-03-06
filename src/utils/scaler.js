
class Scaler {
    scalingObject;
    handleEl;
    height;
    width;


    constructor(scalingObject, height = 700, width = 1000) {
        //init values
        this.scalingObject = scalingObject;
        this.height = height;
        this.width = width

        this.handleEl = this.createElement();

        //adding styles and element
        this.scalingObject.style.transformOrigin = 'right top';
        this.setSize()

        scalingObject.appendChild(this.handleEl)
    }

    createElement() {
        const el = document.createElement('div');
        el.style.cssText = `
            position: absolute;
            left: 0;
            bottom: 0;
            height: 50px;
            width: 50px;
            z-index: 1;
            cursor: nesw-resize;
        `
        this._handleEvents(el);
        return el
    }

    _handleEvents(el) {
        let isMouseDown = false

        let startX = 0;
        let offsetX = 0;

        let startY = 0;
        let offsetY = 0;

        el.addEventListener('mousedown', (e) => {
            isMouseDown = true
            startX = e.clientX;
            startY = e.clientY;
        });

        document.addEventListener('mousemove', (e) => {
            if(isMouseDown) {
                offsetX = startX - e.clientX;
                offsetY = startY - e.clientY;

                this.scalingObject.style.transform = `
                    scaleX(${1 + (offsetX / this.width)})
                    scaleY(${1 - (offsetY / this.height)})`
            }
        })

        document.addEventListener('mouseup', (e) => {
            if(isMouseDown) {

                this.scalingObject.style.transform = ''
                this.height = this.height * (1 - (offsetY / this.height));
                this.width = this.width * (1 + (offsetX / this.width));
                this.setSize()

            }
            isMouseDown = false

        })
    }

    setSize() {
        this.scalingObject.style.height = this.height + 'px';
        this.scalingObject.style.width = this.width + 'px';
    } 
}