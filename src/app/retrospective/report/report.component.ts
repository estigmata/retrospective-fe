import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RetrospectiveReport } from './../models/retrospective-report.model';
import { State } from './../models/state.model';

@Component({
  selector: 'app-report-component',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {

  public retrospectiveReport: RetrospectiveReport[];
  public state = new State({report: true});

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.data
      .subscribe(
        ({retrospectiveData: data}) => this.retrospectiveReport = data.actionItems,
        (error: Error) => console.error(error)
      );
  }

}
