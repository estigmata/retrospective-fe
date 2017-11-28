import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

import { environment } from '../../../environments/environment';
import { Team } from '../models/team.model';
import { TeamWrapper } from '../models/team-wrapper.model';
import { TeamListWrapper } from '../models/team-list-wrapper.model';


@Injectable()

export class TeamService {
  private createdTeam = new Subject<Team>();
  private updateTeam = new Subject<Team>();

  newTeam$ = this.createdTeam.asObservable();
  currentTeam$ = this.updateTeam.asObservable();

  updatedTeamList(newTeam: Team) {
    this.createdTeam.next(newTeam);
  }

  updatedCurrentTeam(teamId: string) {
    this.getOne(teamId)
      .subscribe(teamFounded => this.updateTeam.next(teamFounded));
  }

  constructor(private http: HttpClient) { }

  private handleError(error: any) {
    const errMsg = (error.title) ? `${error.title} : ${error.description}`
      : 'Server error';
    return Observable.throw(errMsg);
  }

  getAll(): Observable<Team[]> {
    return this.http.get<TeamListWrapper>(
      `${environment.backendPath}teams`
    ).
      map(
        (wrapper: TeamListWrapper) => {
          return wrapper.data;
        }
      );
  }

  create(newTeam: Team): Observable<Team> {
    return this.http.post<TeamWrapper>(`${environment.backendPath}teams`, newTeam)
      .map(
        (team: TeamWrapper) => {
          this.updatedTeamList(team.data);
          return team.data;
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  getOne(teamId: string): Observable<Team> {
    return this.http.get<TeamWrapper>(`${environment.backendPath}teams/${teamId}`)
      .map((teamWrapper: TeamWrapper) => teamWrapper.data);
  }

  getAllByUserId(userId: string): Observable<Team[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<TeamListWrapper>(`${environment.backendPath}teams/users/`, { params: params })
      .map(
        (wrapper: TeamListWrapper) => {
          return wrapper.data;
        }
      );
  }

  update(teamId: string, newTeam: Team): Observable<Team> {
    return this.http.put<TeamWrapper>(`${environment.backendPath}teams/${teamId}`, newTeam)
    .map(
      (team: TeamWrapper) => {
        return team.data;
      },
      (error) => {
        this.handleError(error);
      }
    );
  }
}
