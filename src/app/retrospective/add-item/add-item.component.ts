import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { RetrospectiveService } from '../services/retrospective.service';
import { ItemService } from './../services/item.service';
import { Retrospective } from '../../shared/models/retrospective.model';
import { Item } from '../models/item.model';
import { RetrospectiveData } from '../models/retrospective-data.model';
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
  public categories: Category[] = [];
  public state = new State ({ edit: true });

  constructor(
    private retrospectiveService: RetrospectiveService,
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.itemService.listenItemsCreated().
    subscribe(itemCreated => {
      const categoryFound = this.categories.find(category => category._id ===  itemCreated.category);
      if (!categoryFound.items.some(item => item._id === itemCreated._id)) {
        categoryFound.items.unshift(itemCreated);
      }
    });

    this.itemService.listenItemsUpdated().
      subscribe(itemUpdated => {
        const categoryFound = this.categories.find(category => category._id ===  itemUpdated.category);
        const itemFound = categoryFound.items.find(item => item._id === itemUpdated._id);
        if (!!itemFound) {
          Object.assign(itemFound, itemUpdated);
        }
      });

    this.itemService.listenItemsDeleted().
      subscribe(itemUpdated => {
        const categoryFound = this.categories.find(category => category._id ===  itemUpdated.category);
        const itemFound = categoryFound.items.find(item => item._id === itemUpdated._id);
        if (!!itemFound) {
          const itemIndex = categoryFound.items.indexOf(itemFound);
          categoryFound.items.splice(itemIndex, 1);
        }
      });

    this.activatedRoute.data
      .subscribe(({retrospectiveData: data}) => {
        this.retrospective = data.retrospective;
        this.categories = new Array();
        this.retrospective.categories.forEach(category => {
          const categoryItems = data.items.filter(item => item.category._id === category._id);
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

  isAtLeastOneExistingItem () {
    return this.categories.some(
      category => category.items && category.items.length && category.items.some(
        item => !!item._id
    ));
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
