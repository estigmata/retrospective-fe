import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { Item } from '../models/item.model';
import { ItemsWrapper } from '../models/items-wrapper.model';
import { ItemWrapper } from '../models/item-wrapper.model';
import { RateObject } from '../models/rate-object.model';

@Injectable()
export class ItemService {

  constructor(private http: HttpClient) {
  }

  private handleError(error: any) {
    const errMsg = (error.title) ? `${error.title} : ${error.description}`
      : 'Server error';
    return Observable.throw(errMsg);
  }

  getByRetrospective(retrospectiveId: string): Observable<Item[]> {
    const params = new HttpParams().set('retrospective', retrospectiveId);
    return this.http.get<ItemsWrapper>(`${environment.backendPath}items/`, { params: params })
      .map(
        (item: ItemsWrapper) => item.data,
        (error) => this.handleError(error)
      );
  }

  getItemsWithRatesByUser(retrospectiveId: string, userId = '1'): Observable<Item[]> {
    let params = new HttpParams();

    params = params.append('retrospectiveId', retrospectiveId);
    params = params.append('userId', userId);
    return this.http.get<ItemsWrapper>(`${environment.backendPath}items/rates/`, { params: params })
      .map(
        (item: ItemsWrapper) => item.data,
        (error) => this.handleError(error)
      );
  }

  save(newItem: Item): Observable<Item> {
    return this.http.post<ItemWrapper>(`${environment.backendPath}items/`, newItem)
      .map(
        (item: ItemWrapper) => item.data,
        (error) => this.handleError(error)
      );
  }

  delete(itemId: String): Observable<Item> {
    return this.http.delete<ItemWrapper>(`${environment.backendPath}items/${itemId}`)
      .map (
        (itemDeleted: ItemWrapper) => itemDeleted.data,
        (error) => this.handleError(error)
      );
  }

  update(itemId: String, newItem: Item): Observable<Item> {
    return this.http.put<ItemWrapper>(`${environment.backendPath}items/${itemId}`, newItem)
      .map (
        (itemUpdated: ItemWrapper) => itemUpdated.data,
        (error) => this.handleError(error)
      );
  }

  vote(itemId: String, itemRate: RateObject): Observable<Item> {
    itemRate.userId = '1';
    return this.http.put<ItemWrapper>(`${environment.backendPath}items/${itemId}/rates`, itemRate).
      map(
        (itemUpdated: ItemWrapper) => itemUpdated.data,
        (error) => this.handleError(error)
      );
  }

}
