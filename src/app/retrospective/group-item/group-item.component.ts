import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { RetrospectiveService } from '../services/retrospective.service';
import { ItemService } from './../services/item.service';
import { UserService } from './../../shared/services/user.service';
import { Retrospective } from '../../shared/models/retrospective.model';
import { RetrospectiveData } from '../models/retrospective-data.model';
import { Item } from '../models/item.model';
import { Category } from './../models/category.model';
import { State } from './../models/state.model';
import { User } from './../../shared/models/user.model';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})

export class GroupItemComponent implements OnInit, OnDestroy {

  userIsModerator: boolean = this.userService.checkRole('moderator');

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public retrospective: Retrospective;
  public categories: Category[] = [];
  public state = new State ({ group: true });
  public currentUser: User;

  constructor(
    private retrospectiveService: RetrospectiveService,
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.itemService.listenItemsGroupCreated()
      .subscribe(itemCreated => {
        const categoryFound = this.categories.find(category => category._id ===  itemCreated.category._id);
        if (categoryFound && !categoryFound.items.some(item => item._id === itemCreated._id)) {
          const localItemIndex = categoryFound.items.findIndex(item => {
            return item._id === itemCreated.children[0]._id;
          });
          categoryFound.items.splice(localItemIndex + 1, 0, itemCreated);
        }
      });

    this.itemService.listenItemsGroupUpdated()
      .subscribe(itemUpdated => {
        const categoryFound = this.categories.find(category => category._id ===  itemUpdated.category._id);
        if (categoryFound) {
          const itemFound = categoryFound.items.find(item => item._id === itemUpdated._id);
          if (itemFound) {
            Object.assign(itemFound, itemUpdated);
          }
        }
      });

    this.itemService.listenItemsUpdated()
      .subscribe(itemUpdated => {
        const categoryFound = this.categories.find(category => category._id ===  itemUpdated.category._id);
        if (categoryFound) {
          const itemFound = categoryFound.items.find(item => item._id === itemUpdated._id);
          if (itemFound) {
            Object.assign(itemFound, itemUpdated);
          }
      }
    });

    this.itemService.listenItemsDeleted()
      .subscribe(itemUpdated => {
        const categoryFound = this.categories.find(category => category._id ===  itemUpdated.category._id);
        if (categoryFound) {
          const itemFound = categoryFound.items.find(item => item._id === itemUpdated._id);
          if (itemFound) {
            const itemIndex = categoryFound.items.indexOf(itemFound);
            categoryFound.items.splice(itemIndex, 1);
          }
        }
      });

    this.userService.getUser().
      subscribe(userCreated => this.currentUser = userCreated);

    this.activatedRoute.data
      .subscribe(
        ({retrospectiveData: data}) => {
          this.retrospective = data.retrospective;
          this.categories = this.retrospective.categories.map(category => {
            const categoryItems = data.items.filter(item => item.category._id === category._id);
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

  nextStep() {
    this.retrospectiveService.goToNextStep(this.retrospective._id)
      .subscribe(retrospective => {
        if (retrospective) {
          this.router.navigate([`retrospective/${this.retrospective._id}/vote-items`]);
        }
      });
  }
}
