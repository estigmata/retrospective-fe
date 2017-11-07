import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Retrospective } from '../../shared/models/retrospective.model';
import { RetrospectiveService } from '../services/retrospective.service';

@Component({
  selector: 'app-retrospective-list',
  templateUrl: './retrospective-list.component.html',
  styleUrls: ['./retrospective-list.component.css']
})

export class RetrospectiveListComponent implements OnInit {
  retrospectiveList: Retrospective[];

  constructor(
    private retrospectiveListService: RetrospectiveService
  ) { }

  ngOnInit() {
    this.retrospectiveListService.getRetrospectiveList().
      subscribe(retrospectives => this.retrospectiveList = retrospectives.reverse(),
        error => console.error(error)
      );
  }

}
