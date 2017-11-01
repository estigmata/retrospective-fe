import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { RetrospectiveService } from '../services/retrospective.service';
import { ItemService } from './../services/item.service';
import { Retrospective } from '../../shared/models/retrospective.model';
import { Item } from '../models/item.model';
import { Category } from './../models/category.model';
import { State } from './../models/state.model';


@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})

export class GroupItemComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public retrospective: Retrospective;
  public categories: Category[] = [];
  public state = new State ({ group: true });

  constructor(
    private retrospectiveService: RetrospectiveService,
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.parent.data
      .switchMap(data => {
        this.retrospective = data.retrospective;
        return this.itemService.getByRetrospective(this.retrospective._id);
      })
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        (items: Item[]) => {
           this.categories = this.retrospective.categories.map(category => {
            const categoryItems = items.filter(item => item.category === category._id);
            return (new Category(
              category._id,
              category.name,
              categoryItems
            ));
          });
        },
        (error: Error) => console.error('error :', error)
      );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  isAtLeastOneExistingItem () {
    return this.categories.some(
      category => category.items && category.items.length && category.items.some(
        item => !!item._id
    ));
  }
}
