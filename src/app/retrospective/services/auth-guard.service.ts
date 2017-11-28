import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { UserService } from '../../shared/services/user.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const userId = this.userService.checkSession() ? localStorage.getItem('userId') : '';

    return this.userService.addUserToRetrospective(route.parent.params.id, userId)
      .map( newGuestUser => {
        if (newGuestUser && !this.userService.checkSession()) {
          this.userService.initSession(newGuestUser.userId);
        }
        this.userService.getUserFromLocalStorage();
        return true;
      });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
