import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpObserve } from '@angular/common/http/src/client';
import { WaitService } from '../wait/wait.service';
import { SessionStorageService } from '../storage/session-storage.service';
import { Observable } from 'rxjs';

/**
 * httpclient 服务
 */
@Injectable()
export class HttpService {

  constructor(
    private httpClient: HttpClient,
    private waitService: WaitService,
    private sessionStorageService: SessionStorageService
  ) {
  }

  request(method: string, url: string, options?: {
    body?: any;
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    observe?: HttpObserve;
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
  }): Observable<any> {
    return this.commonProcess(this.httpClient.request(method, url, options));
  }

  get(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    const sessionToken: string = this.sessionStorageService.get('token');
    let headersParam: HttpHeaders = new HttpHeaders();
    headersParam = headersParam.append('authorization', sessionToken);
    return this.commonProcess(this.httpClient.get(url, {headers: headersParam}));
  }

  post(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    const sessionToken: string = this.sessionStorageService.get('token');
    let headersParam: HttpHeaders = new HttpHeaders();
    headersParam = headersParam.append('authorization', sessionToken);
    return this.commonProcess(this.httpClient.post(url, body, {headers: headersParam}));
  }

  put(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.commonProcess(this.httpClient.put(url, body, options = {}));
  }

  patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.commonProcess(this.httpClient.patch(url, body, options = {}));
  }

  options(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.commonProcess(this.httpClient.options(url, options = {}));
  }

  head(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.commonProcess(this.httpClient.head(url, options = {}));
  }

  delete(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.commonProcess(this.httpClient.delete(url, options = {}));
  }

  /**
   * 公共处理
   * @param {Observable<any>} observable
   * @returns {Observable<any>}
   */
  commonProcess(observable: Observable<any>): Observable<any> {
    this.waitService.wait(true);
    return Observable.create((observer) => {
      observable.subscribe(res => {
        // 返回JSON，统一处理
        this.waitService.wait(false);
        if (res.code === 100) {
          observer.next(res.content);
        } else if (res.code === 300) {
          observer.error(res.message);
        } else if (res.code === 400) {
          observer.error(res.message);
        } else if (res.code === 401) {
          observer.error(res.message);
        } else if (res.code === 403) {
          observer.error(res.message);
        } else if (res.code === 404) {
          observer.error(res.message);
        } else if (res.code === 500) {
          observer.error(res.message);
        } else {
          observer.error(res.message);
        }
      }, (err) => {
        this.waitService.wait(false);
        observer.error(err);
      }, () => {
        this.waitService.wait(false);
        observer.complete();
      });
    });
  }
}
