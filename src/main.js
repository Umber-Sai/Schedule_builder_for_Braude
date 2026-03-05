//запускает функцию при загрузке страницы



class Main {
    config = new Config();
    localStorage = new LocalStorage();
    calendar = new Calendar();
    calendarScaler;
    legend = new Legend();
    pageParser = new PageParser();
    
    lessonsManager = new LessonsManager(this.calendar.dayBodyElements, this.legend.bodyElement)
    
    wrapper = document.createElement('div');

    constructor() {
        //only rendering
        this.wrapperRender();
        this.legend.render(this.wrapper);
        this.calendar.render(this.wrapper);

        //init scaler
        const calendarSize = this.localStorage.get(this.config.ls.calendarSize);
        new Scaler(this.calendar.element, calendarSize?.height, calendarSize?.width)

        //add data
        const lsData = this.localStorage.get(this.config.ls.lessonsData);
        this.lessonsManager.add(lsData);
        this.lessonsManager.render();

        // realise activation by button
        this.legend.addButton.addEventListener('click', () => {
            const parsedPage = this.pageParser.init();
            if(parsedPage) {
                //choose color
                const currentColors = this.lessonsManager.legendItems.map(item => item.color);
                const color = this.config.colors.find(color => !currentColors.includes(color));

                this.lessonsManager.add([{ ...parsedPage, color: color }]); 
                this.lessonsManager.render(this.calendar.dayBodyElements);
            }
        });

        this.unloadEventListener();
    }

    wrapperRender() {
        // Создаём <style> элемент и добавляем CSS-стили
        const styleEl = document.createElement('style');
        styleEl.textContent = this.config.styles;
        this.wrapper.appendChild(styleEl);

        // Устанавливаем класс оборачивающему div
        this.wrapper.className = this.config.classes.wrapper;
        document.body.insertBefore(this.wrapper, document.body.firstChild);
    }
    
    unloadEventListener() {
        const saveData = () => {
            try {
                this.localStorage.save(this.lessonsManager.pack(), this.config.ls.lessonsData);
                this.localStorage.save(this.calendar.getSize(), this.config.ls.calendarSize)
            } catch (err) {
                console.warn('Failed to save lesson data on page hide/unload', err);
            }
        };

        window.addEventListener('pagehide', saveData, { passive: true });
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') saveData();
        }, { passive: true });
        // fallback
        window.addEventListener('unload', saveData, { passive: true });
    }


}

new Main();