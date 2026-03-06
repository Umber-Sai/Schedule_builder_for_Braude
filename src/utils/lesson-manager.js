

class LessonsManager {

    config = new Config();
    lessons = [];
    legendItems = [] 

    constructor(calendarDays, legendEl) {
        this.calendarDays = calendarDays;
        this.legendEl = legendEl;
    }
     
    render(lessonGroup = this.lessons) {
         //clean legend and calendar
        this.legendEl.innerHTML = '';
        for(let day of Object.keys(this.calendarDays)) this.calendarDays[day].innerHTML = '';

        //legend items rendering
        for (let item of this.legendItems) {
            this.legendEl.appendChild(item.element);
        }
        
        //lessons rendering
        this.layeringControl(lessonGroup);
        for (let lesson of lessonGroup) {
            lesson.appendTo(this.calendarDays[lesson.dayOfWeek]);
            //adding classes for choosen lesons
            if(lesson.choosen) {
                const name = lesson.name;
                const type = lesson.type;

                const lessonsByType = lessonGroup.filter(lesson => lesson.name == name && lesson.type === type);
                for (let lesson of lessonsByType) lesson.element.classList.add('transparent');

                lesson.element.classList.add('clicked');
            }
        }
    }

    add(data) {
        if (!data) return;
        if (!Array.isArray(data)) data = [data];
        for (let lessonsData of data) {
            if (this.lessons.some(lesson => lesson.name === lessonsData.lessonName)) continue; //preventing duplicates

            const item = new LegendItem(
                lessonsData.lessonName, 
                lessonsData.color, 
                lessonsData.choosen ?? false, 
                this.delete.bind(this));
            this._itemEvents(item);
            this.legendItems.push(item);

            for (let LD of lessonsData.lessons) {
                const lesson = new Lesson(
                    lessonsData.lessonName,
                    LD.dayOfWeek,
                    LD.startAt,
                    LD.endAt,
                    LD.teacher,
                    LD.classroom,
                    LD.type,
                    LD.group,
                    LD.choosen ?? false,
                    lessonsData.color,
                );
                this._lessonEvents(lesson);
                this.lessons.push(lesson);
            }
        }
        this.removeItemHighlights()
        this.render()
    }

    layeringControl(lessonGroup) {
        for (let day of this.config.days) {
            const lessonsOfDay = lessonGroup.filter(lesson => lesson.dayOfWeek === day);
            lessonsOfDay.sort((a, b) => a.top - b.top); // Сортируем по началу урока
            const topVals = new Set(lessonsOfDay.map(lesson => lesson.top));

            let groups = [] 

            //splitting into groups by start time
            for (let val of topVals) {
                let group = lessonsOfDay.filter(lesson => lesson.top === val);
                groups.push(Array.isArray(group)? group : [group]);  
            }

            //compare groups by time and join if they intersect
            for (let i = 0; i < groups.length; i++) {
                const nextGroup = groups[i + 1];
                const curentGroupBottom = Math.max(...groups[i].map(lesson => lesson.bottom));

                if (nextGroup && curentGroupBottom > nextGroup[0].top) {
                    groups[i] = groups[i].concat(nextGroup);
                    groups.splice(i + 1, 1);
                    i--;
                }  
            }

            //applying styles
            for(let group of groups) {
               const groupLength = group.length;
                for (let i = 0; i < groupLength; i++) {
                    group[i].element.style.width = 100 / groupLength + '%';
                    group[i].element.style.right = (i * 100 / groupLength) + '%';
                }
            }
        }
    }

    delete(lessonName) {
        this.lessons = this.lessons.filter(lesson => lesson.name != lessonName);
        this.legendItems = this.legendItems.filter(item => item.name != lessonName);
        this.removeItemHighlights()
        this.render();
    }

    pack() {
        const packedLessons = [];
        for (let item of this.legendItems) {
            const lessonsData = this.lessons.filter(lesson => lesson.name === item.name);
            if (lessonsData.length > 0) {
                packedLessons.push({
                    lessonName: item.name,
                    lessons: lessonsData.map(lesson => ({
                        dayOfWeek: lesson.dayOfWeek,
                        startAt: lesson.startAt,
                        endAt: lesson.endAt,
                        teacher: lesson.teacher,
                        classroom: lesson.classroom,
                        type: lesson.type,
                        group: lesson.group,
                        choosen: lesson.choosen
                    })),
                    color: item.color,
                });
            }
        }
        return packedLessons;
    }

    removeItemHighlights () {
        for(let item of this.legendItems) {
            item.choosen = false
            item.element.classList.remove('choosen');
        }
    }

    _lessonEvents(lesson) {
        const el = lesson.element;
        const group = lesson.group;
        const name = lesson.name;
        const type = lesson.type;

        //nover on
        el.addEventListener('mouseover', (event) => {
            el.classList.add('hover');
            const lessonGroup = this.lessons.filter(lesson => lesson.name === name && lesson.group === group);
            if(lessonGroup.length > 1) {
                for (let lesson of lessonGroup) {
                    lesson.element.classList.add('hover');
                }
            }
        })

        //hover out
        el.addEventListener('mouseout', (event) => {
            el.classList.remove('hover');
            const lessonGroup = this.lessons.filter(lesson => lesson.name === name && lesson.group === group);
            if(lessonGroup.length > 1) {
                for (let lesson of lessonGroup) {
                    lesson.element.classList.remove('hover');
                }
            }
        })

        //click
        el.addEventListener('click', () => {
            const typeGroup = this.lessons.filter(lesson => lesson.name === name && lesson.type === type);
            const highlightGroup = typeGroup.filter(lesson => lesson.group === group);
            //if was chosen
            if (lesson.choosen) {
                
                for (let el of typeGroup) {
                    el.element.classList.remove('transparent');
                }

                for (let lesson of highlightGroup) {
                    lesson.element.classList.remove('clicked');
                    lesson.choosen = false;
                }
            //if wasn't choosen
            } else {
                const highlightedGroup = typeGroup.filter(lesson => lesson.choosen);
                //if there is other choosen 
                if (highlightedGroup.length > 0) {
                    for (let lesson of highlightedGroup) {
                        lesson.element.classList.remove('clicked');
                        lesson.choosen = false;
                    }

                    for (let lesson of highlightGroup) {
                        lesson.element.classList.add('clicked');
                        lesson.choosen = true;
                    }
                //if no one was choosen
                } else {

                    for (let el of typeGroup) {
                        el.element.classList.add('transparent');
                    }

                    for (let lesson of highlightGroup) {
                        lesson.element.classList.add('clicked');
                        lesson.choosen = true;
                    }

                }
            }  
        })
    }

    _itemEvents(item) {
        const el = item.element;
        const name = item.name;


        el.addEventListener('click', (event) => {
            //changing Item
            if(item.choosen) {
                item.choosen = false
                el.classList.remove('choosen')
            } else {
                item.choosen = true;
                el.classList.add('choosen')
            }
            //checking another chooden items
            const choosenItems = this.legendItems.filter(item => item.choosen);
            if(choosenItems.length > 0) {
                let lessonGroup = []
                for(let item of choosenItems) {
                    const lessonsByName = this.lessons.filter(l => l.name === item.name)
                    lessonGroup.push(...lessonsByName);
                }
                console.log(lessonGroup)
                this.render(lessonGroup);
            } else {
                this.render()
            }





            // if(item.choosen) {
            //     el.classList.remove('choosen');
            //     item.choosen = false;
            //     if(this.legendItems.some(item => item.choosen)) {
            //         const lessons = this.lessons.filter(lesson => lesson.name === name);
            //         for(let lesson of lessons) {
            //             lesson.element.classList.add('hidden');
            //         }
            //     } else {
            //         const lessons = this.lessons.filter(lesson => lesson.name != name);
            //         for(let lesson of lessons) {
            //             lesson.element.classList.remove('hidden');
            //         }
            //     }

            // } else {
            //     el.classList.add('choosen');
            //     if(this.legendItems.some(item => item.choosen)){
            //         const lessons = this.lessons.filter(lesson => lesson.name === name);
            //         for(let lesson of lessons) {
            //             lesson.element.classList.remove('hidden');
            //         }
            //     } else {
            //         const lessons = this.lessons.filter(lesson => lesson.name != name);
            //         for(let lesson of lessons) {
            //             lesson.element.classList.add('hidden');
            //         }
            //     }
            //     item.choosen = true;
            // }
            
            

        })
    }
}



