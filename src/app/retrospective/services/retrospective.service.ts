import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';

import { environment } from '../../../environments/environment';
import { Retrospective } from '../../shared/models/retrospective.model';
import { RetrospectiveWrapper } from '../../shared/models/retrospective-wrapper.model';
import { StepMessage } from '../../shared/models/step-message.model';
import { StepMessageWrapper } from '../../shared/models/step-message-wrapper.model';

@Injectable()

export class RetrospectiveService {

  constructor(
    private http: HttpClient,
    private socket: Socket
  ) { }

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

  goToNextStep (retrospectiveId: string): Observable<Retrospective> {
    const headers = new HttpHeaders().set('token', localStorage.getItem('token'));
    return this.http.put<RetrospectiveWrapper>(
      `${environment.backendPath}retrospectives/${retrospectiveId}/nextStep`,
      {},
      {headers: headers})
      .map(
        (retrospective: RetrospectiveWrapper) => {
          return retrospective.data;
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  sendMessageToPlayers (message: StepMessage): Observable<StepMessage> {
    return this.http.post<StepMessageWrapper>(
      `${environment.backendPath}retrospectives/${message.retrospective}/messages`, message
    )
      .map(
        (messageResponse: StepMessageWrapper) => messageResponse.data,
        error => this.handleError(error)
      );
  }

  startConnection(retrospectiveId) {
    this.socket.emit('startSocketClient', retrospectiveId);
  }

  createObservable(key: string) {
    return this.socket
      .fromEvent<any>(key)
      .map(response => response.data);
  }

  listenRetrospectiveUpdated(): Observable<Retrospective> {
    return this.createObservable('onRetrospectiveUpdated');
  }

  listenSentMessageToRetrospective(): Observable<StepMessage> {
    return this.createObservable('onSendMessage');
  }
}
