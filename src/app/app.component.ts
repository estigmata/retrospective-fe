import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( private translate: TranslateService, private router: Router ) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
  }

  switchLanguage (language: string) {
    this.translate.use(language);
  }

  redirectToCreateRetrospective() {
    this.router.navigate([ 'team/create-retrospective' ]);
  }

}
