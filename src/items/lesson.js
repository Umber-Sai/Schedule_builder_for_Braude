

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
        this.top = this._timeToNum(this.startAt) * this.config.columnHeight / 12;
        this.bottom = this._timeToNum(this.endAt) * this.config.columnHeight / 12;
        this.height = this.bottom - this.top;
        
        this.element = this.makeElement();
    }
    
    makeElement() {
        let lessonElement = document.createElement('div');
        lessonElement.classList.add(this.config.classes.lesson);
        lessonElement.style.backgroundColor = this.color;
        lessonElement.style.top = this.top + 'px';
        lessonElement.style.height = this.height + 'px';
        lessonElement.innerHTML = `
            <span class="big">${this.type.split('')[0]}</span><br>
            <span class="small">${this.teacher}</span><br>
            <span class="small">${this.classroom}</span><br>
        `
        return lessonElement
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


