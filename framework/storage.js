export class LocalStorage {
    constructor(key) {
        this.key = key;
    }

    getAll() {
        let stored = localStorage.getItem(this.key);
        if (stored === "undefined") {
            return []
        } else {
            return JSON.parse(stored)
        }
    }

    store(el) {
        localStorage.setItem(this.key, JSON.stringify(el));
    }

    removeAll() {
        localStorage.setItem(this.key, JSON.stringify([]))
    }
}
