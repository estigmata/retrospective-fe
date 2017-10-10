import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { Retrospective } from '../models/retrospective.model';
import { RetrospectiveWrapper } from '../models/retrospective-wrapper.model';

@Injectable()

export class RetrospectiveService {

  constructor(private http: HttpClient) {
  }

  private handleError(error: any) {
    const errMsg = (error.title) ? `${error.title} : ${error.description}`
      : 'Server error';
    return Observable.throw(errMsg);
  }

  getRetrospective(retrospectiveId: string): Observable<Retrospective> {
    return this.http.get<RetrospectiveWrapper>(`${environment.backendPath}retrospectives/${retrospectiveId}`)
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
