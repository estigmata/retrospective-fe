import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { RetrospectiveService } from '../services/retrospective.service';
import { Retrospective } from '../../shared/models/retrospective.model';
import { State } from '../models/state.model';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';
import { Category } from '../models/category.model';
import { RateObject } from './../models/rate-object.model';

@Component({
  selector: 'app-vote-item',
  templateUrl: './vote-item.component.html',
  styleUrls: ['./vote-item.component.css']
})

export class VoteItemComponent implements OnInit {

  public retrospective: Retrospective;
  public state = new State ({ vote: true });
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public categories: Category[];
  public maxRateControl: any;

  constructor(
    private retrospectiveService: RetrospectiveService,
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.data
      .subscribe(
        ({retrospectiveData: data}) => {
          this.retrospective = data.retrospective;
          this.maxRateControl = this.retrospective.maxRate;
          this.categories = new Array();
          this.retrospective.categories.forEach(category => {
            const categoryItems = data.items.filter(item => item.category === category._id);
            this.categories.push(new Category(
              category._id,
              category.name,
              categoryItems
            ));
          });
          data.items.filter(item => {
            if (item.userRate) {
              this.maxRateControl -= item.userRate;
            }
          });
        },
        (error: Error) => console.error('error :', error)
      );
  }

  vote(rateObject: RateObject) {
    if ((!rateObject.isIncrement && this.maxRateControl < this.retrospective.maxRate )
       || (rateObject.isIncrement && this.maxRateControl > 0 )) {
        this.itemService.vote(rateObject.item._id, rateObject).subscribe(
          () => {
            if (rateObject.isIncrement) {
              rateObject.item.userRate += 1;
              this.maxRateControl -= 1;
            } else {
              rateObject.item.userRate -= 1;
              this.maxRateControl += 1;
            }
          },
          (Error) => console.log
        );
      }
  }

  nextStep() {
    this.retrospectiveService.goToNextStep(this.retrospective._id)
      .subscribe(retrospective => {
        if (retrospective) {
          this.router.navigate([`retrospective/${this.retrospective._id}/${retrospective.currentStep}`]);
        }
      });
  }
}
