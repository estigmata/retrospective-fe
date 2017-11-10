import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from './../../../shared/services/user.service';
import { User } from './../../../shared/models/user.model';

@Injectable()
export class UserResolverService implements Resolve<User> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.userService.getUser()
      .map(
        user => user,
        error => {
          this.router.navigate(['team/retrospective-list']);
        }
      );
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) { }
}
