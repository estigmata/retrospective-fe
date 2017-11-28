import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { RetrospectiveService } from './services/retrospective.service';
import { Retrospective } from '../shared/models/retrospective.model';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-retrospective',
  templateUrl: './retrospective.component.html',
  styleUrls: ['./retrospective.component.css']
})

export class RetrospectiveComponent implements OnInit {

  retrospective: Retrospective;

  constructor(
    private retrospectiveService: RetrospectiveService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MdDialog
  ) { }

  ngOnInit() {
    this.retrospectiveService.listenRetrospectiveUpdated()
      .subscribe(retrospectiveUpdated => {
        this.router.navigate([`retrospective/${retrospectiveUpdated._id}/${retrospectiveUpdated.currentStep}`]);
      });

    this.retrospectiveService.listenSentMessageToRetrospective()
      .subscribe(messageResponse => {
        console.log('On add item service.');
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '300px',
          data: {
            message: messageResponse.message,
            type: 'receiveMessage'
          }
        });
      });

    this.activatedRoute.children[0].data
      .subscribe(({retrospectiveData: data}) => this.retrospective = data.retrospective);
  }
}
