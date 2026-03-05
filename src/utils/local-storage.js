

class LocalStorage {
    key = 'lessonData'
    constructor() {}

    get(key) {
        const row = localStorage.getItem(key);
        const data = row ? JSON.parse(row) : undefined;
        return data;
    }

    save(data, key) {
        localStorage.setItem(key, JSON.stringify(data));
    }


    clear() {
        localStorage.removeItem(this.key);
    }



}