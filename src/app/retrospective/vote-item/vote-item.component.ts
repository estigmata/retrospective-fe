import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { RetrospectiveService } from '../services/retrospective.service';
import { Retrospective } from '../models/retrospective.model';

@Component({
  selector: 'app-vote-item',
  templateUrl: './vote-item.component.html',
  styleUrls: ['./vote-item.component.css']
})

export class VoteItemComponent implements OnInit {

  public retrospective: Retrospective;
  public maxVotes = 5;

  constructor(
    private retrospectiveService: RetrospectiveService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.parent.data
      .subscribe(
        (data) => this.retrospective = data.retrospective,
        (error: Error) => console.log('error')
      );
  }
}
