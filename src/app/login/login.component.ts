import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdFormFieldModule } from '@angular/material';

import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.formBuilder.group({
      name: [ '', Validators.required ],
      password: [ '', Validators.required ]
    });
  }

  ngOnInit () {
    if (this.userService.checkSession()) {
      this.router.navigate([`../team/retrospective-list/${localStorage.getItem('team')}`]);
    }
  }

  login(user: User) {
    this.userService.logIn(user)
      .subscribe(userResult => {
        if (userResult)  {
          let currentTeamId = '/none';
          if (userResult.team) {
            currentTeamId = `/${user.team}`;
          }
          this.router.navigate([`../team/retrospective-list${currentTeamId}`]);
        }
      },
        error => console.log(error)
      );
  }
}
