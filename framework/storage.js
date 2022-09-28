export class LocalStorage {
  constructor(key) {
    this.key = key;
    this.list = this.getall();
  }

  getall() {
    let stored = localStorage.getItem(this.key);
    if (stored.length == 2 || stored == "undefined"){
        return []
    } else {
        return JSON.parse(stored)
    }
  }

  store(el) {
    localStorage.setItem(this.key, JSON.stringify(el));
  }

  removeAll() {
    localStorage.setItem(this.key, JSON.stringify(""))
  }
}
