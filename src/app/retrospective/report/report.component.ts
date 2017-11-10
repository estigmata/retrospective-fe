import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RetrospectiveReport } from './../models/retrospective-report.model';
import { ActionItemService } from './../services/action-item.service';
import { Retrospective } from './../../shared/models/retrospective.model';
import { RetrospectiveData } from './../models/retrospective-data.model';
import { State } from './../models/state.model';

@Component({
  selector: 'app-report-component',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {

  public retrospectiveReport: RetrospectiveReport[];
  public retrospective: Retrospective;
  public state = new State({report: true});

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
          this.retrospective = data.retrospective;
          this.actionItemService.getActionItems(this.retrospective._id)
            .subscribe(retrospectiveReport => {
              this.retrospectiveReport = retrospectiveReport;
            });
        },
        (error: Error) => console.error('error')
      );
  }

}
