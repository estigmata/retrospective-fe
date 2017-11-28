import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ActionItemService } from '../services/action-item.service';

import { Retrospective } from '../../shared/models/retrospective.model';
import { RetrospectiveService } from './../services/retrospective.service';
import { UserService } from '../../shared/services/user.service';
import { Item } from './../models/item.model';
import { ItemInfo } from './../models/item-info.model';
import { ActionItem } from '../models/action-item.model';
import { State } from '../models/state.model';
import { User } from './../../shared/models/user.model';

@Component({
  selector: 'app-add-action-item',
  templateUrl: './add-action-item.component.html',
  styleUrls: ['./add-action-item.component.css']
})

export class AddActionItemComponent implements OnInit {
  userIsModerator: boolean = this.userService.checkRole('moderator');

  public itemsInfo: ItemInfo[] = [];

  public actionItems: ActionItem[];
  public retrospective: Retrospective;
  public itemSelected: ItemInfo;
  public actionItemSelected: ActionItem;
  public itemIndex = 0;
  public state = new State({addAction: true});
  public categoryHashName = [];
  public currentUser: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private actionItemService: ActionItemService,
    private retrospectiveService: RetrospectiveService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.actionItemService.listenActionItemsCreated().
      subscribe((actionItemCreated: ActionItem) => {
        const actionItemFound = this.actionItems.find(actionItem => actionItem._id === actionItemCreated._id);
        if (!actionItemFound) {
          const itemIndex = this.itemsInfo.findIndex(item => item._id === actionItemCreated.itemId);
          if (itemIndex !== -1) {
            this.actionItems[itemIndex] = actionItemCreated;
            if (this.itemSelected._id === actionItemCreated.itemId) {
              this.actionItemSelected = actionItemCreated;
            }
          }
        }
      });

    this.actionItemService.listenActionItemsUpdated().
      subscribe((actionItemUpdated: ActionItem) => {
        const actionItemIndex = this.actionItems.findIndex(actionItem => actionItem._id === actionItemUpdated._id);
        if (actionItemIndex !== -1) {
          this.actionItems[actionItemIndex] = actionItemUpdated;
          if (this.actionItemSelected._id === actionItemUpdated._id) {
            this.actionItemSelected = actionItemUpdated;
          }
        }
      });

    this.userService.getUser().
      subscribe(userCreated => this.currentUser = userCreated);

    this.activatedRoute.data
      .subscribe(
        ({retrospectiveData: data}) => {
          this.retrospective = data.retrospective;
          this.itemsInfo = [...data.items];
          this.categoryHashName = this.getCategoriesMapById(this.retrospective.categories);
          this.sortItemsByVote(this.itemsInfo);
          this.itemsInfo = this.itemsInfo.filter(item => item.totalVotes > 0);
          if (this.itemsInfo.length) {
            this.itemSelected = this.itemsInfo[this.itemIndex];
            this.actionItems = new Array(this.itemsInfo.length);
            this.itemsInfo.map((itemInfo, index) => {
              this.actionItems[index] = new ActionItem({
                retrospectiveId: this.itemsInfo[index].retrospective,
                itemId: this.itemsInfo[index]._id
              });
              const actionItemFound = data.actionItems.find(actionItem => actionItem.itemId._id === itemInfo._id);
              if (actionItemFound) {
                this.actionItems[index]._id = actionItemFound._id;
                this.actionItems[index].summary = actionItemFound.summary;
              }
            });
            this.actionItemSelected = this.actionItems[this.itemIndex];
          }
        },
        (error: Error) => console.error('error')
      );
  }

  private sortItemsByVote (items: ItemInfo[]) {
    items.sort((itemA: ItemInfo, itemB: ItemInfo) => this.getAllVotedItems(itemB) - this.getAllVotedItems(itemA));
  }

  private getAllVotedItems (item: ItemInfo) {
    item.totalVotes = item.rates.reduce((current, next) => next.quantity ? current + next.quantity : current, 0);
    item.categoryName = this.categoryHashName[`${item.category}`];
    return item.totalVotes;
  }

  getCategoriesMapById(categories) {
    return categories.reduce((hash, next) => {
      hash[next._id] = next.name;
      return hash;
    }, {});
  }

  getPreviewItem() {
    if (this.itemIndex - 1 > -1) {
      this.itemIndex -= 1;
      this.itemSelected = this.itemsInfo[this.itemIndex];
      this.actionItemSelected = this.actionItems[this.itemIndex];
    }
  }

  getNextItem() {
    if (this.itemIndex + 1 < this.itemsInfo.length) {
      this.itemIndex += 1;
      this.itemSelected = this.itemsInfo[this.itemIndex];
      this.actionItemSelected = this.actionItems[this.itemIndex];
    }
  }

  onActionItemModified(newActionItem: ActionItem) {
    if (!newActionItem._id) {
      this.actionItemService.save(newActionItem).subscribe(
        () => {},
        (err) => console.log(err)
      );
    } else {
      this.actionItemService.update(newActionItem).subscribe(
        () => {},
        (err) => console.log(err)
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
