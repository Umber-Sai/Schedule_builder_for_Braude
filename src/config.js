

class Config {

    ls = {
        lessonsData: 'lessonData',
        calendarScale: 'calendarScale'
    }

    days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    colors = [ '#E6194B', '#3CB44B', '#4363D8', '#F58231', '#911EB4', '#F032E6', '#BCF60C', '#FABEBE', '#46F0F0'];

    dayMap = {
      'יום ראשון': 'Sun',
      'יום שני': 'Mon',
      'יום שלישי': 'Tue',
      'יום רביעי': 'Wed',
      'יום חמישי': 'Thu',
      'יום שישי': 'Fri',
      'שבת': 'Sat'
    };

    faculty = 'מכונות'
    semester = 'ב'

    wrapperWidth = 1900;
    columnHeight = 1080;


    classes = {
        wrapper : 'calendar-wrapper',
        calendar : 'calendar',
        dayCol : 'day-col',
        lesson : 'lesson',  
        legend : 'legend',
        legendAddButton : 'legend-add-button',
        legendItem: 'legend-item',
        legendDeleteItem: 'legend-item-delete-btn'
    }

    styles = `
    .hover {
        background-color: orange !important;
        z-index: 99999;
    }
    .transparent {
        opacity: 0.5;
    }
    .clicked {
        border: 10px solid red !important;
        z-index: 99999;
        opacity: 1 !important;
        box-sizing: border-box;
    }

    .${this.classes.lesson}.hidden {
        display: none;
    }

    .${this.classes.legendItem}.choosen {
        background-color: orange;
    }

    .${this.classes.wrapper} {
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 99999;
        height: 0;
        }

    .${this.classes.calendar} {
        position: relative;
        top: 0px;
        right: -100%;
        translate: -100%;
        display: flex;
        flex-direction: row-reverse;
        width: ${this.wrapperWidth}px;
        user-select: none;
    }

    .${this.classes.dayCol} {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .${this.classes.dayCol}-head {
        text-align: center;
        background-color: #aeaeae;
        border: 1px solid black;
    }

    .${this.classes.dayCol}-body {
        height: ${this.columnHeight}px;
        border: 1px solid black;
        background: repeating-linear-gradient(
          0deg,
          #dbdbdbff,
          #dbdbdbff ${this.columnHeight / 12}px,
          #e7e7e7ff ${this.columnHeight / 12}px,
          #e7e7e7ff ${this.columnHeight / 6}px
        );
        position: relative;
    }

    .${this.classes.lesson} {
        position: absolute;
        width: 100%;
        overflow: hidden;
        user-select: none;
        border: 1px solid #342418ff
    }

    .big {
        font-weight: bold;
        font-size: 40px;
        text-align: center;
    }
    .small {
        font-size: 20px;
        line-height: 10px;
    }

    .${this.classes.legend} {
        width: max-content;
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 20px;
        padding: 10px;
        position: relative;
        top: 0;
        right: 0;
    }

    .${this.classes.legendAddButton} {
        background-color: #2ecc71;
        color: white;
        padding: 12px;
        box-sizing: border-box;
        text-align: center;
        cursor: pointer;
        width: 150px;
        margin: 10px;
        user-select: none;
        height: 50px;
        border-radius: 25px;

    }

    .${this.classes.legendAddButton}:active {
        background-color: #1d7c45ff;
    }

    .${this.classes.legend}-body {
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 20px;
    }

    .${this.classes.legendItem} {
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
        padding: 10px;
        background-color: #fff;
        border: 1px solid #a4a4a4;
        height: 50px;
        border-radius: 25px;
        box-shadow: 10px 10px 40px 0px #000000;
    }

    .${this.classes.legendItem}-color {
        width: 20px;
        aspect-ratio: 1;
        border-radius: 50%;
    }
    
    .${this.classes.legendDeleteItem} {
        width: 20px;
        aspect-ratio: 1;
        cursor: pointer;
    }

    
    `





    constructor() {}
}