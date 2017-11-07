import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { ActionItem } from './../models/action-item.model';
import { ActionItemService } from './../services/action-item.service';
import { Retrospective } from './../../shared/models/retrospective.model';
import { RetrospectiveService } from './../services/retrospective.service';

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
    private retrospectiveService: RetrospectiveService,
    private actionItemService: ActionItemService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.parent.params
      .switchMap(param => {
        console.log('Retro ID: ', param['id']);
        return this.actionItemService.getActionItems(param['id']);
      })
      /*.subscribe(
          (data: ActionItem[]) => {
            console.log('Action Item: ', data);
            this.actionItems = data;
          },
          (error: Error) => console.log('error')
        )*/;
  }

}
