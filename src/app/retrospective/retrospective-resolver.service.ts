import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Retrospective } from './models/retrospective.model';
import { Observable } from 'rxjs/Observable';
import { RetrospectiveService } from './services/retrospective.service';


@Injectable()
export class RetrospectiveResolverService implements Resolve<Retrospective> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Retrospective> {
    return this.retrospectiveService.getRetrospective(route.params.id);
  }

  constructor(private retrospectiveService: RetrospectiveService) { }

}
