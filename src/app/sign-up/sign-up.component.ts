import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MdFormFieldModule } from '@angular/material';

import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { 
    this.signUpForm = this.formBuilder.group({
      name: [ '', Validators.required ],
      password: [ '', Validators.required ],
      passwordConfirm: [ '', Validators.required ]
    },
    {validator: this.passwordConfirming});
  }

  ngOnInit () {
    if(this.userService.checkSession()){
      this.router.navigate(['../team/retrospective-list']);
      this.router.navigate([`../team/retrospective-list/${localStorage.getItem('team')}`])
    }
  }

  signUp(user: User) {
    user.role = 'moderator';
    this.userService.singUp(user)
    .subscribe( (newUser) => {
      if(newUser){
        let currentTeamId = '/none';
        if(newUser.team) {
          currentTeamId = `/${newUser.team}`;
        }
        this.router.navigate([`../team/retrospective-list${currentTeamId}`]);
      }
    },
      error => console.log(error)
    )
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('passwordConfirm').value) {
        return {invalid: true};
    }
  }
}
