import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdFormFieldModule } from '@angular/material';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { Team } from '../../shared/models/team.model';
import { TeamService } from '../../shared/services/team.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  newTeam: Team;

  createTeamForm: FormGroup;
  constructor (
    private formBuilder: FormBuilder,
    private router: Router,
    private teamService: TeamService
  ) {
    this.createTeamForm = this.formBuilder.group({
      name: [ '', Validators.required ]
    });
  }

  save(newTeam) {
    this.newTeam = newTeam;
    this.newTeam.users = [{userId: localStorage.getItem('userId')}];
    this.teamService.create(this.newTeam)
      .subscribe(savedTeam => {
        this.router.navigate([`../team/retrospective-list/${savedTeam._id}`]);
      });
  }

  ngOnInit() { }
}
