import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { Strategy } from '../models/strategy.model';
import { StrategiesWrapperModel } from '../models/strategies-wrapper.model';

@Injectable()

export class StrategyService {

  constructor(private http: HttpClient) {
  }

  getStrategies(): Observable<Strategy[]> {
    return this.http.get<StrategiesWrapperModel>(
      `${environment.backendPath}strategies/`
    ).
      map(
        (wrapper: StrategiesWrapperModel) => {
          return wrapper.data;
        }
      );
  }

}
