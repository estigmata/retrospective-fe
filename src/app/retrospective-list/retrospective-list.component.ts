import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { RetrospectiveList } from './retrospective-list.model';
import { RetrospectiveListService } from './retrospective-list.service';

@Component({
  selector: 'app-retrospective-list',
  templateUrl: './retrospective-list.component.html',
  styleUrls: ['./retrospective-list.component.css']
})
export class RetrospectiveListComponent implements OnInit {

  retrospectiveList: RetrospectiveList;

  constructor(
    private retrospectiveListService: RetrospectiveListService
  ) { }

  ngOnInit() {
    this.retrospectiveListService.getRetrospectiveList().
      subscribe(
        retrospectives => this.retrospectiveList = retrospectives,
        error => console.error(error)
      );
  }

}
