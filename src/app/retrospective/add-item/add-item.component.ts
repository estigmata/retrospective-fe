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
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})

export class AddItemComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public retrospective: Retrospective;
  public categories: Category[];
  public state = new State ({ edit: true });

  constructor(
    private retrospectiveService: RetrospectiveService,
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.parent.params.
      switchMap(param => {
        return this.retrospectiveService.getRetrospective(param['id']);
      }).
      switchMap((retrospectiveResponse: Retrospective) => {
        this.retrospective = retrospectiveResponse;
        return this.itemService.getByRetrospective(retrospectiveResponse._id);
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
