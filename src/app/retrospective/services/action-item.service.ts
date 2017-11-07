import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { ActionItemWrapper } from './../models/action-item-wrapper.model';
import { ActionItemsWrapper } from './../models/action-items-wrapper.model';
import { ActionItem } from './../models/action-item.model';

@Injectable()
export class ActionItemService {

  constructor(private http: HttpClient) {
  }

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

  getActionItems(retrospectiveId: string): Observable<ActionItem[]> {
    const params = new HttpParams().set('retrospective', retrospectiveId);
    return this.http.get<ActionItemsWrapper>(`${environment.backendPath}action-items`, {params: params})
      .map(
        (items: ActionItemsWrapper) => items.data,
        (error) => this.handleError(error)
      );
  }

}
