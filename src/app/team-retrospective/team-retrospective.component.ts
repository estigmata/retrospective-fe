import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Team } from '../shared/models/team.model';
import { TeamService } from '../shared/services/team.service';

@Component({
  selector: 'app-team-retrospective',
  templateUrl: './team-retrospective.component.html',
  styleUrls: ['./team-retrospective.component.css']
})

export class TeamRetrospectiveComponent implements OnInit {
  projectName = 'Retrospective';
  teamName: string;
  currentTeam: Team;

  constructor (
    private activatedRoute: ActivatedRoute,
    private teamService: TeamService) { }

  ngOnInit() {
    this.teamService.currentTeam$
      .subscribe(teamRetrieved => {
        this.currentTeam = teamRetrieved;
        this.teamName = this.currentTeam.name;
      });

    this.activatedRoute.children[0].params
    .switchMap(params =>
      this.teamService.getOne(params['teamId']))
    .subscribe(teamRetrieved => {
      this.currentTeam = teamRetrieved;
      this.teamName = this.currentTeam.name;
    });
  }
}
