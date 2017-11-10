import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private router: Router,
    private userService: UserService
  ) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.generateSessionId();
  }

  switchLanguage (language: string) {
    this.translate.use(language);
  }

  redirectToCreateRetrospective() {
    this.router.navigate([ 'team/create-retrospective' ]);
  }

  private generateSessionId() {
    this.userService.createUser();
  }

}
