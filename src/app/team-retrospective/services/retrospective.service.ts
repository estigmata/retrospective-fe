import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { Retrospective } from '../../shared/models/retrospective.model';
import { RetrospectiveListWrapper } from '../models/retrospective-list-wrapper.model';
import { RetrospectiveWrapper } from '../../shared/models/retrospective-wrapper.model';

@Injectable()

export class RetrospectiveService {

  constructor(private http: HttpClient) {
  }

  private handleError(error: any) {
    const errMsg = (error.title) ? `${error.title} : ${error.description}`
      : 'Server error';
    return Observable.throw(errMsg);
  }

  getRetrospectiveList(): Observable<Retrospective[]> {
    return this.http.get<RetrospectiveListWrapper>(
      `${environment.backendPath}retrospectives/`
    ).
      map(
        (wrapper: RetrospectiveListWrapper) => {
          return wrapper.data;
        }
      );
  }

  getNewRetrospectiveName(): Observable<Retrospective> {
    return this.http.get<Retrospective>(`${environment.backendPath}retrospectives/next/retrospectiveName`)
      .map(retrospective => {
        return retrospective;
      });
  }

  saveRetrospective(newRetrospective: Retrospective): Observable<Retrospective> {
    return this.http.post<RetrospectiveWrapper>(`${environment.backendPath}retrospectives`, newRetrospective)
      .map(
        (retrospective: RetrospectiveWrapper) => {
          return retrospective.data;
        },
        (error) => {
          this.handleError(error);
        }
      );
  }
}
