import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'retrospective/:id',
    loadChildren: 'app/retrospective/retrospective.module#RetrospectiveModule'
  },
  {
    path: 'team',
    loadChildren: 'app/team-retrospective/team-retrospective.module#TeamRetrospectiveModule'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
