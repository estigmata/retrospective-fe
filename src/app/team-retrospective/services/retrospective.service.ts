import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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

  getTeamRetrospectivesList(teamId: string): Observable<Retrospective[]> {
    const params = new HttpParams().set('team', teamId);
    return this.http.get<RetrospectiveListWrapper>(`${environment.backendPath}retrospectives/`, { params: params })
      .map(
        (wrapper: RetrospectiveListWrapper) => {
          return wrapper.data;
        }
      );
  }

  getNewRetrospectiveName(teamId: string): Observable<Retrospective> {
    const headers = new HttpHeaders().set('token', localStorage.getItem('token'));
    return this.http.get<Retrospective>(`${environment.backendPath}retrospectives/${teamId}/next/retrospectiveName`, {headers: headers})
      .map(retrospective => {
        return retrospective;
      });
  }

  saveRetrospective(newRetrospective: Retrospective): Observable<Retrospective> {
    const headers = new HttpHeaders().set('token', localStorage.getItem('token'));
    return this.http.post<RetrospectiveWrapper>(`${environment.backendPath}retrospectives`, newRetrospective, {headers: headers})
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
