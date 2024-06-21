import { Injectable } from '@angular/core';

interface TabData {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class BrowserTabManager {
  private tabData: TabData = {};

  constructor() {
    window.addEventListener('unload', this.saveTabData.bind(this));
    this.loadTabData();
  }

  private saveTabData() {
    sessionStorage.setItem('tabData', JSON.stringify(this.tabData));
  }

  private loadTabData() {
    const storedData = sessionStorage.getItem('tabData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (this.isEmptyObject(parsedData)) {
          // tabData es un objeto vacío
          this.tabData = {};
        } else {
          // tabData contiene datos
          this.tabData = parsedData;
        }
      } catch (e) {
        console.error('Error al analizar los datos del SessionStorage:', e);
        this.tabData = {};
      }
    } else {
      this.tabData = {};
    }
  }

  setTabData(data: any) {
    this.tabData = data;
    this.saveTabData();
  }

  getTabData() {
    return this.tabData;
  }

  private isEmptyObject(obj: object): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
}
