import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'retrospective/:id',
    loadChildren: 'app/retrospective/retrospective.module#RetrospectiveModule'
  },
  {
    path: 'team',
    loadChildren: 'app/team-retrospective/team-retrospective.module#TeamRetrospectiveModule'
  },
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule'
  },
  {
    path: 'sign-up',
    loadChildren: 'app/sign-up/sign-up.module#SignUpModule'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
