

class Lesson {

    config = new Config();

    constructor(lessonName,  dayOfWeek, startAt, endAt, teacher, classroom, type, group, choosen, color) {
        this.name = lessonName;
        this.startAt = startAt;
        this.endAt = endAt;
        this.dayOfWeek = dayOfWeek;
        this.type = type;
        this.teacher = teacher;
        this.classroom = classroom;
        this.group = group;
        this.choosen = choosen;
        this.color = color;
        this.colorByType = this._colorByType(color); 
        this.top = this._timeToNum(this.startAt);
        this.bottom = this._timeToNum(this.endAt);
        this.height = this.bottom - this.top;
        
        this.element = this.makeElement();
    }
    
    makeElement() {
        let lessonElement = document.createElement('div');
        lessonElement.classList.add(this.config.classes.lesson);
        lessonElement.style.backgroundColor = this.color;
        lessonElement.innerHTML = `
            <span class="big">${this.type.split('')[0]}</span><br>
            <span class="small">${this.teacher}</span><br>
            <span class="small">${this.classroom}</span><br>
        `
        return lessonElement
    }

    appendTo (motherEl) {
        const columnHeight = motherEl.getBoundingClientRect().height;
        this.element.style.top = this.top * 100 / 12 + '%';
        this.element.style.height = this.height * 100 / 12 + '%';

        motherEl.appendChild(this.element);
    }

    _timeToNum(time) {
        const [hour, minute] = time.split(':');
        return parseInt(hour) - 8 + parseInt(minute) / 60;
    }

    _colorByType(color) {
        switch (this.type) {
            case 'הרצאה':
                return `${color}ff`;
            case 'מעבדה':
                return `${color}c3`;
            case 'תרגיל':
                return `${color}85`;
            default:
                return 'gray';
        }
    }

}


