import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response } from '@angular/http';

import { ReplaySubject  } from 'rxjs/ReplaySubject';

import { Observable } from 'rxjs/Observable';
import { User } from './../models/user.model';
import { UserWrapper } from './../models/user-wrapper.model';
import { UserColorWrapper } from '../models/user-color-wrapper.model';
import { UserColor } from '../models/user-color.model';
import { environment } from '../../../environments/environment';
import { TeamService } from './team.service';

@Injectable()

export class UserService {

  private userCreatedSource = new ReplaySubject<User>();
  userCreated$ = this.userCreatedSource.asObservable();

  constructor(private http: HttpClient, private teamService: TeamService) {  }

  private handleError(error: any) {
    const errMsg = (error.title) ? `${error.title} : ${error.description}`
      : 'Server error';
    return Observable.throw(errMsg);
  }

  getUser() {
    return this.userCreated$;
  }

  getUserFromLocalStorage() {
    const realUser = new User({
      _id: localStorage.getItem('userId'),
      name: localStorage.getItem('userName'),
      role: localStorage.getItem('userRole'),
      token: localStorage.getItem('token'),
      team: localStorage.getItem('team')
    });
    this.userCreatedSource.next(realUser);
  }

  initSession(userSession: User) {
    localStorage.setItem('userId', userSession._id);
    localStorage.setItem('userName', userSession.name);
    localStorage.setItem('userRole', userSession.role);
    localStorage.setItem('token', userSession.token);
    localStorage.setItem('team', userSession.team);
    this.getUserFromLocalStorage();
  }

  checkSession() {
    return localStorage.getItem('userId') !== null &&
      localStorage.getItem('userName') !== null &&
      localStorage.getItem('userRole') !== null &&
      localStorage.getItem('token') !== null;
  }

  checkRole (role: string) {
    return localStorage.getItem('userRole') === role;
  }

  addUserToRetrospective (retrospectiveId: string, userId: string): Observable<UserColor> {
    return this.http.post<UserColorWrapper>(
      `${environment.backendPath}retrospectives/${retrospectiveId}/users`, userId === '' ? {} : {userId: userId}
    )
      .map(
        userColor => userColor.data,
        error => this.handleError(error)
      );
  }

  logIn (user: User): Observable<User> {
    return this.http.post<UserWrapper>(`${environment.backendPath}users/authenticate`, user, {observe: 'response'})
      .map(
        response => {
          const userRetrieved = response.body.data;
          userRetrieved.token = response.headers.get('token');
          this.initSession(userRetrieved);
          return userRetrieved;
        },
        error => error
      );
  }

  singUp (user: User): Observable<User> {
    return this.http.post<UserWrapper>(`${environment.backendPath}users`, user, {observe: 'response'})
      .map(
        response => {
          const userRetrieved = response.body.data;
          userRetrieved.token = response.headers.get('token');
          this.initSession(userRetrieved);
          return userRetrieved;
        },
        error => error
      );
  }
  
  updateCurrentTeam (teamId): Observable<User> {
    const headers = new HttpHeaders().set('token', localStorage.getItem('token'));
    return this.http.put<UserWrapper>(`${environment.backendPath}users/${localStorage.getItem('userId')}`,
      {team: teamId},
      {headers: headers})
      .map(
        userWrapped => {
          this.teamService.updatedCurrentTeam(teamId);
          localStorage.setItem('team', userWrapped.data.team);
          return userWrapped.data;
        },
        error => error
      );
  }
}
