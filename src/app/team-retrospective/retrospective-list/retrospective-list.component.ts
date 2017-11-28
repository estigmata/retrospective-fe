import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Retrospective } from '../../shared/models/retrospective.model';
import { RetrospectiveService } from '../services/retrospective.service';
import { UserService } from '../../shared/services/user.service';
import { TeamService } from '../../shared/services/team.service';
import { Team } from '../../shared/models/team.model';

@Component({
  selector: 'app-retrospective-list',
  templateUrl: './retrospective-list.component.html',
  styleUrls: ['./retrospective-list.component.css']
})

export class RetrospectiveListComponent implements OnInit {
  retrospectiveList: Retrospective[];

  constructor(
    private retrospectiveListService: RetrospectiveService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .switchMap(params => this.userService.updateCurrentTeam(params['teamId']))
      .switchMap(userUpdated => this.retrospectiveListService.getTeamRetrospectivesList(userUpdated.team))
      .subscribe(retrospectives => this.retrospectiveList = retrospectives.reverse(),
        error => console.error(error)
      );
  }
}
