
class Legend {

    config = new Config();
    element = document.createElement('div');
    bodyElement = document.createElement('div');
    addButton = document.createElement('div');

    constructor() {
    }

    render(motherElement) {
        //main element
        this.element.className = this.config.classes.legend;

        // button
        this.addButton.className = this.config.classes.legendAddButton;
        this.addButton.innerText = 'add to schedule';
        this.element.appendChild(this.addButton);

        //body
        this.bodyElement.className = this.config.classes.legend + '-body';
        this.element.appendChild(this.bodyElement);

        motherElement.appendChild(this.element);
    }
}



