import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { RetrospectiveList } from './retrospective-list.model';
import { RetrospectiveListWrapper } from './retrospective-list-wrapper.model';

@Injectable()

export class RetrospectiveListService {

  constructor(private http: HttpClient) {
  }

  getRetrospectiveList(): Observable<RetrospectiveList> {
    return this.http.get<RetrospectiveListWrapper>(
      `${environment.backendPath}retrospectives/`
    ).
      map(
        (wrapper: RetrospectiveListWrapper) => {
          return wrapper.data;
        }
      );
  }

}
