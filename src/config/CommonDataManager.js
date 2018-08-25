export default class CommonDataManager {

  static myInstance = null;

  _data = "";

  static getInstance() {
    if (this.myInstance === null) {
      this.myInstance = new CommonDataManager();
    }

    return this.myInstance;
  }

  getData() {
    return this._data;
  }

  setData(data) {
    this._data = data;
  }
}
