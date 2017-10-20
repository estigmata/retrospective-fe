import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { RetrospectiveService } from './services/retrospective.service';
import { Retrospective } from '../shared/models/retrospective.model';

@Component({
  selector: 'app-retrospective',
  templateUrl: './retrospective.component.html',
  styleUrls: ['./retrospective.component.css']
})

export class RetrospectiveComponent implements OnInit {

  retrospective: Retrospective;

  constructor(
    private retrospectiveService: RetrospectiveService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.activatedRoute.data.subscribe(
      (data) => this.retrospective = data.retrospective,
      (error: Error) => console.error('error')
    );
  }
}
