import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SessionStorageService } from '../storage/session-storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenPermissionService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token: string = this.sessionStorageService.get('token');
    if (token === undefined || token === null || token === '') {
      this.router.navigate(['/login']).then();
      return false;
    } else {
      return true;
    }
  }

  constructor(
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) { }

}
