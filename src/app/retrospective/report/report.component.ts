import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ActionItem } from './../models/action-item.model';
import { ActionItemService } from './../services/action-item.service';
import { Retrospective } from './../../shared/models/retrospective.model';
import { RetrospectiveData } from './../models/retrospective-data.model';

@Component({
  selector: 'app-report-component',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {

  public actionItems;
  public retrospective: Retrospective;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private actionItemService: ActionItemService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.data
      .subscribe(
        ({retrospectiveData: data}) => {
          console.log('Items, action?: ', data.items);
          this.retrospective = data.retrospective;
        },
        (error: Error) => console.error('error')
      );
  }

}
