import { Injectable } from '@angular/core';
import { SystemConstant } from '../class/system-constant';

/**
 *  session storage 存储服务
 */
@Injectable()
export class SessionStorageService {

  public sessionStorage: any;

  constructor() {
    if (!sessionStorage) {
      throw new Error('浏览器不支持本地存储！');
    } else {
      this.sessionStorage = window.sessionStorage;
    }
  }
  public set(key: string, value: string): void {
    this.sessionStorage[SystemConstant.SESSION_STORAGE_PREFIX + key] = value;
  }

  public get(key: string): string {
    return this.sessionStorage[SystemConstant.SESSION_STORAGE_PREFIX + key] || '';
  }

  public setObject(key: string, value: any): void {
    this.sessionStorage[SystemConstant.SESSION_STORAGE_PREFIX + key] = JSON.stringify(value);
  }

  public getObject(key: string): any {
    return JSON.parse(this.sessionStorage[SystemConstant.SESSION_STORAGE_PREFIX + key] || '{}');
  }

  public remove(key: string): any {
    this.sessionStorage.removeItem(SystemConstant.SESSION_STORAGE_PREFIX + key);
  }
}
