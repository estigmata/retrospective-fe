import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  public maxRateControl: number;

  constructor(
    private retrospectiveService: RetrospectiveService,
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.activatedRoute.parent.data
      .switchMap(data => {
        this.retrospective = data.retrospective;
        this.maxRateControl = data.retrospective.maxRate;
        return this.itemService.getByRetrospective(data.retrospective._id);
      }).
      takeUntil(this.ngUnsubscribe).
      subscribe(
        (items: Item[]) => {
          this.categories = new Array();
          this.retrospective.categories.forEach(category => {
            const categoryItems = items.filter(item => item.category === category._id);
            this.categories.push(new Category(
              category._id,
              category.name,
              categoryItems
            ));
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
              rateObject.item.rate += 1;
              this.maxRateControl -= 1;
            } else {
              rateObject.item.rate -= 1;
              this.maxRateControl += 1;
            }
          },
          (Error) => console.log
        );
      }
  }
}
