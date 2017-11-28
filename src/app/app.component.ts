import { Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from './shared/services/user.service';
import { TeamService } from './shared/services/team.service';
import { Team } from './shared/models/team.model';
import { User } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  sessionIsActive: boolean = this.userService.checkSession();
  userIsModerator: boolean = this.userService.checkRole('moderator');
  teamList: Team[];
  currentTeam: string;
  currentUser: User;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private teamService: TeamService
  ) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.teamService.getAllByUserId(localStorage.getItem('userId'))
    .subscribe(teamsByUser => {
      this.teamList = teamsByUser;
    });

    this.userService.userCreated$
    .switchMap(userLogged => {
      if (userLogged) {
        this.sessionIsActive = true;
        this.currentUser = userLogged;
        this.currentTeam = userLogged.team;
        this.userIsModerator = this.currentUser.role === 'moderator';
      }
      return this.teamService.getAllByUserId(this.currentUser._id);
    })
    .subscribe(teamsByUser => {
      this.teamList = teamsByUser;
    });

    this.teamService.newTeam$
    .subscribe(createdTeam => {
      this.currentTeam = createdTeam._id;
      this.teamList.push(createdTeam);
    });
  }

  switchLanguage (language: string) {
    this.translate.use(language);
  }

  changeCurrentTeam (newCurrentTeam: Team) {
    this.currentTeam = newCurrentTeam._id;
  }
}
