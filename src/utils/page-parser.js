
//parsing page for lessons
class PageParser {
    config = new Config();
    constructor() {
    }

    init() {
        const blocks = document.querySelectorAll('.TextAlignRight');
        if(blocks.length === 0) {
            console.warn('blocks not found');
            return null
        }

        let pageData = {
            lessonName : '',
            lessons : [],
        }

        for (let group = 0; group < blocks.length; group++) {
            
            //filtering lesson name
            const nextBlock = blocks[group].nextElementSibling;
            if (!nextBlock) {
                pageData.lessonName = blocks[group].querySelector('p').innerHTML.split('<br>')[0]; //get name
                continue;
            }

            //filtering blocks by faculty
            // const faculty = nextBlock.innerText.match(this.config.faculty) || '';
            // if (!faculty) continue;

            const type = blocks[group].innerText.match(/הרצאה|מעבדה|תרגיל/);

            //parsing lessons data
            const timeTable = blocks[group].nextElementSibling.nextElementSibling;
            const rows = timeTable.querySelectorAll('.row.Tr.Father');
            for (let row of rows) {
                const cells = row.children;
                if (cells[0].innerText.trim() != this.config.semester) continue; //filtering by semester
                blocks[group].style.backgroundColor = 'red'; //highlighting block 
                pageData.lessons.push({
                    dayOfWeek: this.config.dayMap[cells[1].innerText.trim()],
                    startAt: cells[2].innerText,
                    endAt: cells[3].innerText,
                    teacher: cells[4].innerText,
                    classroom: cells[5].innerText,
                    type: type? type[0] : 'הרצאה',
                    group : group
                });
            }
            
        }
        return pageData.lessons.length > 0 ? pageData : null;
    }

}