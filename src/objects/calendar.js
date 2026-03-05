//creating calendar

class Calendar {

    config = new Config();
    ls = new LocalStorage();
    element = document.createElement('div');
    dayBodyElements = {
        'Sun' : this.createDayBodyElement(),
        'Mon' : this.createDayBodyElement(),
        'Tue' : this.createDayBodyElement(),     
        'Wed' : this.createDayBodyElement(),
        'Thu' : this.createDayBodyElement(),
        'Fri' : this.createDayBodyElement(),
        'Sat' : this.createDayBodyElement()
    }

    constructor() {
    }

    createDayBodyElement() {
        let dayBodyElement = document.createElement('div');
        dayBodyElement.className = this.config.classes.dayCol + '-body';
        return dayBodyElement;
    }

    render(motherElement) {
        this.element.className = this.config.classes.calendar;

        //rendering days columns
        const days = Object.keys(this.dayBodyElements);
        for (let day of days) {
            const dayColElement = document.createElement('div');
            dayColElement.className = this.config.classes.dayCol;

            const dayHeadElement = document.createElement('div');
            dayHeadElement.className = this.config.classes.dayCol + '-head';
            dayHeadElement.innerText = day;

            dayColElement.appendChild(dayHeadElement);
            dayColElement.appendChild(this.dayBodyElements[day]);
            this.element.appendChild(dayColElement);
        }

        //adding to wrapper
        motherElement.appendChild(this.element);

    }

    getSize() {
        const rect = this.element.getBoundingClientRect();
        return {height: rect.height, width: rect.width}
    }

    

}