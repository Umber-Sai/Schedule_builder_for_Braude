

class LegendItem {
    config = new Config()
    element;
    deleteButton;
    color;
    name;
    choosen;

    constructor (name, color, choosen, deleteFunc) {
        this.color = color;
        this.name = name;
        this.choosen = choosen
        this.element = this.makeElement();
        this.deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteFunc(this.name)
        })
    }

    makeElement() {
        const item = document.createElement('div');
        item.className = this.config.classes.legendItem;
        const innerHTML = `
            <div class="${this.config.classes.legendItem + '-color'}" style="background-color: ${this.color}"></div>
            <span>${this.name}</span>
        `
        item.innerHTML = innerHTML;

        this.deleteButton = document.createElement('div');
        this.deleteButton.innerHTML = '&#10005;'
        this.deleteButton.className = this.config.classes.legendDeleteItem;
        
        item.appendChild(this.deleteButton);
        return item
    }
}