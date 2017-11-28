import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { ActionItemWrapper } from './../models/action-item-wrapper.model';
import { RetrospectiveReportWrapper } from './../models/retrospective-report-wrapper.model';
import { ActionItem } from './../models/action-item.model';
import { RetrospectiveReport } from './../models/retrospective-report.model';
import { Socket } from 'ng-socket-io';

@Injectable()
export class ActionItemService {

  constructor(
    private http: HttpClient,
    private socket: Socket
  ) { }

  private handleError(error: any) {
    const errMsg = (error.title) ? `${error.title} : ${error.description}`
      : 'Server error';
    return Observable.throw(errMsg);
  }

  save(newActionItem: ActionItem): Observable<ActionItem> {
    return this.http.post<ActionItemWrapper>(`${environment.backendPath}action-items`, newActionItem)
      .map(
        (item: ActionItemWrapper) => item.data,
        (error) => this.handleError(error)
      );
  }

  update(newActionItem: ActionItem): Observable<ActionItem> {
    return this.http.put<ActionItemWrapper>(`${environment.backendPath}action-items/${newActionItem._id}`, newActionItem)
      .map(
        (item: ActionItemWrapper) => item.data,
        (error) => this.handleError(error)
      );
  }

  getActionItems(retrospectiveId: string): Observable<RetrospectiveReport[]> {
    const params = new HttpParams().set('retrospectiveId', retrospectiveId);
    return this.http.get<RetrospectiveReportWrapper>(`${environment.backendPath}action-items`, {params: params})
      .map(
        (items) => items.data,
        (error) => this.handleError(error)
      );
  }

  createObservable(key: string) {
    return this.socket
      .fromEvent<any>(key)
      .map(response => response.data);
  }

  listenActionItemsCreated(): Observable<ActionItem> {
    return this.createObservable('onActionItemSaved');
  }

  listenActionItemsUpdated(): Observable<ActionItem> {
    return this.createObservable('onActionItemUpdated');
  }

}
